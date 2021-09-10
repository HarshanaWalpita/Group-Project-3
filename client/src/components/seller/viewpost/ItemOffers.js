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
    /*
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
*/
    console.log(offers);
    useEffect(() => {
        getAllOffers()
    })
   
    const getAllOffers = async () => {
        try {
            //gets only complete post offers with the post
            const response = await axios.get(`/viewItemOffers/${itemId}`)
            console.log(response);
            const allOffers = response.data.existingOffers;
            setOffers(allOffers);
          //  setOfferLlists(offers);
        //    setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
         //   setHasError(true)
        }
    }
    /*
    var avbOffers = [{}];
    var decOffers = [{}];
    var acceptedOffers = [{}];
    const setOfferLlists = (offers) => {
        avbOffers = offers.filter(o => o.status === "pending");
        decOffers = offers.filter(o => o.status === "decline");
        acceptedOffers = offers.filter(o => o.status === "accepted");
    }
    
    const avbOffers = offers.filter(o => o.status === "pending");
    const decOffers = offers.filter(o => o.status === "decline");
    const acceptedOffers = offers.filter(o => o.status === "accepted");
    console.log(avbOffers);
    console.log(decOffers);
    
    var avbOffNum = avbOffers.length;
    
   // var acceptedOffer = offers.filter(o => o.status === "accepted");
    console.log(avbOffers.length);
   // console.log(decOffers.length);
   // console.log(acceptedOffer.lenght);
   */
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
                    getAllOffers();
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
                getAllOffers();
            });
    //   window.location.reload();
    }
    
    
    return (
        <>
           
            <div className="seller-post-list-background">
                <div className="seller-post-list">
                <div className="seller-post-offers">
                       
                       {offers && (offers.filter(o => o.status === "accepted")).length == 0 ?
                           <div></div>
                           :
                           <div><h4>Accepted Offer: </h4>
                           <table className="seller-accepted-offers-table">
                               <tr>
                                   
                                   <th>Buyer</th>
                                   <th>Collecting Date</th>
                                   <th>Collecting Time (Aprox:)</th>
                                   <th>Offer(Rs)</th>
                                   <th>Verification Code</th>
                              
                               </tr>
                               {offers && offers?.map((offer, index) => {
                                   if (offer.status === "decline") {
                                       return (
                                           <tr>
                                               
                                               <td>{offer.buyerName}</td>
                                               <td>{moment(offer.collectingDate).format("LLL")}</td>
                                               <td>{offer.collectingTime}</td>
                                               <td>{offer.value}</td>
                                               <td>{offer.verificationCode}</td>
                                          
                                           </tr>
                                       );
                                  
                                   }
                               })
                               }
                          
                               </table>
                               </div>
                       }
                   </div>
                    <div className="seller-post-offers">
                        <div><h4>Available Offers:</h4></div>
                        {
                           offers && (offers.filter(o=>o.status === "pending")).length == 0 ?
                                <div><h5>No Available offers</h5></div>
                                :

                        
                                <table className="seller-accepted-offers-table">
                                    <tr>
                                       
                                        <th>Buyer</th>
                                        <th>Collecting Date</th>
                                        <th>Collecting Time (Aprox:)</th>
                                        <th>Offer(Rs)</th>
                                        <th>Offer Exp: Date</th>
                                        <th>Action</th>
                                    </tr>
                                    
                                    {offers && offers?.map((offer, index) => {
                                        if (offer.status === "pending") {
                                            return (
                                                <tr>
                                                   
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
                                                            sellerDeclineOffer(offerId, e)
                                                        }}>Decline</a> </td>
                                                </tr>
                                            );
                                   
                                        }
                                    })
                                    }
                           
                                </table>
                        }
                    </div>
                    <div className="seller-post-offers">
                        <div><h4>Declined Offers:</h4></div>
                        {offers && (offers.filter(o => o.status === "decline")).length == 0 ?
                            <div><h5>No Declined offers</h5></div>
                            :
                            <table className="seller-accepted-offers-table">
                                <tr>
                                    
                                    <th>Buyer</th>
                                    <th>Collecting Date</th>
                                    <th>Collecting Time (Aprox:)</th>
                                    <th>Offer(Rs)</th>
                                   
                               
                                </tr>
                                {offers && offers?.map((offer, index) => {
                                    if (offer.status === "decline") {
                                        return (
                                            <tr>
                                                
                                                <td>{offer.buyerName}</td>
                                                <td>{moment(offer.collectingDate).format("LLL")}</td>
                                                <td>{offer.collectingTime}</td>
                                                <td>{offer.value}</td>
                                               
                                           
                                            </tr>
                                        );
                                   
                                    }
                                })
                                }
                           
                            </table>
                        }
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}