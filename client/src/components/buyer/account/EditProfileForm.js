import '../posts/Form.css';
import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfileForms() {

    const history = useHistory()
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "buyer")) {
        history.push("/");
    }

    const buyerId = (localStorage.getItem("userId"));
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [buyer, setBuyerDetails] = useState({});

    useEffect(() => {
        getBuyerDetails()
    }, [])
    
    const getBuyerDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/sellerViewBuyerDetails/${buyerId}`)
            console.log(response);
            const buyerData = response.data.buyer;
            console.log(buyerData);
            setBuyerDetails(buyerData);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(buyer);
    
    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="title-b">Edit Profile</div>
                    <div className="content-b">
                        <form className="buyer-form-b" action="#">
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Name</span>
                                   
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Address</span>
                                    <input type="text" placeholder="Enter Address" required></input>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Telephone</span>
                                    <input type="text" placeholder="Enter Telephone" required></input>
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Edit Profile"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileForms;