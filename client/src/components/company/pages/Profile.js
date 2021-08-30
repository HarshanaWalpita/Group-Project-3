import React from 'react';
import Userprofile from '../components/company/posts/Userprofile';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import Sidebar from '../components/company/posts/Sidebar';
import { useHistory } from "react-router-dom";

function Profile() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <Sidebar />
            <Userprofile/>
            <Footer/>
        </>
    );
}

export default Profile;