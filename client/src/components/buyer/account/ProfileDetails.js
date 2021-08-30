import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import ProfileDetailsPage from "./ProfileDetailsPage";
import React, {useState} from "react";
import { useHistory } from "react-router";

export default function ProfileDetails() {
    const [currentId, setCurrentId] = useState(0);
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }


    return (
        <>
            <Navbar />
            <ProfileDetailsPage currentId={currentId} setCurrentId={setCurrentId} />
            <Footer/>
        </>
    );
}