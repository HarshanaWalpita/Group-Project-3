import './PendingPosts.css';
import '../../buyer/posts/Posts.css';
import Bottles from './postPics/bottles.jpg';
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../buyer/posts/LoadingRing.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

export default function PreviousPosts() {

    const history = useHistory();
    
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }
    
    const sellerId = (localStorage.getItem("userId"));
    const [posts, setPosts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false)

    //const WAIT_TIME = 1000;
    useEffect(() => {
        getAllPosts()
    }, [])

    useEffect(() => {
        getAllOffers()
    }, [])
    
    const getAllOffers = async () => {
        setIsLoading(true)
        await axios.get(`/viewAllOffers/${sellerId}`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
                setIsLoading(false)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
                setHasError(true);
            });
    }
    const getAllPosts = async () => {
        setIsLoading(true)
        await axios.get(`/viewAllPosts/${sellerId}`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setPosts(allNotes);
                setIsLoading(false)
            })
            .catch(error => {
                console.error(`Error: ${error}`)
                setHasError(true);
            });
    }
    const getPosts = async () => {
        setIsLoading(true)
        try {
            const responce = await axios.get(`/sellerViewPosts/${sellerId}`)
            console.log(responce);
            setPosts(responce.data.existingPosts);
            setOffers(responce.data.existingOffers);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`);
            setHasError(true)
        }

    }

    console.log("post", posts);
    console.log("offer", offers);

    const acceptedOffers = offers?.filter(o => o.status==='accepted' );
   
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

                            <div className="seller-post-list">
                                <main className="grid-b">
                                    {
                                        posts && posts.map((note, index) => {
                                            if (acceptedOffers.find(o => o.postId === note._id) !== undefined) {
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
                                                                    to={`/seller/viewprvpost/${note._id}`}>View Post <i
                                                                        className="fas fa-angle-double-right"></i></Link>
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
    );
}