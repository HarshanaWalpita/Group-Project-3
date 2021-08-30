import React from "react";
import './WasteTypes.css';
import wasteimg from './BuyerImages/2562.jpg';

export default function WasteTypes() {
    return (
        <div className="type-container">
           <div className="row">
                <div className="column">
                    <div className="card">
                        <h3>Plastic Waste</h3>
                        <img src={wasteimg} alt="plastic" />
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Plastic Waste</h3>
                        <img src={wasteimg} alt="plastic" />
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Plastic Waste</h3>
                        <img src={wasteimg} alt="plastic" />
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Plastic Waste</h3>
                        <img src={wasteimg} alt="plastic" />
                    </div>
                </div>

            
            </div>

        </div>
        
    )
}