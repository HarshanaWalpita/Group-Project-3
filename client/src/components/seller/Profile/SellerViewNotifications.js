import React from 'react';
import SellerNotifications from './SellerNotifications';
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import ProfileSidebar from './ProfileSidebar';

export default function SellerViewNotifications() {
    return (
        <>
            <Navbar />
            <ProfileSidebar />
            <SellerNotifications/>
            <Footer/>
        </>
    );
}
