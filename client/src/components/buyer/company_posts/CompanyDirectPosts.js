import React from 'react';
import CompanyDirectPostsView from "./CompanyDirectPostsView";
import CompanySidebar from './CompanySidebar';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function CompanyDirectPosts() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <CompanySidebar/>
            <CompanyDirectPostsView />
            <Footer/>
        </>
    );
}

export default CompanyDirectPosts;