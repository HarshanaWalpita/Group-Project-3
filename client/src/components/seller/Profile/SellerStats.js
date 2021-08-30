import './SellerStats.css';

export default function SellerStats() {
    return (
        <div className="seller-stats-background">
            <div className="seller-stat-card-row-header">
                <h1>Ongoing Transactions</h1>
            </div>
            <div className="seller-stat-card-row">
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Pending Posts</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>9</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Pending Items</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>16</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Pending Offers</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>9</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Accepted Offers</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>2</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="seller-stat-card-row-header">
                <h1>Total Transactions</h1>
            </div>
            <div className="seller-stat-card-row">
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Total Posts</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>13</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Sold Items</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>21</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Total Value(Rs)</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p> 5400</p>
                        </div>
                    </div>
                </div>
                <div className="seller-stat-card-column">
                    <div className="seller-stat-card">
                        <div className="seller-stat-card-header">
                            <h2>Buyers Connected</h2>
                        </div>
                        <div className="seller-stat-card-detail">
                            <p>15</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}