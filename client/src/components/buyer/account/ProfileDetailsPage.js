import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../posts/Form.css';


export default function ProfileDetailsPage ({ currentId, setCurrentId }) {
    
    const history = useHistory();
    const buyerId = (localStorage.getItem("userId"));
    console.log(buyerId);
    const buyerName = (localStorage.getItem("userName"));
    console.log(buyerName);

    const [buyerDescription, setDescription] = useState("");

    const [buyerAddress, setAddress] = useState("");

    const [contact, setContact] = useState("");
    const [buyerContact, setContactList] = useState([]);

    const contactList = buyerContact.map((con) => {
        <li>{con}</li>
    });

    const [favouriteAreas, setFavouriteAreas] = useState([]);
    const [area, setArea] = useState("");

    const [type, setType] = useState("");
    const [favouriteWasteTypes, setFavouriteTypes] = useState([]);

    const [item, setItem] = useState("");
    const [favouriteWasteItems, setFavouriteItems] = useState([]);

    const [buyerImages, setImages] = useState("");

    
   // buyerId,
   // buyerDescription,
   // buyerAddress,
   // buyerContact,
   // favouriteAreas,
   // favouriteWasteTypes,
   // favouriteWasteItems,
   // buyerImages
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submit");
        const newBuyerDetails = {
            buyerId,
            buyerName,
            buyerDescription,
            buyerAddress,
            buyerContact,
            favouriteAreas,
            favouriteWasteTypes,
            favouriteWasteItems,
            buyerImages
        }

        console.log(newBuyerDetails);
        if (currentId === 0) {
           // console.log(newPostData);
            axios.post('/buyerAddDetails', newBuyerDetails).then((res) => {
                console.log(res);
            }
            ).catch((err) => {
                alert(err)
            })
        } else {
        }
        history.push("/buyer/home");
    }

    return (
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="content-b">
                        <div className="title-b">Get Registered Buyer Details</div>
                            <form className="buyer-form-b" onSubmit={handleSubmit}>
                                <div className="user-details-b">
                                    <div className="input-box-b">
                                        <span className="details-b">Description</span>
                                    <input type="textarea" onChange={(e) => {
                                        setDescription(e.target.value);

                                    }}/>
                                    </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Address</span>
                                    <input type="text" onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}/>
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Contact No</span>
                                    <input type="text" onChange={(e) => {
                                        setContact(e.target.value);
                                    }} />
                                    <input type="submit" value="Add Contact" onClick={(e) => {
                                        e.preventDefault();
                                        setContactList(buyerContact => [...buyerContact, contact]);
                                    }} />
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favourite Areas:</span>
                                    <input type="text" onChange={(e) => {
                                        setArea(e.target.value);
                                     //   setFavouriteAreas(favouriteAreas => [...favouriteAreas, e.target.value]);
                                     //   console.log(favouriteAreas);
                                    } } />
                                    <input type="submit" value="Add Area" onClick={(e) => {
                                        e.preventDefault();
                                         setFavouriteAreas(favouriteAreas => [...favouriteAreas, area]);
                                    }} />

                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favourite Waste Types:</span>
                                    <input type="text" onChange={(e) => {
                                        setType(e.target.value);
                                    }} />
                                    <input type="submit" value="Add Waste Types" onClick={(e) => {
                                        e.preventDefault();
                                        setFavouriteTypes(favouriteWasteTypes => [...favouriteWasteTypes, type]);
                                    }} />
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favorite Waste Items:</span>
                                    <input type="text" onChange={(e) => {
                                        setItem(e.target.value);
                                    }} />
                                    <input type="submit" value="Add Waste Items" onClick={(e) => {
                                        e.preventDefault();
                                        setFavouriteItems(favouriteWasteItems => [...favouriteWasteItems, item]);
                                    }} />
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Images: </span>
                                    <input type="file"
                                        accept="image/**"
                                        onChange={
                                            (e) => {
                                                const file = e.target.files[0];
                                                const fileReader = new FileReader();
                                                fileReader.readAsDataURL(file);
                                                fileReader.onload = () => {
                                                 //     console.log(fileReader.result);
                                                    let base64 = fileReader.result;
                                                    setImages(buyerImages => [...buyerImages, base64]);
                                                }
                                            }
                                        }/>
                                </div>
                                </div>
                                <div className="button-b">
                                    <input type="submit" value="Save Details"></input>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    );
}