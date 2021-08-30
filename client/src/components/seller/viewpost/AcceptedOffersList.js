import './PendingPosts.css';
import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import '../../buyer/posts/LoadingRing.css';
import moment from 'moment';
import AcceptedOffer from "./AcceptedOffer"

export default function AcceptedOffersList() {
    const history = useHistory()
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "seller")) {
        history.push("/");
    }

    const sellerId = (localStorage.getItem("userId"));
    console.log(sellerId)
    useEffect(() => {
        getAcceptedOffers()
    }, [])
    
    const [acceptedOffers, setAcceptedOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
   
    const getAcceptedOffers = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/sellerViewAcceptedOffers/${sellerId}`);
          //  console.log(response);
            const acceptedOffers = response.data.acceptedOffers;
            setAcceptedOffers(acceptedOffers);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log("accepyted offers")
    console.log(acceptedOffers)
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
                        </div> :
                        <div className="seller-post-list-background">
                            <div className="seller-accepted-offers">
                                
                                <div className="seller-offer-list">
                                <main className="grid-b">
                                    {acceptedOffers.map((offer) => {
                                        if (offer.wasteItemsListId === "completePost") {
                                            return (
                                                <AcceptedOffer offer={offer} post={"Complete Post"}/>
                                            )
                                        } else {
                                            var item = offer.postId.wasteItemList.find(element => element._id === offer.wasteItemsListId);
                                            return (
                                                <AcceptedOffer offer={offer} post={"Post Item"} item={item} />
                                            )
                                        }
                        
                                    })}
                    
                                </main>
                                   
                                </div>
                            </div>
                        </div>
                
            }
        </>
        
    );
}