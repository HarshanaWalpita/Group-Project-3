import React from 'react';
import EditCompanyOfferForms from './EditCompanyPendingOffersForm';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import CompanySidebar from "./CompanySidebar";

function EditCompanyPendingOffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <EditCompanyOfferForms/>
            <Footer/>
        </>
    );
}

export default EditCompanyPendingOffers;