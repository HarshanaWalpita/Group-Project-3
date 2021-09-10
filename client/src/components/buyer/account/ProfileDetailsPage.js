import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../posts/Form.css';
import { BsFillXCircleFill } from "react-icons/bs";

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
                                        <span className="details-b">Contact No {buyerContact && buyerContact?.map((contact) => {
                                        return (
                                            <span>{contact}<BsFillXCircleFill/></span>
                                        )
                                    })}</span>
                                    <input type="text" onChange={(e) => {
                                        setContact(e.target.value);
                                    }} value={contact}/>
                                    <input type="submit" value="Add Contact" onClick={(e) => {
                                        e.preventDefault();
                                        if (contact.length !== 10) {
                                           alert("Fill the contact")
                                        } else {
                                            setContactList(buyerContact => [...buyerContact, contact]);
                                            setContact('');
                                        }
                                        
                                    }} />
                                    
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favourite Areas:{favouriteAreas && favouriteAreas?.map((area) => {
                                        return (
                                            <span>{area}</span>
                                        )
                                    })}</span>
                                    <input type="text" value={area} onChange={(e) => {
                                        setArea(e.target.value);
                                     //   setFavouriteAreas(favouriteAreas => [...favouriteAreas, e.target.value]);
                                     //   console.log(favouriteAreas);
                                    } } />
                                    <input type="submit" value="Add Area" onClick={(e) => {
                                         e.preventDefault();
                                        if (area === "") {
                                            alert("add area")
                                        } else {
                                            setFavouriteAreas(favouriteAreas => [...favouriteAreas, area]);
                                            setArea('');
                                        }
                                       
                                        
                                    }} />

                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favourite Waste Types:{favouriteWasteTypes && favouriteWasteTypes?.map((type) => {
                                        return (
                                            <span>{type}</span>
                                        )
                                    })}</span>
                                    <input type="text" value={type} onChange={(e) => {
                                        setType(e.target.value);
                                    }} />
                                    <input type="submit" value="Add Waste Types" onClick={(e) => {
                                        e.preventDefault();
                                        if (type === " ") {
                                            alert("add type")
                                        } else {
                                            setFavouriteTypes(favouriteWasteTypes => [...favouriteWasteTypes, type]);
                                            setType('');
                                        }
                                       
                                    }} />
                                </div>
                                    <div className="input-box-b">
                                        <span className="details-b">Favorite Waste Items:{favouriteWasteItems && favouriteWasteItems?.map((item) => {
                                        return (
                                            <span>{item}</span>
                                        )
                                    })}</span>
                                    <input type="text" value={item} onChange={(e) => {
                                        setItem(e.target.value);
                                    }} />
                                    <input type="submit" value="Add Waste Items" onClick={(e) => {
                                        e.preventDefault();
                                        if (item === "") {
                                            alert("add item")
                                        } else {
                                            setFavouriteItems(favouriteWasteItems => [...favouriteWasteItems, item]);
                                            setItem('');
                                        }
                                       
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
                                        } />
                                    <img src={buyerImages} alt="Add Image Here"></img>
                                    
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