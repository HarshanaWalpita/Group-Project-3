import '../../buyer/posts/Posts.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
const Offer = (props) => {
    const history = useHistory();
    const offer = props.offer;
    const post = props.post;
    const item = props.item;
    const offerId = offer._id;
    console.log("Ofef",offerId);
    console.log(offer);
    console.log(post);
    console.log(item);
 //   var thumbnail = useState("");
    if (item) {
        if (item._id === offer.wasteItemsListId) {
            var thumbnail = item.selectedFile;
            var itemId = item._id;
        }
        
    } else {
       var thumbnail = offer.postId.thumbnail;
    }
    const sellerAcceptCompletePostOffer = (offerId,postId) => {
        console.log("asp")
        const data = {
            status: "accepted",
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
    const sellerDeclineOffer = () => {
        const data = {
            status:"declined"
        }
        axios.patch(`/sellerDeclineOffer/${offerId}`, data)
            .then((result) => {
                console.log("offer Rejected");
                
            });
        
    }

    const sellerAcceptOffer = () => {
        console.log("accept", itemId);
        var vfCode = Math.floor(100000 + Math.random() * 900000);
        if (item) {
            console.log("item",itemId)
            const data = {
                status: "accepted",
                wasteItemsListId: itemId,
                verificationCode: vfCode,
            };
            axios.patch(`/sellerAcceptWasteItemOffer/${offerId}`, data)
                .then((result) => {
                    console.log("offer accepted")
                });
        } else {
            const data = {
                status: "accepted",
                postId: offer.postId._id,
                verificationCode: vfCode,
            };
            axios.patch(`/sellerAcceptPostOffer/${offerId}`, data)
                .then((result) => {
                    console.log("ACCPTED")
               //     clear();
                  //  toastNotification();
                  //  history.push(`/seller/home`);
            });
        }
        history.push(`/seller/offers`);

    }
    
    return (
        <article>
            <img src={thumbnail} alt=""></img>
            <div className="text-b">
            
                <p>Buyer Name: {offer.buyerName}</p>
                <p>Offer For {post}</p>
                <p>{offer.status}</p>
                <p>Value: {offer.value}</p>
                <p>Collecting Date: {offer.collectingDate} At: {offer.collectingTime}</p>
                <p>Offer Expiery Date: {offer.expiryDate}</p>
                <div className="buyerlink-b">
                    <Link style={{ color: '#fff', textDecoration: 'none' }}
                        to={`/seller/viewpost/${offer.postId._id}`}>View Post <i
                            className="fas fa-angle-double-right"></i></Link>
                </div>
                <div className="buyerlink-b">
                    <button className="accept-btn" onClick={sellerAcceptOffer}>Accept</button>
                </div>
                <div className="buyerlink-b">
                    <button className="accept-btn" onClick={sellerDeclineOffer}>Decline</button>
                </div>
            </div>
        </article>
    );
  
    
}
export default Offer;