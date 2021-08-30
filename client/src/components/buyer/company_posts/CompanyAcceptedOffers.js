import React, {useEffect, useState} from "react";
import '../posts/Posts.css';
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";
import '../posts/LoadingRing.css';

function CompanyAcceptedOffers() {

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
        await axios.get(`/viewPendingCompanyOffers`)
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

        axios.get(`/viewPendingCompanyOffers`).then((res) => {
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
                                <h1>Company Accepted Offers</h1>
                                <div className="search_box-b">
                                    <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                                    <i className="fas fa-search"></i>
                                </div>
                                <main className="grid-b">
                                    {offers.map((offer,index)=> {
                                        if(offer.status==='accepted' && offer.buyerId===buyerId)
                                            return (
                                                <article>
                                                    <div className="text-b">
                                                        <h3>Post ID: {index + 1}</h3>
                                                        <p>Company Name: {offer.companyName}</p>
                                                        <p>Quantity (Kg): {offer.quantity}</p>
                                                        <p>Unit Price (Rs): {offer.value}</p>
                                                        <p>Expiry Date: {moment(offer.expiryDate).fromNow()}</p>
                                                        <p>Collecting Date: {moment(offer.collectingDate).fromNow()}</p>
                                                        <p>Offer Gives: {moment(offer.offerCreatedAt).fromNow()}</p>
                                                        <div className="buyerlink-b">
                                                            <Link style={{color: '#fff', textDecoration: 'none'}}
                                                                  to={`/buyer/viewcompanyofferdetails/${offer._id}/${offer.companyId}`}>View Details <i className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                    })}
                                </main>
                            </div>
                        </div>
            }

        </>
    );
}

export default CompanyAcceptedOffers;