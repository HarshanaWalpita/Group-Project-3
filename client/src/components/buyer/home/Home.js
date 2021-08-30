import React from 'react';
import Cards from './Cards';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from "react-router-dom";

function BuyerHome() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }
    const type=(localStorage.getItem("usertype"));
    const name=(localStorage.getItem("userName"));
    const email=(localStorage.getItem("userEmail"));
    const date=(localStorage.getItem("registeredAt"));
    const buyerId=(localStorage.getItem("userId"));
    console.log(type);
    console.log(name);
    console.log(email);
    console.log(date);
    console.log(buyerId);

    return (
        <>
            <Navbar/>
            <HeroSection />
            <Cards />
            <Footer/>
        </>
    );
}

export default BuyerHome;