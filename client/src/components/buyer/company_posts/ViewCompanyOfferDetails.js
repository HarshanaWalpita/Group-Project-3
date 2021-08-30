import React, { useState, useEffect } from "react";
import '../posts/Posts.css';
import {useParams} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import '../posts/LoadingRing.css';

function ViewOfferDetails() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { offerId, companyId } = useParams();
    console.log(offerId, companyId);

    const [posts, setPosts] = useState({});
    const [offerPosts, setOfferPosts] = useState({});

    useEffect(()=>{
        getOnePost();
    }, []);

    const getOnePost = async () => {
        try {
            const response = await axios.get(`/buyerGetOneCompanyOffer/${offerId}`)
            console.log(response);
            const allPost=response.data.oneOffer;
            setPosts(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(posts);

    const getOneOfferPost = async () => {
        setIsLoading(true)
        if(PostId2 !== undefined) {
            try {
                const response = await axios.get(`/buyerGetOneCompanyPost/${PostId2}`)
                console.log(response);
                const allOfferPost=response.data.onePost;
                setOfferPosts(allOfferPost);
                setIsLoading(false)
            } catch (error) {
                console.error(`Error: ${error}`)
                setHasError(true)
            }
        }
    }
    const PostId2=posts.postId;

    useEffect(()=>{
        getOneOfferPost();
    }, [PostId2]);

    console.log(offerPosts);
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
                                <h1>Post Details</h1>
                                <div className="seller-container-b">
                                    <ol className="list">
                                        <li ><span>Company Name: {offerPosts.companyName}</span></li>
                                        <li ><span>Telephone No: {offerPosts.contact}</span></li>
                                        <li ><span>Address: {offerPosts?.address?.number}, {offerPosts?.address?.street}, {offerPosts?.address?.city}, {offerPosts?.address?.district}</span></li>
                                        <li ><span>Post Waste Type: {offerPosts.wasteType}</span></li>
                                        <li ><span>Post Waste Item: {offerPosts.item}</span></li>
                                        <li ><span>Post Quantity: {offerPosts.quantity} Kg</span></li>
                                    </ol>
                                </div>
                                <main className="grid-b">
                                    <article  style={{marginLeft:'350px'}}>
                                        <div className="text-b">
                                            <h3>Collecting Date: {moment(posts.collectingDate).fromNow()}</h3>
                                            <p>Buyer Name: {posts.buyerName}</p>
                                            <p>Waste Item: {posts.item}</p>
                                            <p>Offer Quantity: {posts.quantity} kg</p>
                                            <p>Status: {posts.status}</p>
                                            <p>Offer Value (Rs): {posts.value}</p>
                                        </div>
                                    </article>
                                </main>
                            </div>
                        </div>
            }

        </>
    );
}

export default ViewOfferDetails;