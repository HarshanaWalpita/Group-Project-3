import React from "react";
import RComment from './RComment';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import AccountSidebar from "./AccountSidebar";
import {useHistory} from "react-router-dom";

function RateAndComment(){

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <AccountSidebar/>
            <RComment/>
            <Footer/>
        </>
    );

}
export default RateAndComment;