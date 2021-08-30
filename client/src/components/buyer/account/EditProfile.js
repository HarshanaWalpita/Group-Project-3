import React from 'react';
import EditProfileForms from "./EditProfileForm";
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import AccountSidebar from "./AccountSidebar";

function EditProfile() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <AccountSidebar/>
            <EditProfileForms/>
            <Footer/>
        </>
    );
}

export default EditProfile;