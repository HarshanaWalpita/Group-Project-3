import React, { useState, useEffect } from "react";
import './Posts.css';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import SimpleMap from "./Location";
import moment from 'moment';
import StartRating from "./Ratings";
import './LoadingRing.css';

function ViewPost() {

    const { postId } = useParams();
    console.log(postId);

    const [posts, setPosts] = useState({});

    useEffect(()=>{
        getOnePost();
    }, []);

    useEffect(()=>{
        if (posts && posts.location) {
            console.log(posts.location);
            console.log(posts.location.longitude);
            console.log(posts.location.latitude);
        }
    }, [posts]);

    const getOnePost = async () => {
        try {
            const response = await axios.get(`/buyerGetOnePost/${postId}`)
            console.log(response);
            const allPost=response.data.onePost;
            setPosts(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(posts);

    const sellerId = posts.sellerId;
    console.log(sellerId);

    const long = posts?.location?.longitude;
    console.log(long);
    const lat=posts?.location?.latitude;
    console.log(lat);

    const location={lat,long};
    console.log(posts.wasteItemList);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingSellerOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItems => wasteItems.status==='accepted' && wasteItems.postId===postId);
    console.log(wasteItem);

    const wasteItemLength = wasteItem.length;
    console.log(wasteItemLength);

    const selId = {sellerId};

    return(
        <div className="posts-b">
            <div className="posts__container-b">
                <h1>Post Details</h1>
                <div className="seller-container-b">
                    <ol className="list">
                        <li ><span>Seller Name: {posts.sellerName}</span></li>
                        <li ><span>Seller Address: {posts.address}</span></li>
                        <li ><span>Telephone No: {posts.contact}</span></li>
                        <li ><span>Post Type: {posts.postType}</span></li>
                    </ol>
                </div>
                <main className="grid-b">
                    {posts && posts.wasteItemList && posts.wasteItemList.map((post,index)=> {
                        if(wasteItem.find(o=>o.wasteItemsListId === post._id) === undefined)
                            return (
                                <article>
                                    <img src={post.selectedFile} alt=""></img>
                                    <div className="text-b">
                                        <h3>Post ID: {index + 1}</h3>
                                        <p>Waste Type: {post.wasteType}</p>
                                        <p>Waste Item: {post.item}</p>
                                        <p>Quantity: {post.quantity} kg</p>
                                        <p>Can Collect Items: {moment(post.avbDate).fromNow()}</p>
                                        <div className="buyerlink-b">
                                            <Link style={{color: '#fff', textDecoration: 'none'}}
                                                  to={`/buyer/singleoffers/${postId}/${post._id}/${sellerId}`}>Make Offer <i
                                                className="fas fa-angle-double-right"></i></Link>
                                        </div>
                                    </div>
                                </article>
                            );
                    })}
                </main>
                {wasteItemLength === 0 ?
                    (
                        <div>
                            <div className="all-items-button-b">
                                <p>Do you want to make an offer for all these items at once?</p>
                                <Link className="link-button-b" style={{color: '#fff', textDecoration: 'none'}} to ={`/buyer/offerforms/${postId}/${sellerId}`}>Make Offer for All Items <i className="fas fa-angle-double-right"></i></Link>
                            </div>
                            <div className="all-items-button-b">
                                <p>Do you want to see seller ratings before make an offer?</p>
                                <Link className="link-button-b" style={{color: '#fff', textDecoration: 'none'}} to ={`/buyer/viewratings/${sellerId}`}>View Seller Ratings <i className="fas fa-angle-double-right"></i></Link>
                            </div>
                        </div>
                    ) :
                    <div className="all-items-button-b">
                        <p>Do you want to see seller ratings before make an offer?</p>
                        <Link className="link-button-b" style={{color: '#fff', textDecoration: 'none'}} to ={`/buyer/viewratings/${sellerId}`}>View Seller Ratings <i className="fas fa-angle-double-right"></i></Link>
                    </div>
                }
                <h1>Seller's Location</h1>
            </div>
            <SimpleMap loc={location}/>
            <div className="buyer-view-post-b">
                <div className="all-items-button-b" style={{marginTop:'100px'}}>
                    <p>Do you want to make a complaint about this seller?</p>
                    <Link className="link-button-b" style={{color: '#fff', textDecoration: 'none'}} to ={`/buyer/addcomplaints/${sellerId}`}>Make a Complaint <i className="fas fa-angle-double-right"></i></Link>
                </div>
                <StartRating sId={selId}/>
            </div>
        </div>
    );
}

export default ViewPost;