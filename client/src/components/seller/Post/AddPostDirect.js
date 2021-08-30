import React from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Nav/Footer";
import PostFrom from "./PostFormDirect";
import { useHistory } from "react-router";
import { useState } from 'react';
export default function DirectPost() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }
    const [currentId, setCurrentId] = useState(0);
    return (
        <>
            <Navbar />
            <PostFrom currentId={currentId} setCurrentId={setCurrentId}/>
            <Footer />
        </>
    )
}