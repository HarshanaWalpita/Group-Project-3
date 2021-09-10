import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
import ProPIc from './BuyerImages/images.jpg';
import "./BuyerReviews.css";
import CardItem from "../../company/components/company/home/CardItem";
import RateAndCommentArea from "./RateAndCommentArea";
import ViewRateAndComments from "./ViewRateAndComments";
import '../../buyer/posts/LoadingRing.css';

export default function BuyerDetails() {

    const { buyerId } = useParams();
    console.log("buyer");
    console.log(buyerId);

    const [comments, setComments] = useState([]);
    const [buyer, setBuyerDetails] = useState({});
    const [offerList, setOfferList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const [hasCommentError, setHasCommentError] = useState(false);


    useEffect(() => {
        getBuyerDetails();
    }, [])
    

    const getBuyerDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/sellerViewBuyerDetails/${buyerId}`)
            console.log(response);
            const buyerData = response.data.buyer;
            console.log(buyerData);
            setBuyerDetails(buyerData);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    useEffect(() => {
        getComments();
    }, [])

    const getComments = async () => {
        setIsCommentLoading(true);
        try {
            const responce = await axios.get(`/viewUserComments/${buyerId}`)
            const commentlist = responce.data.buyerComments;
            setComments(commentlist);
            console.log("comments", comments);
            setIsCommentLoading(false);
        } catch (error) {
            console.error(`Error: ${error}`);
            setHasCommentError(true);
        }
    }
    console.log(comments);
    
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
                        <div className="Buyer-details-background">
                            <div className="seller-buyer-details-card">
                                <div className="seller-buyer-details">
                                    <div className="seller-col-25">
                                        <h1>{buyer.buyerName}</h1>
                                        <div className="ratings-star">
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                        </div>
                        
        
                                        <img src={ProPIc}></img>
                                        <p>{buyer.buyerDescription}</p>
                                    </div>
                                    <div className="seller-col-75">
                                        <div className="s-b-detail">
                                            <h2>Address:</h2>
                                            <p>{buyer.buyerAddress}</p>
                                        </div>
                                        <div className="s-b-detail">
                                            <h2>Contact Number:</h2>
                                            {buyer && buyer?.buyerContact && buyer?.buyerContact.map((contact) => {
                                                return (
                                                    <p>{contact}</p>
                                                );
                                            })}
                        
                                        </div>
                    
                    
                                        <div className="seller-buyer-type-list">
                                            <h2>Favourite Waste Types:</h2>
                                            <ul>
                                                {buyer && buyer?.favouriteWasteTypes && buyer?.favouriteWasteTypes.map((type) => {
                                                    return (
                                                        <li>{type}</li>
                                                    );

                                                })}
                                
                                            </ul>
                        
                                        </div>
                                        <div className="seller-buyer-type-list">
                                            <h2>Favourite Waste Items:</h2>
                                            <ul>
                                                {buyer && buyer?.favouriteWasteItems && buyer?.favouriteWasteItems.map((item) => {
                                                    return (
                                                        <li>{item}</li>
                                                    );

                                                })}
                                
                                            </ul>
                        
                                        </div>
                                        <div className="seller-buyer-area-list">
                                            <h2>Favourite Collecting Areas:</h2>
                                            <ul>
                                                {buyer && buyer?.favouriteAreas && buyer?.favouriteAreas.map((area) => {
                                                    return (
                                                        <li>{area}</li>
                                                    );
                                                })}
                                
                            
                                            </ul>
                        
                                            <div className="seller-sell-now">

                                                <div className="seller-view-offer-button-2">
                                                <Link style={{ textDecoration: 'none', color:"#ffffff"}}
                                                    to={`/seller/directpost/${buyer.buyerId}`}>Sell Now <i
                                                        className="fas fa-angle-double-right"></i></Link>
                                                </div>
                                            </div>
                                            
                                            <div className="seller-sell-now">
                                                <div className="seller-view-offer-button-2">
                                                <Link style={{ textDecoration: 'none', color:"#ffffff"}}
                                                    to={`/seller/addcomplaint/${buyerId}`}>Add Complaint <i
                                                        className="fas fa-angle-double-right"></i></Link>
                                                </div>

                                            </div>
                        
                        
                                        </div>
                    
                    
                                    </div>
                                </div>
                            </div>

                            <div className="seller-rate-component">
                                <RateAndCommentArea userId={buyerId} userName={buyer.buyerName} />
                            </div>
                            
                            <div className="buyer-comments-area">
                                <h1>Comments</h1>
                                {
                                    isCommentLoading ?
                       
                                        <div className="lds-ring">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        : hasCommentError ?
                            
                                            <h1>Error Occurred</h1>
                                            :
                                            <div>
                                                {comments && comments.map((comment, index) => {
                                                    return (
                                                        <div>
                                                            <ViewRateAndComments comment={comment} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                }
                            </div>
                        </div>
            }
        </>
    );
} 
