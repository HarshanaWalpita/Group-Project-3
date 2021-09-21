import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import "./LoginScreen.css";
import HomeNavbar from "../HomeNavbar";
import Footer from "../../buyer/home/Footer";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import Popup from './Popup';
import './Popup.css';

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

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

  useEffect(()=>{
    setOtp(generateOTP());
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
          usertype,
          otp
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("usertype", data.usertype);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("registeredAt", data.registeredAt);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userOTP", data.otp);
      localStorage.setItem("userAccountStatus", data.accountStatus);

      console.log(data.usertype);
      if(data.usertype==="buyer"){
        history.push("/buyer/verifybuyer");
      }else if(data.usertype==="seller"){
        history.push("/seller/verifyseller");
      }
      else if(data.usertype==="company"){
        history.push("/company/verifycompany");
      }
      else if(data.usertype==="admin"){
        history.push("/admin");
      }
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
      <>
        <HomeNavbar/>
        <div className="login-h">
          <div className="login__container-h">
    <div className="register-screen-h">
      <form onSubmit={registerHandler} className="register-screen__form-h">
        <h3 className="register-screen__title-h">Register</h3>
        {error && <span className="error-message-h">{error}</span>}
        <div className="form-group-h">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group-h">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group-h">
          <label htmlFor="password">Password: <i className="far fa-question-circle" onClick={togglePopup}></i></label>
          {isOpen && <Popup
              content={<>
              <p>Passwords must contain:</p>
                <p>1) a minimum of 1 lower case letter [a-z] and</p>
                <p>2) a minimum of 1 upper case letter [A-Z] and</p>
                <p>3) a minimum of 1 numeric character [0-9] and</p>
                <p>4) a minimum of 1 special character: ~`!@#$%^&*()-_+={}[]|\;:",./?</p>
                <p>5) Passwords must be at least 6 characters in length, but can be much longer.</p>
              </>}
              handleClose={togglePopup}
          />}
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthMeter password={password} />
        </div>
        <div className="form-group-h">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group-h">
          <div className="box-h">
            <label >Select User Type:</label>
            <select onChange={(e) => setUserType(e.target.value)}>
              <option disabled selected>Select</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-h btn-h-primary">
          Register
        </button>

        <span className="register-screen__subtext-h">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
      </div>
</div>
        <Footer/>
      </>
  );
};

export default RegisterScreen;