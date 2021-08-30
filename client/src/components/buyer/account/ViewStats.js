import React from 'react';
import VStats from './VStats';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import AccountSidebar from "./AccountSidebar";
import {useHistory} from "react-router-dom";

function ViewStats() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <AccountSidebar/>
            <VStats/>
            <Footer/>
        </>
    );
}

export default ViewStats;