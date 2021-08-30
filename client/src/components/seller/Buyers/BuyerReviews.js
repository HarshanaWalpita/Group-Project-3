import "./BuyerReviews.css";

export default function BuyerReviews() {
    return (
        <div>
            <h1>Reviews & Comments <i class="fas fa-comments"></i></h1>
            <div className="seller-add-comment">
                <form className="seller-add-comment-form">
                
                    <input type="text" placeholder="Add New Comment" id="comment" />
                    <button type="submit"><i class="fas fa-envelope"></i></button>
                </form>
            </div>
            <div className="buyer-comments-area">
                <div className="seller-comment-card">
                    <div className="seller-comment-details">
                        <h4>John Snow</h4>
                        <p>2021 Apr 20  20:21</p>

                    </div>
                    <div className="seller-comment">
                        <p>very good service.</p>
                    </div>

                </div>
                <div className="seller-reply-card">
                    <div className="seller-comment-details">
                        <h4>John Snow</h4>
                        <p>2021 Apr 20  20:21</p>

                    </div>
                    <div className="seller-comment">
                        <p>very good service.</p>
                    </div>

                </div>
            </div>
    
           
        </div>
    )
}