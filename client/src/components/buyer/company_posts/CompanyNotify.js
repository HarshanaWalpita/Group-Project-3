import React from 'react';
import CompanyNotifyForms from './CompanyNotifyForm';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import CompanySidebar from './CompanySidebar';

function CompanyNotify() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <CompanyNotifyForms/>
            <Footer/>
        </>
    );
}

export default CompanyNotify;