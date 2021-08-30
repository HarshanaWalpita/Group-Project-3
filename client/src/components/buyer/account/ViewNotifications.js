import React from 'react';
import VNotifications from './VNotifications';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import AccountSidebar from "./AccountSidebar";
import {useHistory} from "react-router-dom";

function ViewNotifications() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <AccountSidebar/>
            <VNotifications/>
            <Footer/>
        </>
    );
}

export default ViewNotifications;