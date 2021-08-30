import React from 'react';
import BuyerInfo from '../components/company/posts/BuyerInfo';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import { useHistory } from "react-router-dom";

function BuyersInfo() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />
            <BuyerInfo/>
            <Footer/>
        </>
    );
}

export default BuyersInfo;