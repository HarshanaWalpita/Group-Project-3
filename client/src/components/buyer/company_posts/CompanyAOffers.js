import React from 'react';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import CompanyAcceptedOffers from "./CompanyAcceptedOffers";
import {useHistory} from "react-router-dom";
import CompanySidebar from './CompanySidebar';

function CompanyAOffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <CompanyAcceptedOffers/>
            <Footer/>
        </>
    );
}

export default CompanyAOffers;