import React from 'react';
import Forms from './Form';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import Sidebar from './Sidebar';

function OfferForm() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <Forms/>
            <Footer/>
        </>
    );
}

export default OfferForm;