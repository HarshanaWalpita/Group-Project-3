import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import ProfileSidebar from './ProfileSidebar';
import SellerStats from './SellerStats';

import { useHistory } from 'react-router';
export default function SellerViewStats() {
    return (
        <>
            <Navbar />
            <ProfileSidebar />
            <SellerStats />
            <Footer />
        </>
    )
}