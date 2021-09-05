import React, { useState, setState, useEffect, Component} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { createPost, getPosts, updatePost } from '../../../actions/posts';
import './PostForm.css';
import axios from 'axios';
import e from 'cors';

export default function EditPost() {

    const history = useHistory();
    
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "seller")) {
        history.push("/");
    }
    const { postId } = useParams();
   // console.log(postId);

    useEffect(() => {
        getPost();
    }, [])
    
    var [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const postType = "public";
    const buyer = "all-buyers";
    const [district, setDistrict] = useState("")
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState([]);
    const [contact, setContact] = useState("");
    var [thumbnail, setThumbnail] = useState("");
    var wasteItem = {
        wasteType: '',
        item: '',
        avbDate: null,
        quantity: null,
        selectedFile: '',
    };

    //catstste = wasteItemList
    //blankcat= wasteitem

    var [wasteItemList, setWasteItemList] = useState([]);
    

    const getPost = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/sellerViewOnePost/${postId}`)
            console.log(response);
            const allPost = response.data.post;
            setPost(allPost);
            setDistrict(allPost.sellerDistrict);
            setAddress(allPost.address);
            setLocation(allPost.location);
            setContact(allPost.contact);
            setThumbnail(allPost.thumbnail);
          //  console.log(allPost.wasteItemList[0]);
            wasteItemList = [];
            setInitWasteItemList(allPost.wasteItemList);
            setIsLoading(false)
        } catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    const setInitWasteItemList = (item) => {
        console.log("item", item);
        {
            item && item.map((itm,id) => {
               // var list = [...wasteItemList];
                setWasteItemList(wasteItemList => [...wasteItemList, itm]);
        })}
    }
    console.log("INI", wasteItemList);

    const addWasteItem = (e) => {
        e.preventDefault();
        setWasteItemList(wasteItemList => [...wasteItemList, wasteItem]);
        console.log(wasteItemList);
    }
    

    const sellerId = (localStorage.getItem("userId"));
    const sellerName = (localStorage.getItem("userName"));
  
    

   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPostData = {
            sellerId,
            sellerName,
            postType,
            buyer,
            district,
            address,
            location,
            contact,
            thumbnail,
            wasteItemList
        }

        
            console.log(newPostData);
            axios.patch(`/sellerUpdatePost/${postId}`, newPostData).then((res) => {
                console.log(res);
                alert("Post Updated Sucessfully!");
                history.push('/seller/viewposts');
            }
            ).catch((err) => {
                alert(err)
            })
      
      
    };
    

    const getlocation = (e) => {
        e.preventDefault();
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude)
                console.log(position.coords.longitude)
                let locationTp = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                setLocation(locationTp)
            });
        } else {
            console.log("Not Available");
        }
    }

    const deleteItem = (id, e) => {
        e.preventDefault();
        console.log(wasteItemList);
        console.log(id);
        if (wasteItemList.length === 1) {
            console.log("error")
            alert("Waste Item List cannot be empty")
        } else {
           // var wasteItemListNew = wasteItemList.filter(o => o.index !== id);
          //  {
            //    wasteItemListNew.map((item) => {
              //      wasteItemList = setState([]);
                //    setWasteItemList(wasteItemList => [...wasteItemList, item]);
           // })}
           // setWasteItemList(wasteItemList => [...wasteItemList, wasteItemList.filter(o => o.index !== id)]);
            const temp = [...wasteItemList]
            temp.splice(id, 1);
            setWasteItemList(temp);
            console.log("new",wasteItemList);
        }
     //   console.log(wasteItemList[idx]);
        
    }
    
    
    return (
                 
        <div className="seller-add-post-background">
            <div className="seller-add-post">
                <div className="seller-add-post-header">
                    <h2>Add New Post</h2>
                </div>
                
                    <div className="seller-add-post-row">
                        <label className="seller-add-post-label">District</label>
                        <select className="seller-add-post-select" value={district} name="option"
                            onChange={(e) => {
                            setDistrict(e.target.value)
                        }}>
                            <option value="Colombo" selected>Colombo</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Kaluthara">Kaluthara</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Mathale">Mathale</option>
                            <option value="Nuwara-eliya">Nuwara-Eliya</option>
                            <option value="Galle">Galle</option>
                            <option value="Matara">Matara</option>
                            <option value="Hambanthota">Hambanthota</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Vauniya">Vauniya</option>
                            <option value="Mulathivu">Mulathivu</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Ampara">Apmara</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Puttalam">Puttalam</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Badulla">Badulla</option>
                            <option value="Monaragala">Monaragala</option>
                            <option value="Rathnapura">Rathnapura</option>
                            <option value="Kegalle">Kegalle</option>

                        </select>
                    </div>
                   
                
                    <div className="seller-add-post-row"> 
                        <label className="seller-add-post-label" htmlfor="address">Address</label>
                            <input className="address"
                                id="input"
                                name="address"
                                type="text"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                            required></input>
                    </div>
                    
                    <div className="seller-add-post-row"> 
                        <label className="seller-add-post-label" htmlfor="contact">Contact Nuber</label>
                            <input className="contact"
                                id="input"
                                name="contact"
                                type="tel"
                                value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required></input>
                    </div>
                    <div className="seller-add-post-row">
                        <label className="seller-add-post-label" for="location">Location</label>
                        <a href="#" onClick={(e) => { getlocation(e) }}>Get Location</a>
                    </div>
                    <div className="seller-add-post-row">
                        <label className="seller-add-post-label" for="thumbnail_img">Add Thumbnail Image</label>
                        <input className="Selected-file"
                            type="file"
                            accept="image/*"
                            onChange={
                                (e) => {
                                   // console.log(e);
                                    const file = e.target.files[0];
                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(file);
                                    fileReader.onload = () => {
                                   //     console.log(fileReader.result);
                                        let base64 = fileReader.result;
                                        setThumbnail(base64);
                                    }
                                    
                                }
                            }
                        ></input>
                      <img src={thumbnail}></img> 
                    </div>
                    <div>
                        <h3>Add waste Item</h3>
                        <div className="seller-post-item">
                            <div className="seller-add-post-item-header">
                     
                     
                                <div className="seller-add-post-row">
                                    <label className="seller-add-post-label">Select Waste Type</label>
                                <select className="wasteType" name="wastetype" onChange={(e) => {
                                    
                                    wasteItem.wasteType = e.target.value;
                                    console.log(wasteItem);
                                    }}>
                                    <option value="plastic">Plastic</option>
                                    <option value="glass">Glass</option>
                                    <option value="paper">Paper</option>
                                    <option value="polythene">Polythene</option>
                                    <option value="organic">Organic</option>
                                    <option value="electronic">Electronic</option>
                                    <option value="other">Other</option>

                                </select>
                                </div>
                                <div className="seller-add-post-row"> 
                                    <label className="seller-add-post-label">Item</label>
                                    <input className="item"
                                        id="input"
                                        type="text"
                                    onChange={(e) => {
                                       
                                        wasteItem.item = e.target.value;
                                        console.log(wasteItem);
                                        }}
                                        
                                    ></input>
                                </div>
                                <div className="seller-add-post-row"> 
                                    <label className="seller-add-post-label">Quantity</label>
                                    <input className="quantity"
                                        id="input"
                                        
                                        type="text"
                                    
                                    onChange={(e) => {
                                        wasteItem.quantity = e.target.value;
                                        }}
                                    ></input>
                                </div>
                                <div className="seller-add-post-row"> 
                                    <label className="seller-add-post-label">Available On</label>
                                    <input className="avbDate"
                                        id="input"
                                        
                                        type="date"
                                        
                                    onChange={(e) => {
                                        wasteItem.avbDate = e.target.value;
                                        }}
                                    ></input>
                                </div>
                  
                                <div className="seller-add-post-row">
                                    <label className="seller-add-post-label">Select Image</label>
                                    <input className="selectedFile"
                                        id="input"
                                        
                                        type="file"
                                        accept="image/*"
                                    //  value={wasteItemList[idx].selectedFile= target.files[0]}
                                        //  onChange={handleCatChange}
                                        onChange={
                                            (e) => {
                                                console.log(e);
                                                const file = e.target.files[0];
                                                const fileReader = new FileReader();
                                                fileReader.readAsDataURL(file);
                                                fileReader.onload = () => {
                                                //     console.log(fileReader.result);
                                                    let base64 = fileReader.result;
                                                    wasteItem.selectedFile = base64;
                                                    console.log(wasteItem);
                                                }
                                                
                                            }
                                        }
                                    ></input>
                                </div>
             
                            <a href="#" className="seller-add-waste-item-btn" onClick={(e) => {
                                addWasteItem(e);
                                }}>Add Item</a>
                            </div>
                        </div>
                       
                
                    <main className="grid-b">
                        {wasteItemList.map((item, id) => {
                            return (
                                <article>
                                    <img src={item.selectedFile} alt=""></img>
                                    <div className="text-b">
         
                                        <p>Waste Type: {item.wasteType}</p>
                                        <p>District: {item.wasteItem}</p>
                                        <p>Post Type: {item.avbDate}</p>
                                        <p>Address: {item.quantity}</p>
                                    
                                       
                                        <div className="buyerlink-b">
                                            <button onClick={(e) => {
                                                  deleteItem(id,e);
                                            }}>Delete Item</button>
                                        </div>
                
                                    </div>
                                </article>

                            );
                        
                        })}
                    </main>
                    
                        </div>
                    </div>
                    
                    
        
            <button className="seller-post-submit-btn" type="submit" onClick={(e) => {
                handleSubmit(e);
        }}>Submit</button>
 
    
          
    </div>

            );
            
}