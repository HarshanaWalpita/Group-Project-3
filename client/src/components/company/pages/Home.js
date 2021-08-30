import React from 'react';
import '../components/company/home/Home.css';
import HeroSection from '../components/company/home/HeroSection';
import Navbar from '../components/company/home/Navbar';
import Footer from '../components/company/home/Footer';
import Cards from '../components/company/home/Cards';
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="company")){
        history.push("/");
    }
    
    return (
        <>
            <Navbar/>
            <HeroSection />
            <Cards />
            <Footer/>
        </>
    );
}

export default Home;