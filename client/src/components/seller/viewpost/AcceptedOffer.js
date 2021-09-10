import '../../buyer/posts/Posts.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const AcceptedOffer = (props) => {
    const offer = props.offer;
    const post = props.post;
    const item = props.item;
    const offerId = offer._id;
//console.log("Ofef",offerId);
   // console.log(offer);
  //  console.log(post);
   // console.log(item);
 //   var thumbnail = useState("");
    if (item) {
        if (item._id === offer.wasteItemsListId) {
            var thumbnail = item.selectedFile;
            var itemId = item._id;
        }
        
    } else {
       var thumbnail = offer.postId.thumbnail;
    }
    
        return (
            <article>
            <img src={thumbnail} alt=""></img>
            <div className="text-b">
            
                    <p>Buyer Name: {offer.buyerName}</p>
                    <p>Offer For {post}</p>
                    <p>{offer.status}</p>
                    <p>{offer.verificationCode}</p>
                <p>Value: {offer.value}</p>
                    <p>Collecting Date: {moment(offer.collectingDate).format("LL")} At: {offer.collectingTime}</p>
              
                <div className="buyerlink-b">
                    <Link style={{ color: '#fff', textDecoration: 'none' }}
                        to={`/seller/viewpost/${offer.postId._id}`}>View Post <i
                            className="fas fa-angle-double-right"></i></Link>
                </div>

            </div>
            </article>
        )
  
    
}
export default AcceptedOffer;