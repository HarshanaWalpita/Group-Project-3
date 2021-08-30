import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../HomeNavbar";
import Footer from "../../buyer/home/Footer";

import "./ResetPasswordScreen.css";
import "./LoginScreen.css";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
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
    <div className="resetpassword-screen-h">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form-h"
      >
        <h3 className="resetpassword-screen__title-h">Forgot Password</h3>
        {error && <span className="error-message-h">{error} </span>}
        {success && (
          <span className="success-message-h">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group-h">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group-h">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-h btn-h-primary">
          Reset Password
        </button>
      </form>
    </div>
          </div>
        </div>
        <Footer/>
      </>
  );
};

export default ResetPasswordScreen;
