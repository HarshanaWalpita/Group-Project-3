import React, {useEffect, useState} from 'react';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import SimpleMap from "./Location";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import './Posts.css';

function PostsLocation() {

    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    const { offerId } = useParams();
    console.log(offerId);

    const [posts, setPosts] = useState({});
    const [offerPosts, setOfferPosts] = useState({});

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
            const response = await axios.get(`/buyerGetOneSellerOffer/${offerId}`)
            console.log(response);
            const allPost=response.data.oneOffer;
            setPosts(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(posts);
    
    useEffect(()=>{
        if (offerPosts && offerPosts.location) {
            console.log(offerPosts.location);
            console.log(offerPosts.location.longitude);
            console.log(offerPosts.location.latitude);
        }
    }, [offerPosts]);

    const getOneOfferPost = async () => {
        if(PostId2 !== undefined) {
            try {
                const response = await axios.get(`/buyerGetOnePost/${PostId2}`)
                console.log(response);
                const allOfferPost=response.data.onePost;
                setOfferPosts(allOfferPost);
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        }
    }
    const PostId2=posts.postId;

    useEffect(()=>{
        getOneOfferPost();
    }, [PostId2]);

    console.log(offerPosts);

    const long = offerPosts?.location?.longitude;
    console.log(long);
    const lat=offerPosts?.location?.latitude;
    console.log(lat);

    const location={lat,long};

    return (
        <>
            <Navbar/>
            <div className="posts-b">
                <div className="posts__container-b">
                    <h1>Seller's Location</h1>
                </div>
                <SimpleMap loc={location}/>
            </div>
            <Footer/>
        </>
    );
}

export default PostsLocation;