import React from 'react';
import NotificationTable from '../components/company/posts/NotificationTable';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import { useHistory } from "react-router-dom";

function Notification() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <NotificationTable/>
            <Footer/>
        </>
    );
}

export default Notification;