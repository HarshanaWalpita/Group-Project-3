import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import ProfileDetails from './ProfileDetails';

import { useHistory } from "react-router";
import ProfileSidebar from './ProfileSidebar';

export default function SellerProfile() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <>
            <Navbar />
            <ProfileSidebar />
            <ProfileDetails />
            <Footer />
        </>
    )
}