import React from 'react';
import DirectP from '../components/company/posts/DirectP';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import { useHistory } from "react-router-dom";

function DirectPosts() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <DirectP/>
            <Footer/>
        </>
    );
}

export default DirectPosts;