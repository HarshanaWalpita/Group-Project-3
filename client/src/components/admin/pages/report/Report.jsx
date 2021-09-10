import React from 'react'
import "./report.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import jsPDF from "jspdf";
import "./salesreport.css"
import axios from 'axios'
import { useState } from 'react';
import logoz from "./logo.png"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Report() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }

    const [day1, setday1] = useState('')
    const [day2, setday2] = useState('')
    const [sellers, setsellers] = useState([])
    const [companies, setcompanies] = useState([])
    var selected_sellers = []
    var selected_companies = []
    const [seller_count, setsel_count] = useState('')
    const [seller_sales, setsel_sales] = useState('')
    const [company_count, setcom_count] = useState('')
    const [company_sales, setcom_sales] = useState('')
    const [total, settotal] = useState('')


    function getSelected(array, d1, d2) {
        var a2 = []
        array.filter(function (obj) {
            if (obj.expiryDate >= d1 && obj.expiryDate <= d2) {
                a2.push(obj)
            }
        });

        return a2
    };

    function getValue(array) {
        var sum = 0;
        array.filter(function (obj) {
            sum = sum + obj.value
        });
        return sum;
    }

    function generatePDF() {
        var rep = new jsPDF("p", "pt", "a4")
        rep.html(document.querySelector("#rep1"), {
            callback: function (pdf) {
                pdf.save("report.pdf");
            }
        })
    }

    async function createPDF() {
        const d1 = new Date(day1).toISOString()
        const d2 = new Date(day2).toISOString()

        await axios.get('/api/adminBS/getofferedsellers').then(res => {
            console.log(res.data)
            setsellers(res.data)
        }).catch(err => {
            console.log(err)
        })

        await axios.get('/api/adminBC/getofferedcompanies').then(res => {
            console.log(res.data)
            setcompanies(res.data)
        }).catch(err => {
            console.log(err)
        })

        if (sellers.length != 0 || companies.length != 0) {

            selected_sellers = getSelected(sellers, d1, d2)
            console.log(selected_sellers)

            selected_companies = getSelected(companies, d1, d2)
            console.log(selected_companies)

            setsel_count(selected_sellers.length)
            setsel_sales(getValue(selected_sellers))

            setcom_count(selected_companies.length)
            setcom_sales(getValue(selected_companies))

            
            settotal(getValue(selected_sellers) + getValue(selected_companies))
            console.log(total)

            generatePDF()

        }
    }


    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="newuser">
                    <h1 className="reportTitle">Generate Reports</h1>
                    <form action="" className="newform">

                        <div className="fitems">
                            <label>Select Time Period</label>
                            <label className='slabel'>From</label>
                            <input type="date" placeholder="name"
                                value={day1} onChange={(e) => { setday1(e.target.value) }} /><br />
                            <label className='slabel'>To</label>
                            <input type="date" placeholder="name"
                                value={day2} onChange={(e) => { setday2(e.target.value) }} />
                        </div>
                    </form>
                    <button className="nbutton" onClick={createPDF} type="primary">Generate</button>

                </div>
            </div>
            <Footer />
            <div id="main" style={{ visibility: "hidden", height: 0 }}>
                <div className="salesrep" id="rep1" style={{"borderWidth":"1px", 'borderColor':"white", 'borderStyle':'solid'}}>
                    <div className="rephead">
                        <img src={logoz} height={55} width={110} className="ii" />
                        <h1 style={{ fontSize: '25px' }}>Report</h1>
                    </div>

                    <div className="srpbody" >
                        <span className="top">From  {day1} to {day2}</span>
                        <span className="repitem">Sales Done through the time period = Rs . {total}.00</span>
                        <span className="repitem">Number of Sales done with the Buyers = {seller_count}</span>
                        <span className="repitem">Buyer sales amount = Rs. {seller_sales}.00</span>
                        <span className="repitem">Number of Sales done with the companies  =  {company_count}</span>
                        <span className="repitem">Company   sales amount  =  Rs. {company_sales}.00</span>
                        <span className="repitem">Waste item with the most demand = Glass</span>
                        <span className="repitem">Most prefered waste item by the Buyers = Glass</span>
                        <span className="repitem">Most prefered waste item by the Companies = Paper Material</span>

                    </div>
                </div>
            </div>
        </div>
    )
}
