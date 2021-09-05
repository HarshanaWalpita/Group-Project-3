import React from 'react'
import "./salesreport.css"
import logoz from "./logo.png"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import jsPDF from "jspdf";
import { useHistory } from 'react-router-dom';


export default function SalesReport() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }


    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="salesrep" id="rep1"> 
                    <div className="rephead">
                        <img src={logoz} height={55} width={110} className="ii"/>
                        <h1 style={{fontSize:'25px'}}>Report</h1>
                    </div>

                    <div className="srpbody">
                        <span className="top">From Day1 to Day2</span>
                        <span className="repitem">Sales Done through the time period</span>
                        <span className="repitem">Number of Sales done by the Sellers</span>
                        <span className="repitem">Sellers Sale amount</span>
                        <span className="repitem">Number of Sales done by the Buyers</span>
                        <span className="repitem">Buyers Sale amount</span>
                        <span className="repitem">Waste item with the most demand</span>
                        <span className="repitem">Most prefered waste item by the Buyers</span>
                        <span className="repitem">Most prefered waste item by the Companies</span>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
