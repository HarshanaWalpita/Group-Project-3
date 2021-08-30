import React from 'react';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import PreviousPost from '../components/company/posts/PreviousPost';
import { useHistory } from "react-router-dom";

function PreviousP() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />
            <PreviousPost/>
            <Footer/>
        </>
    );
}

export default PreviousP;