import Navbar from "../Nav/Navbar";
import Footer from "../Nav/Footer";
import PreviousPosts from "./PreviousPosts";
import SellerSidebar from './Sidebar';
import { useHistory } from "react-router";

export default function ViewPreviousPosts() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    return (
        <>
            <Navbar />
            <SellerSidebar />
            <PreviousPosts />
            <Footer />
        </>
    )
}