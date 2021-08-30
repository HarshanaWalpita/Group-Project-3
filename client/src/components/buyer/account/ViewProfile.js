import React from "react";
import VProfile from './VProfile';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import AccountSidebar from "./AccountSidebar";
import {useHistory} from "react-router-dom";

function ViewProfile(){

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <AccountSidebar/>
            <VProfile/>
            <Footer/>
        </>
    );

}
export default ViewProfile; 