import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import './PendingPosts.css';
import Bottles from './postPics/bottles.jpg';
import SimpleMap from "../../buyer/posts/Location";
import '../../buyer/posts/LoadingRing.css';
export default function Post() {

    const { postId } = useParams();
    console.log(postId);

    const [postData, setPostData] = useState({});
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [buyer, setBuyer] = useState("");
    const [value, setValue] = useState(null);

    useEffect(() => {
        getpost()
    }, [])

    
    const getpost = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/sellerViewPrvPost/${postId}`)
            console.log(response);
            const allPost = response.data.post;
            setPostData(allPost);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
      
    }

    useEffect(() => {
        getAcceptedOffers()
    }, [])
    
    const getAcceptedOffers = async () => {
        try {
            const response = await axios.get(`/sellerViewPrvOffers/${postId}`)
            console.log(response);
            const allPost = response.data.offers;
            setOffers(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
   

  //  console.log(postData);
    console.log("offers",offers);
    var compOffer = offers.filter(o => o.wasteItemsListId === "completePost")
    if (compOffer.length === 1) {
        setBuyer(compOffer.buyerName);
        setValue(compOffer.value);
        var total = compOffer.value;
    }
    else {
        var itemOffers = offers.filter(o => o.wasteItemsListId !== "completePost");
        var total = itemOffers.reduce((prev, next) => prev + next.value, 0)
       
        console.log(total);
        console.log("itOffers",itemOffers);
        /*
        var totalValue = 0;
        {
            itemOffers && itemOffers.map((offer, index) => {
                totalValue = totalValue + offer.value;
            })
        }
        setValue(totalValue);
        */
    }

    const long = postData?.location?.longitude;
    console.log(long);
    const lat = postData.location?.latitude;
    console.log(lat);

    const location={lat,long};
    console.log(location)
    
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
                                <div className="seller-post-card">
                                    <h2>Post Type : {postData.postType}</h2>
                                    <h2>Value: {total}</h2>
                                    <h2>District : {postData.district}</h2>
                                    <h2>Address : {postData.address}</h2>
                                    <h2>Contact No : {postData.contact}</h2>
                                    {postData && postData.wasteItemList && postData.wasteItemList.map((item, index) => {
                                        
                                        return (
                                            <div className="seller-post-card-item">
                                                <div className="seller-post-card-item-header">
                                                    <h3>Item: {index + 1}</h3>
                                                </div>
                                                <div className="seller-post-card-item-details">
                                                    <h4>{item.wasteType} | {item.item}</h4>
                                                    <img className="image-container" src={item.selectedFile} alt="img" />
                                                    <p>Quantity : {item.quantity}</p>
                                                    <p>Available On :{moment(item.avbDate).format("LLL")}</p>
                                                    
                                                </div>
                                                
                                            </div>
                                            
                                            
                                        )
                                        
                                    })}
                                </div>
                                <div className="seller-post-offers">
                                    <div style={{marginBottom:"30px"}}><h1>Accepted Offers</h1></div>
                                    <div>
                                        {offers && offers.length === 0 ?
                                            <div>There are no accepted offers</div>
                                            :
                                        
                                            <table className="seller-accepted-offers-table">
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Buyer</th>
                                                    <th>Collecting Date</th>
                                                    <th>Collecting Time (Aprox:)</th>
                                                    <th>Offer(Rs)</th>
                                                    <th>Offer Exp: Date</th>
                                                  
                                                </tr>
                                           
                                                {offers && offers.map((offer, offerindex) => {
                                                    if (offer.wasteItemsListId === "completePost") {
                                                        return (
                                                            <tr>
                                                                <td>{ offer.wasteItemsListId }</td>
                                                                <td>{offer.buyerName}</td>
                                                                <td>{moment(offer.collectingDate).format("LLL")}</td>
                                                                <td>{offer.collectingTime}</td>
                                                                <td>{offer.value}</td>
                                                                <td>{moment(offer.expiryDate).format("LLL")}</td>
                                                               
                                                            </tr>
                                                    
                                                                                                      
                                                        )
                                                    }
                                                    else {
                                                        var item = postData.wasteItemList.find(o => o._id === offer.wasteItemsListId)
                                                        return (
                                                            <tr>
                                                                <td><img className="item-image" src={item.selectedFile}></img></td>
                                                                <td>{offer.buyerName}</td>
                                                                <td>{moment(offer.collectingDate).format("LLL")}</td>
                                                                <td>{offer.collectingTime}</td>
                                                                <td>{offer.value}</td>
                                                                <td>{moment(offer.expiryDate).format("LLL")}</td>
                                                               
                                                            </tr>
                                                        )
                                                    }
                                                       
                                                   
                                                })}
                                            </table>
                                                  
                                        }
                                    </div>  
                                </div>
                                
                            </div>
                            <div>
                                <SimpleMap loc={location} />
                                
                            </div>
                           
                            
      
                        </div>
            }
       
        </>

    );
        
    
}