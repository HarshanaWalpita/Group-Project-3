import React, {useState} from 'react';
import SellerComplaints from './AddComplaint';
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';


function AddComplaints() {
    return (
        <>
            <Navbar />
           
            <SellerComplaints />
            
            <Footer/>
        </>
    );
}

export default AddComplaints;