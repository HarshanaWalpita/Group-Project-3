import React from 'react';
import BuyerContact from '../components/company/posts/BuyerContact';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import { useHistory } from "react-router-dom";

function BuyersContact() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />
            <BuyerContact/>
            <Footer/>
        </>
    );
}

export default BuyersContact;