import React from 'react';
import EditPostForm from '../components/company/posts/EditPostForm';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import { useHistory } from "react-router-dom";
import PostSidebar from "../components/company/posts/PostSidebar";

function CompanyEditPost() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <PostSidebar />
            <EditPostForm/>
            <Footer/>
        </>
    );
}

export default CompanyEditPost;