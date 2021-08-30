import React from 'react';
import OfferPost from '../components/company/posts/OfferPost';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import { useHistory } from "react-router-dom";

function OffersForPosts() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />
            <OfferPost/>
            <Footer/>
        </>
    );
}

export default OffersForPosts;