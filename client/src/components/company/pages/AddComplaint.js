import React from 'react';
import AddComplaintPage from '../components/company/posts/AddComplaintPage';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import PostSidebar from '../components/company/posts/PostSidebar';
import { useHistory } from "react-router-dom";

function AddComplaint() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <PostSidebar />
            <AddComplaintPage/>
            <Footer/>
        </>
    );
}

export default AddComplaint;