import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import HomeNavbar from "../HomeNavbar";
import Footer from "../../buyer/home/Footer";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password},
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("usertype", data.usertype);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("registeredAt", data.registeredAt);
      localStorage.setItem("userId", data.id);

      if(data.usertype==="buyer"){
        history.push("/buyer/home");
      }else if(data.usertype==="seller"){
        history.push("/seller");
      }
      else if(data.usertype==="company"){
        history.push("/company");
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
          <div className="login-screen-h">
            <form onSubmit={loginHandler} className="login-screen-h__form">
              <h3 className="login-screen-h__title">Login</h3>
              {error && <span className="error-message-h">{error}</span>}
              <div className="form-group-h">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  tabIndex={1}
                />
              </div>
              <div className="form-group-h">
                <label htmlFor="password">
                  Password:{" "}
                  <Link to="/forgotpassword" className="login-screen__forgotpassword">
                    Forgot Password?
                  </Link>
                </label>
                <input
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                />
              </div>
              <button type="submit" className="btn-h btn-h-primary">
                Login
              </button>

              <span className="login-screen-h__subtext">
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </form>
          </div>
          </div>
        </div>
        <Footer/>
      </>
  );
};

export default LoginScreen;
