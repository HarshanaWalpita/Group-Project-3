import React from 'react';
import CPosts from './CPosts';
import CompanySidebar from './CompanySidebar';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function CompanyPosts() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <CPosts />
            <Footer/>
        </>
    );
}

export default CompanyPosts;