import React from 'react';
import '../components/company/home/Home.css';
import Help from '../components/company/posts/Help';
import '../components/company/posts/Help.css';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import Sidebar from '../components/company/posts/Sidebar';
import { useHistory } from "react-router-dom";

function Helpdesk() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <Help/>
            <Footer/>
        </>
    );
}

export default Helpdesk;