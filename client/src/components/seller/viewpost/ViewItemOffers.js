import { useHistory } from "react-router";
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import ItmOffers from '../viewpost/ItemOffers';
import SellerSidebar from './Sidebar';
import React from "react";


export default function ViewItemOffers() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <div>
            <Navbar />

            <SellerSidebar/>

            <ItmOffers/>
            <Footer />
      </div>
        
    )
}