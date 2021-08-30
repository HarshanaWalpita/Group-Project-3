import Navbar from "../Nav/Navbar";
import Footer from '../Nav/Footer';
import Offers from './SellerOfferList';
import SellerSidebar from './Sidebar';
import { useHistory } from "react-router-dom";

export default function ViewOffers() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <>
            <Navbar />
            <SellerSidebar />
            <Offers />
            <Footer />
        </>
    )
}