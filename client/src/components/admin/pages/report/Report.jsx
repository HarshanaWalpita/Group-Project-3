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

export default function Report() {

    const [day1,setday1] = useState('')
    const [day2,setday2] = useState('')
    const [sellers,setsellers] = useState([])
    var selected_sellers=[]
    var selected_companies=[]
    const [seller_count,setsel_count] = useState('')
    const [seller_sales,setsel_sales] = useState('')

    function getSelected(array,d1,d2){
        var a2 = []
        array.filter(function(obj){
            if(obj.expiryDate >= d1 && obj.expiryDate <= d2){
                a2.push(obj)
            }});
        
        return a2    
    };

    function getValue(array){
        var sum = 0;
        array.filter(function(obj){
            sum = sum + obj.value
        });
        return sum;
    }

    function generatePDF(){
        var rep = new jsPDF("p","pt","a4")
        rep.html(document.querySelector("#rep1"),{
            callback: function(pdf){
                pdf.save("report.pdf");   
            }
        })
    }

    function createPDF(){
        const d1 = new Date(day1).toISOString()
        const d2 = new Date(day2).toISOString()

        axios.get('/api/adminBS/getofferedsellers').then(res=>{
            console.log(res.data)
            setsellers(res.data)
        }).catch(err=>{
            console.log(err)
        })

        if(sellers.length!=0)
        {
            console.log(sellers)
            selected_sellers = getSelected(sellers,d1,d2)
   
           setsel_count(selected_sellers.length)
           setsel_sales(getValue(selected_sellers))
           
            generatePDF();
   
        }
    }


    return (
        <div>
        <Navbar/>
        <div className="container">
            <Sidebar/>
        <div className="newuser">
            <h1 className="reportTitle">Generate Reports</h1>
            <form action="" className="newform">
                
                <div className="fitems">
                    <label>Select Time Period</label>
                    <label className='slabel'>From</label>
                    <input type="date" placeholder="name"
                    value={day1} onChange={(e)=>{setday1(e.target.value)}} /><br/>
                    <label className='slabel'>To</label>
                    <input type="date" placeholder="name"
                    value={day2} onChange={(e)=>{setday2(e.target.value)}} />
                </div>
            </form>
            <button className="nbutton" onClick={createPDF} type="primary">Generate</button>  
           
        </div>
        </div>
        <Footer/>
        <div id="main" style={{ visibility: "hidden", height: 0 }}>
                <div className="salesrep" id="rep1"> 
                    <div className="rephead">
                        <img src={logoz} height={55} width={110} className="ii"/>
                        <h1 style={{fontSize:'25px'}}>Report</h1>
                    </div>

                    <div className="srpbody">
                        <span className="top">From  {day1} to {day2}</span>
                        <span className="repitem">Sales Done through the time period = {seller_sales}</span>
                        <span className="repitem">Number of Sales done by the Sellers = {seller_count}</span>
                        <span className="repitem">Sellers Sale amount</span>
                        <span className="repitem">Number of Sales done by the Buyers</span>
                        <span className="repitem">Buyers Sale amount</span>
                        <span className="repitem">Waste item with the most demand</span>
                        <span className="repitem">Most prefered waste item by the Buyers</span>
                        <span className="repitem">Most prefered waste item by the Companies</span>

                    </div>
                </div>
            </div>    
        </div>
    )
}
