import React from 'react';
import '../posts/POffers.css';
import CompanyPendingOffers from './CompanyPendingOffers';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import CompanySidebar from "./CompanySidebar";

function CompanyPOffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <CompanyPendingOffers/>
            <Footer/>
        </>
    );
}

export default CompanyPOffers;