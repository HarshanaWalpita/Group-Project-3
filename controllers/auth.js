const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password, accountStatus} = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const account = await User.findOne({ email }).select("+accountStatus");

    if (account.accountStatus==="notActive") {
      return next(new ErrorResponse("You should verify your account before login!", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res, user.usertype, user.registeredAt, user.username, user.email, user.id, user.otp, user.accountStatus);

  } catch (err) {
    next(err);
  }
};

// @desc    Register user
exports.register = async (req, res, next) => {
  const { username, email, password, usertype, otp, accountStatus } = req.body;

  const len=username.length;

    if (len>16) {
        return next(new ErrorResponse("Username can not have more than 16 characters", 400));
    }

    const regex=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (!regex.test(password)) {
      return next(new ErrorResponse("Enter a strong password", 400));
    }

  try {
    const user = await User.create({
      username,
      email,
      password,
      usertype,
      otp
    });

    const OTP = user.otp;

      // HTML Message
      const message = `
      <h1>Your Registration is Successful!</h1>
      <p>Welcome to the Sri Lanka's Largest Buying and Selling Platform</p>
      <a>Your OTP is : ${OTP}</a>
      <p>Use this OTP to verify your account</p>
    `;

      await sendEmail({
        to: user.email,
        subject: "Registered Successfully",
        text: message,
      });

    sendToken(user, 200, res, user.usertype, user.registeredAt, user.username, user.email, user.id, user.otp, accountStatus);
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res, usertype,registeredAt,username,email,id,otp,accountStatus) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token, usertype,registeredAt,username,email,id,otp,accountStatus});
};

exports.forgotVerifyAccount = async (req, res, next) => {

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    await getNewOTP(user._id);

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    const resetId = user._id;
    const OTP = user.otp;

    const resetUrl = `http://localhost:3000/verifyforgetaccount/${resetId}/${OTP}`;

    // HTML Message
    const message = `
      <h1>You have requested to verify your account</h1>
      <p>Please make a put request to the following link and type this OTP in the relevent field:</p>
      <a>Your OTP is: ${OTP} and your verify account link is: </a>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      if(OTP !== undefined) {
      await sendEmail({
        to: user.email,
        subject: "Account Verify Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } }catch (err) {
      console.log(err);

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

exports.verifyAccount = async (req, res, next) => {
  const {userId} = req.params;

  try {
    const user = await User.findOne({_id: userId});

    if (!user) {
      return next(new ErrorResponse("Invalid User", 400));
    }

    user.accountStatus = req.body.accountStatus;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Account Verified Successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getNewOTP = async (userId) => {
  try {
    const user = await User.findOne({_id: userId});

    user.otp = generateOTP();

    await user.save();

  } catch (err) {
  }
};

const generateOTP = () => {

  const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let OTP = '';

  // Find the length of string
  let len = string.length;
  for (let i = 0; i < 6; i++ ) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
};


