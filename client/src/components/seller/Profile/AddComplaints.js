import React from 'react';
import SellerComplaints from './SellerComplaints';
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import ProfileSidebar from './ProfileSidebar';

function AddComplaints() {
    return (
        <>
            <Navbar />
            <ProfileSidebar />
            <SellerComplaints/>
            <Footer/>
        </>
    );
}

export default AddComplaints;