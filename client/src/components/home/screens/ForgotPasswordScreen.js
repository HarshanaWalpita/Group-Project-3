import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import "./LoginScreen.css";
import HomeNavbar from "../HomeNavbar";
import Footer from "../../buyer/home/Footer";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
    <div className="forgotpassword-screen-h">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form-h"
      >
        <h3 className="forgotpassword-screen__title-h">Forgot Password</h3>
        {error && <span className="error-message-h">{error}</span>}
        {success && <span className="success-message-h">{success}</span>}
        <div className="form-group-h">
          <p className="forgotpassword-screen__subtext-h">
            Please enter the email address you registered your account with. We
            will send you a reset password confirmation to this email.
          </p>
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
        <button type="submit" className="btn-h btn-h-primary">
          Send Email
        </button>
      </form>
    </div>
          </div>
    </div>
        <Footer/>
      </>
  );
};

export default ForgotPasswordScreen;
