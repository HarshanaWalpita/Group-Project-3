import React, { useState, useEffect } from 'react'
import "./newuser.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Popup from '../../../home/screens/Popup';


export default function Newuser() {

  const history = useHistory();
  if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "admin")) {
    history.push("/");
  }


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const clear = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUserType('')
  };

  const generateOTP = () => {

    const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';

    // Find the length of string
    let len = string.length;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  };

  useEffect(() => {
    setOtp(generateOTP());
  }, []);

  adduser = async (e) => {
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
      alert("user added successfully")
      clear();

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
        alert("An error has occured")
      }, 5000);
    }
  };

  function adduser() {

  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="an_newuser">
          <h1 className="an_newuserTitle">Add New User</h1>
          <form action="" className="an_newform">

            <div className="an_fitems">
              <label>Username</label>
              <input
                type="text"
                required
                id="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="an_fitems">
              <label>Email</label>
              <input
                type="email"
                required
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="an_fitems">
              <label htmlFor="password">Password: <i className="far fa-question-circle" onClick={togglePopup}></i></label>
              {isOpen && <Popup
                content={<>
                  <p>Passwords must contain:</p>
                  <p>1) a minimum of 1 lower case letter [a-z] and</p>
                  <p>2) a minimum of 1 upper case letter [A-Z] and</p>
                  <p>3) a minimum of 1 numeric character [0-9] and</p>
                  <p>4) a minimum of 1 special character: ~`!@#$%^&*()-_+={ }[]|\;:",./?</p>
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
            </div>


            <div className="an_fitems">
              <label>User Role</label>

              <div className="an_role">
                <select onChange={(e) => setUserType(e.target.value)}>
                  <option disabled selected>Select</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  <option value="company">Company</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>



            <div className="an_fitems">
              <label>Confirm Password</label>
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

          </form>
          <button className="an_nbutton" onClick={adduser}>Create</button>

        </div>
      </div>
      <Footer />
    </div>
  )
}
