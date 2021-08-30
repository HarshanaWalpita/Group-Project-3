import React from 'react';

import './BuyerHome.css';

export default function BuyersHome() {
    return (
        <div className="view-buyers">
            
           
            <div class="search-container">
                <form>
                    <label>Waste Type</label>
                    <input type="text" placeholder="Search.." name="search" />
                    <label>Waste Item</label>
                    <input type="text" placeholder="Search.." name="search" />
                    <label>Area</label>
                    <select>
                        <option>All</option>
                        <option>Colombo</option>
                        <option>Gampala</option>
                        <option>Kaluthara</option>
                        <option>Yakkala</option>
                    </select>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
           
        </div>
    )

}