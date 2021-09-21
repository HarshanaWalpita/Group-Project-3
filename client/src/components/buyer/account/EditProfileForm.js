import '../posts/Form.css';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillXCircleFill , BsFillPlusCircleFill} from "react-icons/bs";

function EditProfileForms() {

    const history = useHistory()

    const buyerId = (localStorage.getItem("userId"));
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    var [buyer, setBuyerDetails] = useState({});
   
    var [buyerAddress, setAddress] = useState("");
    var [buyerDescription, setDescription] = useState("");
    var [buyerContact, setContact] = useState([]);
    var [favouriteWasteTypes, setTypes] = useState([]);
    var [favouriteWasteItems, setItems] = useState([]);
    var [favouriteAreas, setAreas] = useState([]);
    var [buyerImages, setImages] = useState([]);
    var [tempCt, setTempCt] = useState("");
    var [tempArea, setTempArea] = useState("");
    var [tempItem, setTempItem] = useState("");
    var [tempType, setTempType] = useState("");
    useEffect(() => {
        getBuyerDetails()
    }, [])
 
    const getBuyerDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/sellerViewBuyerDetails/${buyerId}`)
            console.log(response);

            const data = response.data.buyer;
            console.log(data);
            setBuyerDetails(data);
            setAddress(data.buyerAddress);
            setDescription(data.buyerDescription);
            setContact(data.buyerContact);
            setTypes(data.favouriteWasteTypes);
            setItems(data.favouriteWasteItems);
            setAreas(data.favouriteAreas);
            setImages(data.buyerImages);
          
           // setAreas(areas => [...areas, data.favouriteAreas]);

            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(buyer);

 //   console.log(contact);
    //console.log(areas)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submit");
        const newBuyerDetails = {
            buyerDescription,
            buyerAddress,
            buyerContact,
            favouriteAreas,
            favouriteWasteTypes,
            favouriteWasteItems,
            buyerImages
        }
       
        formValidate(newBuyerDetails);
        console.log(newBuyerDetails);
    }

    const formValidate = (data) => {
        if (data.buyerDescription === " " || data.buyerAddress === " " || data.buyerContact.length === 0 ||
            data.favouriteAreas.length === 0 || data.favouriteWasteItems.length === 0 || data.favouriteWasteTypes.length === 0 || data.buyerImages.length === 0) {
            alert("input cannot be empty")
        } else {
            axios.patch(`/buyerUpdateDetails/${buyer._id}`, data).then((res) => {
                console.log(res);
                history.push('/buyer/vprofile');

            }
            ).catch((err) => {
                alert(err)
            })
        }
    }


    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="title-b">Edit Profile</div>
                    <div className="content-b">
                        <form className="buyer-form-b" action="#">
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Address (ලිපිනය)</span>
                                    <input type="text" placeholder="Enter Address" value={buyerAddress} onChange={(e) => {
                                       // setAddress(e.target.value);
                                        setAddress(e.target.value);
                                        console.log(buyer);
                                    }}></input>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Description (විස්තරය)</span>
                                    <input type="text" placeholder="Enter Address" value={buyerDescription} onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}></input>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Telephone (දුරකථන අංක)</span>
                                    {buyerContact && buyerContact?.map((contact, idx) => {
                                        return (
                                            <div>
                                                <p>{contact}<a><BsFillXCircleFill color="red" /></a></p>
                                            </div>
                                            
                                        )
                                    })}
                                    <input type="text" placeholder="Enter Telephone" value={tempCt} onChange={(e) => {
                                        setTempCt(e.target.value);
                                    }}></input>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        if (tempCt.length !== 10) {
                                            alert("Invalid Contact")
                                        } else {
                                            setContact(buyerContact => [...buyerContact, tempCt]);
                                            setTempCt('');
                                        }
                                        
                                    }}>Add</button>
                                </div>
                            
                                <div className="input-box-b">
                                    <span className="details-b">Favourite Waste Types (වර්ග)</span>
                                    {favouriteWasteTypes && favouriteWasteTypes?.map((type, idx) => {
                                        return (
                                            <div>
                                                <p>{type}<a><BsFillXCircleFill color="red" /></a></p>
                                            </div>
                                            
                                        )
                                    })}
                                    <input type="text" placeholder="Enter Telephone" value={tempType} onChange={(e) => {
                                        setTempType(e.target.value)
                                    }}></input>
                                     <button vlaue="add" onClick={(e) => {
                                        e.preventDefault()
                                        if (tempType === "") {
                                            alert("Invalid Input")
                                        } else {
                                            setTypes(favouriteWasteTypes => [...favouriteWasteTypes, tempType]);
                                        setTempType('');
                                        }
                                        
                                    }}>Add</button>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Favourite Waste Items (අයිතම)</span>
                                    {favouriteWasteItems && favouriteWasteItems?.map((item, idx) => {
                                        return (
                                            <div>
                                                <p>{item}<a><BsFillXCircleFill color="red" /></a></p>
                                            </div>
                                            
                                        )
                                    })}
                                    <input type="text" placeholder="Enter Telephone" value={tempItem} onChange={(e) => {
                                        setTempItem(e.target.value)
                                    }}></input>
                                     <button vlaue="add" onClick={(e) => {
                                        e.preventDefault()
                                        if (tempItem === "") {
                                            alert("Invalid Input")
                                        } else {
                                            setItems(favouriteWasteItems => [...favouriteWasteItems, tempItem]);
                                            setTempItem('');
                                        }
                                       
                                    }}>Add</button>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Favourite Areas (ප්‍රදේශ)</span>
                                    {favouriteAreas && favouriteAreas?.map((area, idx) => {
                                        return (
                                            <div>
                                                <p>{area}<a><BsFillXCircleFill color="red" /></a></p>
                                            </div>
                                            
                                        )
                                    })}
                                    <input type="text" placeholder="Enter Telephone" value={tempArea} onChange={(e) => {
                                        setTempArea(e.target.value)
                                    }}></input>
                                    <button vlaue="add" onClick={(e) => {
                                        e.preventDefault()
                                        if (tempArea === "") {
                                            alert("Invalid Input")
                                        } else {
                                            setAreas(favouriteAreas => [...favouriteAreas, tempArea]);
                                        setTempArea('');
                                        }
                                        
                                    }}>Add</button>
                                </div>
                                
                            </div>
                            <div className="user-details-b">
                            <div className="input-box-b">
                                    <span className="details-b">Images (රූප)</span>
                                    {buyer && buyerImages && buyerImages?.map((img, idx) => {
                                        return (
                                            <div>
                                                <img src={img} alt="img"></img><a><BsFillXCircleFill color="red" /></a>
                                            </div>
                                            
                                        )
                                    })}
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
                                    
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Edit Profile" onClick={(e) => {
                                    handleSubmit(e)
                                }}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileForms;