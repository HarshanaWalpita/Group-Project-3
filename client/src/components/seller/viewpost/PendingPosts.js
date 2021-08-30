import './PendingPosts.css';
import '../../buyer/posts/Posts.css';
import Bottles from './postPics/bottles.jpg';
import {Link, useHistory } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PostList from "./PostList";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../buyer/posts/LoadingRing.css';
export default function PendingPosts() {

    const history = useHistory();
    
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }
    
    const sellerId=(localStorage.getItem("userId"));
    console.log(sellerId);
    
    const [sellerPosts, setSellerPosts] = useState([]);
    const [sellerOffers, setSellerOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        getSellerPosts();
    }, []);

    const getSellerPosts = async () => {
        setIsLoading(true)
        try {
            const responce = await axios.get(`/sellerViewPosts/${sellerId}`)
            console.log(responce);
            setSellerPosts(responce.data.existingPosts);
            setSellerOffers(responce.data.existingOffers);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`);
            setHasError(true)
        }

    }

    const deletePost = (id) => {
        axios.delete(`/deletePendingSellerPost/${id}`)
            .then((result) => {
                toastNotification();
                getSellerPosts();
                getSellerPosts();
            });
    };

    const toastNotification = () => {
        toast.info("Deleted successfully !", {
            transition: Slide
        })
    };

    console.log("SELLERPOSTS",sellerPosts);
    console.log("SelleroFFERS",sellerOffers);

    const wasteItem = sellerOffers?.filter(wasteItem => wasteItem.status==='accepted' );
    console.log(wasteItem);
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

                            <div className="seller-avb-post-list">
                                <main className="grid-b">
                                    {sellerPosts.map((note, index) => {
                                        if (wasteItem.find(o => o.postId === note._id) === undefined)
                                            return (
                                                <article>
                                                    <img src={note.thumbnail} alt=""></img>
                                                    <div className="text-b">
         
                                                        <p>Seller Name: {note.sellerName}</p>
                                                        <p>District: {note.sellerDistrict}</p>
                                                        <p>Post Type: {note.postType}</p>
                                                        <p>Address: {note.address}</p>
                                                        <p>Telephone No: {note.contact}</p>
                                                        <div className="buyerlink-b">
                                                            <Link style={{ color: '#fff', textDecoration: 'none' }}
                                                                to={`/seller/viewpost/${note._id}`}>View Post <i
                                                                    className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                        <div className="buyerlink-b">
                                                            <Link style={{ color: '#fff', textDecoration: 'none' }}
                                                                to={`/seller/editpost/${note._id}`}>Edit Post <i
                                                                    className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                        <div className="buyerlink-b">
                                                            <button onClick={() => {
                                                                deletePost(note._id);
                                                            }}>Delete Post</button>
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
        
    )
}