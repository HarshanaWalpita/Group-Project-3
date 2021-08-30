import React from 'react';
import SellerEditProfileForms from "./SellerEditProfileForm";
import Navbar from '../Nav/Navbar'
import Footer from '../Nav/Footer';
import { useHistory } from "react-router-dom";
import ProfileSidebar from './ProfileSidebar';

export default function EditProfile() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <>
            <Navbar />
            <ProfileSidebar />
            <SellerEditProfileForms/>
            <Footer/>
        </>
    );
}
