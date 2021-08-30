import React from 'react';
import ViewOfferDetails from "./ViewOfferDetails";
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import Sidebar from './Sidebar';

function ViewOffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <ViewOfferDetails/>
            <Footer/>
        </>
    );
}

export default ViewOffers;