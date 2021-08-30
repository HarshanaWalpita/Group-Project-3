import React, { useEffect,useState } from "react";
import './ViewRatings.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import moment from "moment";
import './LoadingRing.css';

function ViewRatingsPage() {

    const { sellerId } = useParams();
    console.log(sellerId);

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        getAllComments();
    }, []);

    const getAllComments = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/viewRateAndComment`)
            .then ((response)=>{
                const allNotes=response.data.existingComments;
                setComments(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(comments);

    const sellerComment = comments?.filter(sellerComment => sellerComment.commentAboutId===sellerId);
    console.log(sellerComment);

    return(
        <>
            {
                isLoading ?
                    <div className="profile_body-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="profile_body-c">
                            <h1>Error Occurred</h1>
                        </div> :
                    <div className="profile_body-c">
                        <div id="profile_content3-c">
                            <h1>Comments and Reviews</h1>
                            {sellerComment.map((post,index)=>(
                            <div className="profile_reviews_c">
                                <div className="profile_reviews_body_c">
                                    <div className="profile_review_body_header_c">
                                        <div className="profile_div_star-c">
                                            <i class="fas fa-star"></i> {post.rating}/5
                                        </div>
                                        <h3>by {post.commenterName} at {moment(post.CreatedAt).fromNow()}</h3>
                                    </div>
                                    <div className="profile_review_body-c">
                                        <h4>{post.comment}</h4>
                                        <br></br>
                                        <hr></hr>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
            }

        </>
    );
}

export default ViewRatingsPage;