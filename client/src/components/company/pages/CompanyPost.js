import React from 'react';
import AddPost from '../components/company/posts/AddPost';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import { useHistory } from "react-router-dom";

function CompanyPost() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <PostSidebar />
            <AddPost/>
            <Footer/>
        </>
    );
}

export default CompanyPost;