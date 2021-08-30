import React from 'react';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import AcceptedPost from '../components/company/posts/AcceptedPost';
import { useHistory } from "react-router-dom";

function AcceptedP() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <PostSidebar />
            <AcceptedPost/>
            <Footer/>
        </>
    );
}

export default AcceptedP;