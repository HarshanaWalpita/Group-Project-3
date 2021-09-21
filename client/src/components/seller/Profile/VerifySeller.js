import React from "react";
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import {useHistory} from "react-router-dom";
import VerifySellerForm from "./VerifySellerForm";

function VerifySeller(){

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <VerifySellerForm/>
            <Footer/>
        </>
    );

}
export default VerifySeller;