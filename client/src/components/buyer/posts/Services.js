import React from 'react';
import Posts from './Posts';
import Sidebar from './Sidebar';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function Services() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <Posts />
            <Footer/>
        </>
    );
}

export default Services;
