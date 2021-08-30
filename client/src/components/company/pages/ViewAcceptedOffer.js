import React from 'react';
import ViewAcceptedOfferPage from '../components/company/posts/ViewAcceptedOfferPage';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import { useHistory } from "react-router-dom";
import PostSidebar from "../components/company/posts/PostSidebar";

function ViewAcceptedOffer() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <PostSidebar />
            <ViewAcceptedOfferPage/>
            <Footer/>
        </>
    );
}

export default ViewAcceptedOffer;