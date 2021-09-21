import { useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../HomeNavbar";
import Footer from "../../buyer/home/Footer";

import "./ResetPasswordScreen.css";
import "./LoginScreen.css";

const VerifyAccountFunction = ({ history, match }) => {

    const { userId,OTP } = useParams();
    console.log(OTP);

    const [otp, setOTP] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const verifyAccountHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (otp !== OTP) {
            setOTP("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("OTP don't match");
        }

        try {
            const { data } = await axios.put(
                `/api/auth/verifyAccount/${userId}`,
                {
                    accountStatus:"Active",
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
                            onSubmit={verifyAccountHandler}
                            className="resetpassword-screen__form-h"
                        >
                            <h3 className="resetpassword-screen__title-h">Verify Account</h3>
                            {error && <span className="error-message-h">{error} </span>}
                            {success && (
                                <span className="success-message-h">
            {success} <Link to="/login">Login</Link>
          </span>
                            )}
                            <div className="form-group-h">
                                <label htmlFor="password">Your OTP:</label>
                                <input
                                    type="otp"
                                    required
                                    id="otp"
                                    placeholder="Enter your otp"
                                    autoComplete="true"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn-h btn-h-primary">
                                Verify Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default VerifyAccountFunction;
