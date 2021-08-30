import { useHistory } from "react-router";
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import Post from '../viewpost/Post';
import SellerSidebar from './Sidebar';
import React from "react";


export default function ViewPost() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <div>
            <Navbar />

            <SellerSidebar/>

            <Post/>
            <Footer />
      </div>
        
    )
}