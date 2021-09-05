import './SellerStats.css';
import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatsLoadingRing.css';
export default function SellerStats() {

    const history = useHistory()
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "seller")) {
        history.push("/");
    }

    const sellerId = (localStorage.getItem("userId"));

    const [allPosts, setAllPosts] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const [hasError, setHasError] = useState(false);
    var [allPostLoading, setAllPostLoading] = useState(false);
    var [allOfferLoading, setAllOfferLoading] = useState(false);
    useEffect(() => {
        getAllSellerPosts()
    },[])

    useEffect(() => {
        getAllSellerOffers()
    },[])

    const getAllSellerPosts = async () => {
        setAllPostLoading(true);
        await axios.get(`/viewAllPosts/${sellerId}`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setAllPosts(allNotes)
                setAllPostLoading(false)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
                setHasError(true);
            });
    }

    const getAllSellerOffers = async () => {
        setAllOfferLoading(true);
        await axios.get(`/viewAllOffers/${sellerId}`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setAllOffers(allNotes)
                setAllOfferLoading(false)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
                setHasError(true);
            });
    }
    console.log("offers", allOffers);
    console.log("allPosts", allPosts);
    console.log(allPostLoading);
    console.log(allOfferLoading);

    var acceptedOffers = allOffers.filter(o => o.status === "accepted");
    var pendingOffers = allOffers.filter(o => o.status === "pending");
    var totalValue = acceptedOffers.reduce((prev, next) => prev + next.value, 0)
    var acceptedItemOffers = acceptedOffers.filter(o => o.wasteItemsListId !== "completePost");
    var acceptedPostOffers = acceptedOffers.filter(o => o.wasteItemsListId === "completePost");
    console.log(allPosts - acceptedPostOffers);
    console.log(acceptedPostOffers.length);
    return (
        <div className="seller-stats-background">
            <div className="seller-stat-card-row-header">
                <h1>Ongoing Transactions</h1>
            </div>
            <div className="seller-stat-card-row">
            
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Pending Posts</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                        {allPostLoading && allOfferLoading ?
                                <div class="loader"></div>
                                :
                                <p>{allPosts.lenght - acceptedPostOffers.length}</p>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Pending Offers</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                        {allOfferLoading ?
                               <div class="loader"></div> :
                                <p>{pendingOffers.length}</p>
                            }
                        </div>
                    </div>
                </div>
               
                
            </div>
            <div className="seller-stat-card-row-header">
                <h1>Total Transactions</h1>
            </div>
            <div className="seller-stat-card-row">
            <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Total Posts</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            {allPostLoading ?
                                <div class="loader"></div>
                                :
                                <p>{allPosts.length}</p>
                            }
                        </div>
                        
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Total Value</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            {allOfferLoading ?
                                <div class="loader"></div>
                                :
                                <p>{totalValue}</p>
                            }
                        </div>
                        
                    </div>
                </div>
                
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Total Offers</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                        {allOfferLoading ?
                               <div class="loader"></div> :
                                <p>{allOffers.length}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Accepted Offers</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                        {allOfferLoading ?
                               <div class="loader"></div> :
                                <p>{acceptedOffers.length}</p>
                            }
                        </div>
                    </div>
                </div>
                
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Completed Posts </h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            {allOfferLoading ?
                                <div class="loader"></div> :
                                <p>{acceptedPostOffers}</p>
                            }
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        
    )
}