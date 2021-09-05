import React, { useState } from 'react'
import "./newuser.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios";
import { Link,useHistory } from "react-router-dom";


export default function Newuser() {

  const history = useHistory();
  if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
      history.push("/");
  }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [usertype, setUserType] = useState("");
    const [error, setError] = useState("");
  
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
            usertype
          },
          alert("new user added successfully"),
          config
        );  

      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

  function adduser(){

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
                            <input type="text" placeholder="username"
                            value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        </div>

                        <div className="an_fitems">
                            <label>Email</label>
                            <input type="email" placeholder="email" 
                            value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>

                        <div className="an_fitems">
                            <label>Password</label>
                            <input type="password" placeholder="password" 
                            value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
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
                            <input type="password" placeholder="password" 
                            value={confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        </div>

                    </form>
                    <button className="an_nbutton" onClick={adduser}>Create</button>

                </div>
            </div>
            <Footer />
        </div>
    )
}
