import React, {useEffect, useState} from "react";
import '../posts/Posts.css';
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";
import emailjs from "emailjs-com";
import '../posts/LoadingRing.css'

function VProfile() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const buyerId=(localStorage.getItem("userId"));
    console.log(buyerId);

    const [buyer, setBuyer] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${buyerId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setBuyer(oneSellerOrCompany);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(buyer);
    const buyerEmail=buyer.email;
    const buyerName=buyer.username;
    console.log(buyerEmail);
    console.log(buyerName);

    const [buyerDetails, setBuyerDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`/getBuyerDetails`)
            .then((response) => setBuyerDetails(response.data.existingBuyers))
            .catch((err) => console.error(err));
    }, []);

    console.log(buyerDetails);

    const oneBuyer = buyerDetails.filter(oneBuyer => oneBuyer.buyerId === buyerId);
    console.log(oneBuyer);

    const history = useHistory();

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    const deleteBuyer = (id) => {
        axios.delete(`/deleteBuyer/${id}`)
            .then((result) => {
                logoutHandler();
            });
    };

    const deleteBuyerDetails = (id) => {
        axios.delete(`/deleteBuyerDetails/${id}`)
            .then((result) => {
                //sendEmail();
                deleteBuyer(buyerId);
            });
    };

    const templateParams = {
        from_name: 'Zero-Waste',
        to_name: buyerName,
        message: 'Your account deleted successfully! Thank you.',
        reply_to: 'zerowasteproject3@gmail.com',
        user_email:buyerEmail,
        project_email:'zerowasteproject3@gmail.com'
    };

    const sendEmail = () => {
        emailjs.send('service_34ny3hp', 'template_91bru6e', templateParams, 'user_pzyBOo0Td3FLgOvuNU4mq')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
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
                                <h1>Profile Details</h1>
                                <div className="seller-container-b">
                                    {oneBuyer.map((post,index)=> (
                                    <ol className="list">
                                        <li ><span>Buyer Name: {buyerName}</span></li>
                                        <li ><span>Address: {post.buyerAddress}</span></li>
                                        <li ><span>Description: {post.buyerDescription}</span></li>
                                        <li ><span>Email: {buyerEmail}</span></li>

                                        <li >
                                            <span>
                                            Contact No:
                                                {post.buyerContact.map((contact,index)=>(
                                            <span>
                                                {index + 1} : {contact}
                                            </span>
                                        ))}
                                        </span>
                                        </li>

                                        <li >
                                            <span>
                                            Favourite Areas:
                                                {post.favouriteAreas.map((area,index)=>(
                                            <span>
                                                {index + 1} : {area}
                                            </span>
                                        ))}
                                        </span>
                                        </li>

                                        <li >
                                            <span>
                                            Favourite Waste Types:
                                                {post.favouriteWasteTypes.map((types,index)=>(
                                                    <span>
                                                {index + 1} : {types}
                                            </span>
                                                ))}
                                        </span>
                                        </li>

                                        <li >
                                            <span>
                                            Favourite Waste Items:
                                                {post.favouriteWasteItems.map((items,index)=>(
                                                    <span>
                                                {index + 1} : {items}
                                            </span>
                                                ))}
                                        </span>
                                        </li>
                                    </ol>
                                    ))}
                                </div>
                                <div className="all-items-button-b">
                                    {oneBuyer.map((post,index)=> (
                                        <main className="grid-b" >
                                            <article>
                                                <img src={post.buyerImages} alt=""></img>
                                                <div className="text-b">
                                                    <h3>Image No: {index + 1}</h3>
                                                </div>
                                            </article>
                                        </main>
                                    ))}
                                </div>
                                <div className="all-items-button-b">
                                    {oneBuyer.map((post,index)=> (
                                    <main className="grid-b">
                                        <article>
                                            <div className="text-b">
                                                <div className="buyerlink-b">
                                                    <Link style={{color: '#fff', textDecoration: 'none'}}
                                                          to={`/buyer/viewratings/${buyerId}`}
                                                    >View Ratings <i className="fas fa-angle-double-right"></i></Link>
                                                </div>
                                            </div>
                                        </article>
                                        <article>
                                            <div className="text-b">
                                                <div className="buyerlink-b">
                                                    <Link style={{color: '#fff', textDecoration: 'none'}}
                                                          to={`/buyer/editprofile/${post._id}`}
                                                    >Edit Profile <i className="fas fa-edit"></i></Link>
                                                </div>
                                            </div>
                                        </article>
                                        <article>
                                            <div className="text-b">
                                                <div className="delete-button-b">
                                                    <button onClick={() => {
                                                        deleteBuyerDetails(post._id)
                                                    }}>Delete Profile <i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </article>
                                    </main>
                                    ))}
                                </div>
                            </div>
                        </div>
            }

        </>
    );
}

export default VProfile;