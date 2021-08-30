import React from 'react';
import EditProfileForm from '../components/company/posts/EditProfileForm';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import Sidebar from '../components/company/posts/Sidebar';
import { useHistory } from "react-router-dom";

function EditProfile() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <Sidebar />
            <EditProfileForm/>
            <Footer/>
        </>
    );
}

export default EditProfile;