import React, { useState, useEffect } from "react";
import '../posts/AcceptedOffers.css';
import axios from 'axios';
import moment from 'moment';
import '../posts/LoadingRing.css';

function VNotifications() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const buyerId=(localStorage.getItem("userId"));
    console.log(buyerId);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/viewPendingSellerOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(offers);

    const wasteItem1 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.buyerId===buyerId);
    console.log(wasteItem1);

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

    return(
        <>
            {
                isLoading ?
                    <div className="tables-b">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="tables-b">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="tables-b">
                            <div className="tables__container-b">
                                <h1>Notifications of Seller Offers</h1>
                                <table className="table-b">
                                    <thead>
                                    <tr>
                                        <th>Offer Id</th>
                                        <th>Offer Created At</th>
                                        <th>Offer Expiry Date</th>
                                        <th>Collecting Date</th>
                                        <th>Seller Name</th>
                                        <th>Unit Price (Rs)</th>
                                        <th>Notification</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {wasteItem1.map((note,index)=> (
                                    <tr>
                                        <td data-label="Offer Id">{index + 1}</td>
                                        <td data-label="Offer Created At">{moment(note.offerCreatedAt).fromNow()}</td>
                                        <td data-label="Offer Expiry Date">{moment(note.expiryDate).fromNow()}</td>
                                        <td data-label="Collecting Date">{moment(note.collectingDate).fromNow()}</td>
                                        <td data-label="Seller Name">{note.sellerName}</td>
                                        <td data-label="Unit Price (Rs)">{note.value}</td>
                                        <td data-label="Notification">🚮 Your offer accepted</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tables__container-b">
                                <h1>Notifications of Seller Direct Posts</h1>
                                <table className="table-b">
                                    <thead>
                                    <tr>
                                        <th>Post Id</th>
                                        <th>Post Created At</th>
                                        <th>Seller Name</th>
                                        <th>District</th>
                                        <th>Contact No</th>
                                        <th>Notification</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sellerDirectPosts.map((note,index)=> (
                                    <tr>
                                        <td data-label="Post Id">{index + 1}</td>
                                        <td data-label="Post Created At">{moment(note.createdAt).fromNow()}</td>
                                        <td data-label="Seller Name">{note.sellerName}</td>
                                        <td data-label="District">{note.sellerDistrict}</td>
                                        <td data-label="Contact No">{note.contact}</td>
                                        <td data-label="Notification">♻️You have a direct post</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tables__container-b">
                                <h1>Notifications of Company Offers</h1>
                                <table className="table-b">
                                    <thead>
                                    <tr>
                                        <th>Offer Id</th>
                                        <th>Offer Created At</th>
                                        <th>Offer Expiry Date</th>
                                        <th>Collecting Date</th>
                                        <th>Unit Price (Rs)</th>
                                        <th>Quantity (Kg)</th>
                                        <th>Company Name</th>
                                        <th>Notification</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {wasteItem3.map((note,index)=> (
                                        <tr>
                                            <td data-label="Offer Id">{index + 1}</td>
                                            <td data-label="Offer Created At">{moment(note.offerCreatedAt).fromNow()}</td>
                                            <td data-label="Offer Expiry Date">{moment(note.expiryDate).fromNow()}</td>
                                            <td data-label="Collecting Date">{moment(note.collectingDate).fromNow()}</td>
                                            <td data-label="Unit Price (Rs)">{note.value}</td>
                                            <td data-label="Quantity (Kg)">{note.quantity}</td>
                                            <td data-label="Company Name">{note.companyName}</td>
                                            <td data-label="Notification">🚮 Your offer accepted</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tables__container-b">
                                <h1>Notifications of Company Direct Posts</h1>
                                <table className="table-b">
                                    <thead>
                                    <tr>
                                        <th>Post Id</th>
                                        <th>Post Created At</th>
                                        <th>Company Name</th>
                                        <th>Waste Type</th>
                                        <th>Waste Item</th>
                                        <th>Contact No</th>
                                        <th>Notification</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {companyDirectPosts.map((note,index)=> (
                                        <tr>
                                            <td data-label="Post Id">{index + 1}</td>
                                            <td data-label="Post Created At">{moment(note.createdAt).fromNow()}</td>
                                            <td data-label="Company Name">{note.companyName}</td>
                                            <td data-label="Waste Type">{note.wasteType}</td>
                                            <td data-label="Waste Item">{note.item}</td>
                                            <td data-label="Contact No">{note.contact}</td>
                                            <td data-label="Notification">♻️You have a direct post</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>
            }

        </>
    );
}

export default VNotifications;