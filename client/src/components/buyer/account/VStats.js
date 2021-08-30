import React, { useState, useEffect } from "react";
import './VStats.css';
import '../posts/AcceptedOffers.css';
import axios from 'axios';

function VStats() {

    const buyerId=(localStorage.getItem("userId"));
    console.log(buyerId);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingSellerOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem1 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.buyerId===buyerId);
    console.log(wasteItem1);

    const acceptedSellerOffers = wasteItem1.length;
    console.log(acceptedSellerOffers);

    const wasteItem2 = offers?.filter(wasteItem => wasteItem.status==='pending' && wasteItem.buyerId===buyerId);
    console.log(wasteItem2);

    const pendingSellerOffers = wasteItem2.length;
    console.log(pendingSellerOffers);

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        await axios.get(`/buyerPosts`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setNotes(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(notes);

    const sellerDirectPosts = notes?.filter(wasteItem => wasteItem.postType==='direct' && wasteItem.buyer===buyerId);
    console.log(sellerDirectPosts);

    const SellerPosts = sellerDirectPosts.length;
    console.log(SellerPosts);

    const [companyOffers, setCompanyOffers] = useState([]);

    useEffect(()=>{
        getAllCompanyOffers();
    }, []);

    const getAllCompanyOffers = async () => {
        await axios.get(`/viewPendingCompanyOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setCompanyOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(companyOffers);

    const wasteItem3 = companyOffers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.buyerId===buyerId);
    console.log(wasteItem3);

    const acceptedCompanyOffers = wasteItem3.length;
    console.log(acceptedCompanyOffers);

    const wasteItem4 = companyOffers?.filter(wasteItem => wasteItem.status==='pending' && wasteItem.buyerId===buyerId);
    console.log(wasteItem4);

    const pendingCompanyOffers = wasteItem4.length;
    console.log(pendingCompanyOffers);

    const [companyNotes, setCompanyNotes] = useState([]);

    useEffect(()=>{
        getAllCompanyNotes();
    }, []);

    const getAllCompanyNotes = async () => {
        await axios.get(`/buyerGetCompanyPosts`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setCompanyNotes(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(companyNotes);

    const companyDirectPosts = companyNotes?.filter(wasteItem => wasteItem.postType==='direct' && wasteItem.buyer===buyerId);
    console.log(companyDirectPosts);

    const companyPosts = companyDirectPosts.length;
    console.log(companyPosts);

    return(
        <div className="tables-b">
            <div className="viewstats">
                <h1 style={{color:'#164A41', marginBottom:'50px'}}>SELLER STATS</h1>
                <div className="cards-ba">
                    <div className="card-single-ba">
                        <h1>⌛ {pendingSellerOffers}</h1>
                        <span>Pending Offers</span>
                    </div>
                    <div>
                        <span className="las la-users"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>✅ {acceptedSellerOffers}</h1>
                        <span>Accepted Offers</span>
                    </div>
                    <div>
                        <span className="las la-clipboard"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>🚮 {SellerPosts}</h1>
                        <span>Seller Requests</span>
                    </div>
                    <div>
                        <span className="las la-shopping-bag"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>{pendingSellerOffers+acceptedSellerOffers}</h1>
                        <span>All Offers</span>
                    </div>
                    <div>
                        <span className="las la-shopping-wallet"></span>
                    </div>
                </div>

                <h1 style={{color:'#164A41', marginBottom:'50px', marginTop:'50px'}}>COMPANY STATS </h1>
                <div className="cards-ba">
                    <div className="card-single-ba">
                        <h1>⌛ {pendingCompanyOffers}</h1>
                        <span>Pending Offers</span>
                    </div>
                    <div>
                        <span className="las la-users"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>✅ {acceptedCompanyOffers}</h1>
                        <span>Accepted Offers</span>
                    </div>
                    <div>
                        <span className="las la-clipboard"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>♻️ {companyPosts}</h1>
                        <span>Company Requests</span>
                    </div>
                    <div>
                        <span className="las la-shopping-bag"></span>
                    </div>
                    <div className="card-single-ba">
                        <h1>{pendingCompanyOffers+acceptedCompanyOffers}</h1>
                        <span>All Offers</span>
                    </div>
                    <div>
                        <span className="las la-shopping-wallet"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VStats;