import React from 'react';
import ViewPost from './ViewPost';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";
import Sidebar from './Sidebar';

function ViewPostDetails() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <ViewPost/>
            <Footer/>
        </>
    );
}

export default ViewPostDetails;