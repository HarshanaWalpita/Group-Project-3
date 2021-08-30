import React from 'react';
import PendingOffers from './PendingOffers';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import Sidebar from './Sidebar';

function POffers() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <PendingOffers/>
            <Footer/>
        </>
    );
}

export default POffers;