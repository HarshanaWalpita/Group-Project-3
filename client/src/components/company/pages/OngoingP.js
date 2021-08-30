import React from 'react';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import OngoingPost from '../components/company/posts/OngoingPost';
import { useHistory } from "react-router-dom";

function OngoingP() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />            
            <OngoingPost/>           
            <Footer/>
        </>
    );
}

export default OngoingP;