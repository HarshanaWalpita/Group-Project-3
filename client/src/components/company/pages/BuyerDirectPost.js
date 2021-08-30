import React from 'react';
import DirectPostForm from '../components/company/posts/DirectPostForm';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import { useHistory } from "react-router-dom";
import PostSidebar from "../components/company/posts/PostSidebar";

function BuyerDirectPost() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <PostSidebar />
            <DirectPostForm/>
            <Footer/>
        </>
    );
}

export default BuyerDirectPost;