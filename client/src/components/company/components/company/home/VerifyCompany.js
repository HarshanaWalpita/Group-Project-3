import React from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import {useHistory} from "react-router-dom";
import VerifyCompanyForm from "./VerifyCompanyForm";

function VerifyCompany(){

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <VerifyCompanyForm/>
            <Footer/>
        </>
    );

}
export default VerifyCompany;