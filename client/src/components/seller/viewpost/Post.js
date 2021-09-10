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
    const [offerList, setOfferList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false)
   // const offerList = offers?.filter(o => o.wasteItemsListId === "completePost");
    var offNum = offerList.length;
    console.log("off",offNum)
 //   console.log(offers);
    console.log("offersarray",offerList);

    useEffect(() => {
        getpost()
    }, [])

    
    const getpost = async () => {
      //  setIsLoading(true)
        try {
            //gets only complete post offers with the post
            const response = await axios.get(`/sellerViewOnePost/${postId}`)
            console.log(response);
            const allPost = response.data.post;
            setPostData(allPost);
            const allOffers = response.data.offer;
            setOfferList(allOffers);
        //    setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
      
    }

    const sellerAcceptOffer = (offerId) => {
        console.log("asp")
        const data = {
            status: "Accepted",
            postId: postId
        };
        axios.patch(`/sellerAcceptPostOffer/${offerId}`, data)
            .then((result) => {
                console.log("ACCPTED")
           //     clear();
              //  toastNotification();
              //  history.push(`/seller/home`);
        });
    }
    const long = postData?.location?.longitude;
    console.log(long);
    const lat = postData.location?.latitude;
    console.log(lat);

    const location={lat,long};
    console.log(location)

  //  console.log(postData);
   // console.log(offerList);
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
                            <h2>Buyer : {postData.buyer}</h2>
                            <h2>District : {postData.district}</h2>
                            <h2>Address : {postData.address}</h2>
                            <h2>Contact No : {postData.contact}</h2>
                                    {postData && postData.wasteItemList && postData.wasteItemList.map((item, index) => {
                                        
                                        return (
                                            <div className="seller-post-card-item">
                                                <div className="seller-post-card-item-header">
                                                    <h3>Item: { index + 1}</h3>
                                                </div>
                                                <div className="seller-post-card-item-details">
                                                    <h4>{item.wasteType} | { item.item}</h4>
                                                    <img src={item.selectedFile} alt="img" />
                                                    <p>Quantity : { item.quantity}</p>
                                                    <p>Available On :{moment(item.avbDate).format("LLL")}</p>

                                                    <div className="seller-view-offer-button">
                                                    <Link style={{ textDecoration: 'none', color:"#ffffff"}}
                                                                to={`/seller/viewitem/${item._id}`}>View Item Offers <i
                                                                    className="fas fa-angle-double-right"></i></Link>
                                                    </div>

                                                </div>
                                                
                                            </div>
                                            
                                            
                                        )
                                        
                                    })}
                        </div>
                                <div className="seller-post-offers">
                                    <div style={{marginBottom:"30px"}}><h1>Offers For Complete Post</h1></div>
                                    <div>
                                        {offNum === 0 ?
                                            <div>There are no Post Offers Available Now</div>
                                            :
                                        
                                            <table className="seller-accepted-offers-table">
                                                <tr>
                                                    <th>Offer Id</th>
                                                    <th>Buyer</th>
                                                    <th>Collecting Date</th>
                                                    <th>Collecting Time (Aprox:)</th>
                                                    <th>Offer(Rs)</th>
                                                    <th>Offer Exp: Date</th>
                                                    <th>Action</th>
                                                </tr>
                                           
                                                {offerList.map((offer, offerindex) => {
                                                    if (offNum !== 0) {
                                                        return (
                                                            <tr>
                                                                <td>{offerindex + 1}</td>
                                                                <td>{offer.buyer}</td>
                                                                <td>{moment(offer.collectingDate).format("LLL")}</td>
                                                                <td>{offer.collectingTime}</td>
                                                                <td>{offer.value}</td>
                                                                <td>{moment(offer.expiryDate).format("LLL")}</td>
                                                                <td><a hreff="#" className="offer-list-accept" onClick={() => {
                                                                    let offerId = offer._id;
                                                                    console.log(offerId);
                                                                    sellerAcceptOffer(offerId);
                                                                }}>Accept</a><a className="offer-list-decline" hreff="#">Decline</a> </td>
                                                            </tr>
                                                    
                                                                                                      
                                                        )
                                                    } else {
                                                        return (
                                               
                                                            <span>No Offers</span>
                                              
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

    )
        
    
}