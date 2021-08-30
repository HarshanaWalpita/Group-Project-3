import React from 'react';
import ViewCompanyOfferDetails from "./ViewCompanyOfferDetails";
import CompanySidebar from './CompanySidebar';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function ViewCompanyOffer() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <ViewCompanyOfferDetails/>
            <Footer/>
        </>
    );
}

export default ViewCompanyOffer;