import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import './PendingPosts.css';


import '../../buyer/posts/LoadingRing.css';

export default function ItemOffers() {
    const { itemId } = useParams();
    console.log(itemId);

    const [offers, setOffers] = useState([]);
    console.log(offers);
    const WAIT_TIME = 5000;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get(`/viewItemOffers/${itemId}`)
                .then(res => {
                    setOffers(res.data.existingOffers)
                })
                .catch(err => {
                    console.log(err);
                })
        }, WAIT_TIME)
    }, [offers]);

    console.log(offers);
   

    const avbOffers = offers.filter(o => o.status === "pending");
    const decOffers = offers.filter(o => o.status === "decline");

    const sellerAcceptWasteItemOffer = (offerId) => {
        console.log("accept", itemId);
        var vfCode = Math.floor(100000 + Math.random() * 900000);
     
            console.log("item",itemId)
            const data = {
                status: "accepted",
                wasteItemsListId: itemId,
                verificationCode: vfCode,
            };
            axios.patch(`/sellerAcceptWasteItemOffer/${offerId}`, data)
                .then((result) => {
                    console.log("offer accepted")
                    alert("Offer Accepted");
                });
     //   window.location.reload();
        
    }
    const sellerDeclineOffer = (offerId, e) => {
        e.preventDefault();
        const data = {
            status:"declined"
        }
        axios.patch(`/sellerDeclineOffer/${offerId}`, data)
            .then((result) => {
                console.log("offer Rejected");
                alert("Offer Rejected");
            });
    //   window.location.reload();
    }

    return (
        <>
            <div className="seller-post-list-background">
                <div className="seller-post-list">
                    <div className="seller-post-offers">
                        <div><h4>Available Offer List</h4></div>
                        <table className="seller-accepted-offers-table">
                            <tr>
                                <th>Offer Id</th>
                                <th>Buyer</th>
                                <th>Collecting Date</th>
                                <th>Collecting Time (Aprox:)</th>
                                <th>Offer(Rs)</th>
                                <th>Offer Exp: Date</th>
                                <th>Action</th>
                            </tr>
                            {avbOffers && avbOffers.map((offer, index) => {
                                if (avbOffers.length === 0) {
                                    return (
                                        <div><p>No Avilable Offers</p></div>
                                    )
                                } else {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{offer.buyerName}</td>
                                            <td>{moment(offer.collectingDate).format("LLL")}</td>
                                            <td>{offer.collectingTime}</td>
                                            <td>{offer.value}</td>
                                            <td>{moment(offer.expiryDate).format("LLL")}</td>
                                            <td><a hreff="#" className="item-edit-button" onClick={() => {
                                                let offerId = offer._id;
                                                console.log(offerId);
                                                sellerAcceptWasteItemOffer(offerId);
                                            }}>Accept</a>
                                                <a className="item-remove-button" hreff="#" onClick={(e) => {
                                                    let offerId = offer._id;
                                                    sellerDeclineOffer(offerId,e)
                                                }}>Decline</a> </td>
                                        </tr>
                                    );
                                   
                                }
                            })
                            }
                           
                        </table>
                      
                    </div>
                    <div className="seller-post-offers">
                        <div><h4>Declined Offer List</h4></div>
                        <table className="seller-accepted-offers-table">
                            <tr>
                                <th>Offer Id</th>
                                <th>Buyer</th>
                                <th>Collecting Date</th>
                                <th>Collecting Time (Aprox:)</th>
                                <th>Offer(Rs)</th>
                                <th>Offer Exp: Date</th>
                               
                            </tr>
                            {decOffers && decOffers.map((offer, index) => {
                                if (decOffers.length === 0) {
                                    return (
                                        <div><p>No Declined Offers</p></div>
                                    )
                                } else {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{offer.buyerName}</td>
                                            <td>{moment(offer.collectingDate).format("LLL")}</td>
                                            <td>{offer.collectingTime}</td>
                                            <td>{offer.value}</td>
                                            <td>{moment(offer.expiryDate).format("LLL")}</td>
                                           
                                        </tr>
                                    );
                                   
                                }
                            })
                            }
                           
                        </table>
                      
                    </div>
                </div>
            </div>
            
        </>
    );
}