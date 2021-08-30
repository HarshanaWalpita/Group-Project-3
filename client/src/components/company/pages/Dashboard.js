import React from 'react';
import DashB from '../components/company/posts/DashB';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import Sidebar from '../components/company/posts/Sidebar';
import { useHistory } from "react-router-dom";

function Dashboard() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <Sidebar />
            <DashB/>
            <Footer/>
        </>
    );
}

export default Dashboard;