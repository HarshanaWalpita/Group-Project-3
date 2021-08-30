import React from 'react';
import ViewRatingsPage from './ViewRatingsPage';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import {useHistory} from "react-router-dom";

function ViewRatings() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    return (
        <>
            <Navbar/>
            <ViewRatingsPage />
            <Footer/>
        </>
    );
}

export default ViewRatings;