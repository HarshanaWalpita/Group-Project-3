import React from 'react';
import SingleOfferForm from "./SingleOfferForm";
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import Sidebar from './Sidebar';

function SingleOffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <SingleOfferForm/>
            <Footer/>
        </>
    );
}

export default SingleOffers;