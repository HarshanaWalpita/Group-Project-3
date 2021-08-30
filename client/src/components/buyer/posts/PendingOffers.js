import React, { useState, useEffect } from "react";
import './Posts.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './LoadingRing.css';

function PendingOffers() {

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

    const deleteOffer = (id) => {
        axios.delete(`/deletePendingSellerOffer/${id}`)
            .then((result) => {
                toastNotification();
                getAllOffers();
            });
    };

    const toastNotification = () => {
        toast.info("Deleted successfully !", {
            transition: Slide
        })
    };

    const filterData = (offersPara, searchKey) => {
        const result = offersPara.filter(
            (offers) =>
                offers?.value.toString().toLowerCase().includes(searchKey) ||
                offers?.quantity.toString().toLowerCase().includes(searchKey)
        );
        setOffers(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get(`/viewPendingSellerOffers`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingOffers, searchKey);
            }
        });
    };

    return(
        <>
            {
                isLoading ?
                    <div className="posts-b">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="posts-b">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="posts-b">
                            <div className="posts__container-b">
                                <h1>Pending Offers</h1>
                                <div className="search_box-b">
                                    <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                                    <i className="fas fa-search"></i>
                                </div>
                                <main className="grid-b">
                                    {offers.map((offer,index)=> {
                                        if(offer.status==='pending' && offer.buyerId===buyerId)
                                        return (
                                            <article>
                                                <img src={offer.offerThumbnail} alt=""></img>
                                                <div className="text-b">
                                                    <h3>Post ID: {index + 1}</h3>
                                                    <p>Seller Name: {offer.sellerName}</p>
                                                    <p>Unit Price (Rs): {offer.value}</p>
                                                    <p>Expiry Date: {moment(offer.expiryDate).fromNow()}</p>
                                                    <p>Collecting Date: {moment(offer.collectingDate).fromNow()}</p>
                                                    <p>Offer Gave: {moment(offer.offerCreatedAt).fromNow()}</p>
                                                    <div className="buyerlink-b">
                                                        <Link style={{color: '#fff', textDecoration: 'none'}}
                                                              to={`/buyer/viewofferdetails/${offer._id}`}>View Details <i className="fas fa-angle-double-right"></i></Link>
                                                    </div>
                                                    <div className="buyerlink-b">
                                                        <Link style={{color: '#fff', textDecoration: 'none'}}
                                                              to={`/buyer/editpendingoffers/${offer._id}`}>Edit Offer <i className="fas fa-edit"></i></Link>
                                                    </div>
                                                    <div className="delete-button-b">
                                                        <button onClick={() => {
                                                            deleteOffer(offer._id)
                                                        }}>Delete Offer <i className="fas fa-trash-alt"></i></button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </main>
                            </div>
                            <ToastContainer position="top-right" toastStyle={{ backgroundColor: "orange" }} autoClose={3000} />
                        </div>
            }

        </>
    );
}

export default PendingOffers;