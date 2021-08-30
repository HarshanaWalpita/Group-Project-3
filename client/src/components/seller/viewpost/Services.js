import React from 'react';
import './Services.css';
import Posts from './ViewPosts';

import SellerSidebar from './Sidebar';

import { useHistory } from 'react-router';

function Services() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }
    
    return (
        <>

            <SellerSidebar/>
            <Posts />

        </>
    );
}

export default Services;
