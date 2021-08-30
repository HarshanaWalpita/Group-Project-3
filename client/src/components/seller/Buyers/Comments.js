import './Comments.css';

export default function Comments() {
    return (
        <>
            <div className="seller-add-comment">
                <form className="seller-add-comment-form">
                    <input type="textarea" placeholder="Add New Comment" id="comment" />
                    <button type="submit" className="seller-add-comment-btn">Add Comment</button>
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
        </>
    )
}