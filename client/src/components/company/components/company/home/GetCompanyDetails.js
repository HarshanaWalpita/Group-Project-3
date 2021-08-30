import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GetCompanyDetailsForm from './GetCompanyDetailsForm';
import {useHistory} from "react-router-dom";

function GetCompanyDetails() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <GetCompanyDetailsForm />
            <Footer/>
        </>
    );
}

export default GetCompanyDetails;