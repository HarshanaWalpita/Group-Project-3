import React from 'react';
import ViewCompany from './ViewCompany';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import CompanySidebar from './CompanySidebar';

function ViewCompanyDetails() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <ViewCompany/>
            <Footer/>
        </>
    );
}

export default ViewCompanyDetails;