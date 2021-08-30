import React from 'react';
import ViewDirectPosts from "./ViewDirectPosts";
import Sidebar from './Sidebar';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function DirectPosts() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <ViewDirectPosts />
            <Footer/>
        </>
    );
}

export default DirectPosts;