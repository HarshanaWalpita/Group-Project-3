import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import '../../buyer/posts/LoadingRing.css';
import moment from 'moment';


export default function SellerOfferList() {
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "seller")) {
        history.push("/");
    }

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const sellerId = (localStorage.getItem("userId"));
    console.log("offers page");
    console.log(sellerId)
    const history = useHistory()
   
    
    const [buyerOffers, getBuyerOffers] = useState([]);
    useEffect(() => {
        getAllBuyerOffers();
    },[]);

    const getAllBuyerOffers = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`/sellerViewOffers/${sellerId}`);
                console.log(response);
                const allOffers = response.data.existingOffers;
                if (allOffers.length === 0) {
                    setIsEmpty(true)
                } else {
                    getBuyerOffers(allOffers);
                    setIsLoading(false);
                    setIsEmpty(false);
                }
               
            } catch (error) {
                console.error(`Error: ${error}`)
                setHasError(true)
            }
    }

    console.log(buyerOffers);
    

    const sellerDeclineOffer = (offerId) => {
        const data = {
            status:"declined"
        }
        axios.patch(`/sellerDeclineOffer/${offerId}`, data)
            .then((result) => {
                console.log("offer Rejected");
                
            });
        window.location.reload();
    }
    const sellerAcceptCompletePostOffer = (offerId, postId) => {
        var vfCode = Math.floor(100000 + Math.random() * 900000);
        console.log("asp")
        const data = {
            status: "accepted",
            postId: postId,
            verificationCode: vfCode,
        };
        axios.patch(`/sellerAcceptPostOffer/${offerId}`, data)
            .then((result) => {
                console.log("ACCPTED")
           //     clear();
              //  toastNotification();
              //  history.push(`/seller/home`);
            });
        window.location.reload();
        
    }

    const sellerAcceptWasteItemOffer = (itemId, offerId) => {
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
                });
        window.location.reload();
        
        }
      
    return (
        <>
            {
                isLoading ?
                    <div className="seller-post-list-background">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="seller-post-list-background">
                            <h1>Error occured.</h1>
                        </div> : isEmpty ?
                            <div className="seller-post-list-background">
                                <h1>loading ..</h1>
                            </div> :
                        <div className="seller-post-list-background">
                            <div className="seller-post-list">
                            <main className="grid-b">
                                {buyerOffers.map((offer) => {
                                    if (offer.wasteItemsListId === "completePost" && offer.status === "pending")
                                        return (
                                            <article>
                                                <img src={offer.postId.thumbnail} alt=""></img>
                                                <div className="text-b">
            
                                                    <p>Buyer Name: {offer.buyerName}</p>
                                                    <p>Offer For Complete Post</p>
                                                    <p>{offer.status}</p>
                                                    <p>Value: {offer.value}</p>
                                                    <p>Collecting Date: {offer.collectingDate} At: {offer.collectingTime}</p>
                                                    <p>Offer Expiery Date: {offer.expiryDate}</p>
                                                    <div className="buyerlink-b">
                                                        <Link style={{ color: '#fff', textDecoration: 'none' }}
                                                            to={`/seller/viewpost/${offer.postId._id}`}>View Post <i
                                                                className="fas fa-angle-double-right"></i></Link>
                                                    </div>
                                                    <div className="buyerlink-b">
                                                        <button className="accept-btn" onClick={() => {

                                                            sellerAcceptCompletePostOffer(offer._id, offer.postId._id);
                                                        }}>Accept</button>
                                                    </div>
                                                    <div className="buyerlink-b">
                                                        <button className="accept-btn" onClick={() => {
                                                            sellerDeclineOffer(offer._id);
                                                        }}>Decline</button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    else if (offer.status === "pending") {
                                        var item = offer.postId.wasteItemList.find(element => element._id === offer.wasteItemsListId);
                                        return (
                                            <article>
                                                <img src={item.selectedFile} alt=""></img>
                                                <div className="text-b">
                                            
                                                    <p>Buyer Name: {offer.buyerName}</p>
                                                    <p>Offer For Waste Item</p>
                                                    <p>{offer.status}</p>
                                                    <p>Value: {offer.value}</p>
                                                    <p>Collecting Date: {offer.collectingDate} At: {offer.collectingTime}</p>
                                                    <p>Offer Expiery Date: {offer.expiryDate}</p>
                                                    <div className="buyerlink-b">
                                                        <Link style={{ color: '#fff', textDecoration: 'none' }}
                                                            to={`/seller/viewpost/${offer.postId._id}`}>View Post <i
                                                                className="fas fa-angle-double-right"></i></Link>
                                                    </div>
                                                    <div className="buyerlink-b">
                                                        <button className="accept-btn" onClick={() => {
                                                           sellerAcceptWasteItemOffer(item._id, offer._id) 
                                                        }}>Accept</button>
                                                    </div>
                                                    <div className="buyerlink-b">
                                                        <button className="accept-btn" onClick={() => {
                                                            sellerDeclineOffer(offer._id);
                                                        }}>Decline</button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                        
                                    }
                            })}
                                </main>
                          
                            </div>
                            

                        </div>
            }

        </>
    )
    
}