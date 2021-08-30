import React from "react";
import './RComment.css';
import '../posts/AcceptedOffers.css';

function RComment() {

    return(
        <div className="tables-b">
        <div className="rcommentform-ba">
        <h1>Rate Your Experience</h1>
            <div className="container2-ba">
                <div className="post-ba">
                    <div className="text-ba">Thanks for rating!</div>
                    <div className="edit-ba">EDIT</div>
                </div>
                <div className="star-widget-ba">
                    <input type="radio" name="rate" id="rate-5"/>
                    <label for="rate-5" class="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-4"/>
                    <label for="rate-4" class="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-3"/>
                    <label for="rate-3" class="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-2"/>
                    <label for="rate-2" class="fas fa-star"></label>
                    <input type="radio" name="rate" id="rate-1"/>
                    <label for="rate-1" class="fas fa-star"></label>
                    <form action="#">

                    <header></header>


                        <div className="textarea-ba">
                            <textarea cols="30" placeholder="Describe your experience.."></textarea>
                        </div>

                        <div class="btn-ba">
                            <button type="submit">Post</button>
                        </div>


                    </form>
                </div>
            </div>

        </div>

        </div>

    );
}

export default RComment;