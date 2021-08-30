import './PendingPosts.css';
import Bottles from './postPics/bottles.jpg';

export default function PreviousPosts() {
    return (
        <div className="seller-post-list-background">

            <div className="seller-post-list">
                
                <div className="seller-post-card">
                    <h2>Post Id : 0001</h2>
                    <h2>Buyer: Lk Collectors, Abc Industries</h2>
                    <h2>Total Value(Rs): 2000.00 </h2>  
                    <div className="seller-post-card-item-row">
                        <div className="seller-post-card-item">
                            <div className="seller-post-card-item-header">
                                <h3>Item: 1</h3>    

                            </div>
                            <div className="seller-post-card-item-details">
                                <h4>Plastic | Bottle</h4>
                                <img src={Bottles} alt="img" />
                                <p>10kg</p>
                                <p>Sold : 2020-05-29</p>
                                <p>Value(Rs): 1300.00</p>
                                <p>Collected By: Abc Industries</p>
                                <p>Rating:7/10</p>
                            </div>
                        </div>
                        <div className="seller-post-card-item">
                            <div className="seller-post-card-item-header">
                                <h3>Item: 1</h3>    

                            </div>
                            <div className="seller-post-card-item-details">
                                <h4>Plastic | Bottle</h4>
                                <img src={Bottles} alt="img" />
                                <p>10kg</p>
                                <p>Sold : 2020-05-29</p>
                                <p>Value(Rs): 1300.00</p>
                                <p>Collected By: Abc Industries</p>
                                <p>Rating:7/10</p>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>        
        </div>    
    )
}