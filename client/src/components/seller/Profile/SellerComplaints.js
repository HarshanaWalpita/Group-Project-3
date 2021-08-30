import React from "react";
import '../../buyer/posts/Form.css';

export default function SellerComplaints() {

    return(
    <div className="forms-b">
        <div className="forms__container-b" >
            <div className="container-b">
                <div className="title-b">Add Complaints</div>
                <div className="content-b">
                    <form action="#">
                        <div className="user-details-b">
                            <div className="input-box-b">
                                <span className="details-b">Complainant Type</span>
                                <input type="text" placeholder="Enter Name" required></input>
                            </div>
                            <div className="input-box-b">
                                <span className="details-b">Buyer:</span>
                                <input type="text" placeholder="Enter Details" required></input>
                            </div>
                            <div className="input-box-b">
                                <span className="details-b">Discription</span>
                                <input type="text" placeholder="Enter Details" required></input>
                            </div>
                        </div>
                        <div className="button-b">
                            <input type="submit" value="Add Complaint"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    );
}

