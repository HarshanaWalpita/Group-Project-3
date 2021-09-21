import React from "react";
import VerifyBuyerForm from './verifyBuyerForm';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function VerifyBuyer(){

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <VerifyBuyerForm/>
            <Footer/>
        </>
    );

}
export default VerifyBuyer;