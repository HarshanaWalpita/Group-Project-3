import React, { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import moment from "moment";

const ViewRateAndComments = (props) => {
    const comment = props.comment;
    

    return (
    
        
        <div className="seller-comment-card">
            <div className="seller-comment-details">
                <div className="profile_div_star-c">
                    <i class="fas fa-star"></i> {comment.rating}/5
                </div>
                <h3>by {comment.commenterName} at {moment(comment.CreatedAt).fromNow()}</h3>

            </div>
            <div className="seller-comment">
                <p>{comment.comment}</p>
            </div>

        </div>
       
    );
}
export default ViewRateAndComments;