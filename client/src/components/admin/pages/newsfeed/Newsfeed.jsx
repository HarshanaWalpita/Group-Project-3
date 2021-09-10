import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {Link} from "react-router-dom";

export default function Newsfeed() {

    const history = useHistory();
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "admin")) {
        history.push("/");
    }
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
            await axios.get(`/buyerPosts`)
                .then ((response)=>{
                    const allNotes=response.data.existingPosts;
                    setNotes(allNotes);
                    setIsLoading(false)
                })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(notes);

    const buyerId=(localStorage.getItem("userId"));
    console.log(buyerId);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingSellerOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.wasteItemsListId==='completePost');
    console.log(wasteItem);

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (notes) =>
                notes?.address.toLowerCase().includes(searchKey) ||
                notes?.sellerDistrict.toLowerCase().includes(searchKey) ||
                notes?.contact.toString().toLowerCase().includes(searchKey) ||
                notes?.wasteItemList?.map(wasteItem => wasteItem.wasteType).join(' ').toLowerCase().includes(searchKey) ||
                notes?.wasteItemList?.map(wasteItem => wasteItem.item).join(' ').toLowerCase().includes(searchKey) ||
                notes?.wasteItemList?.map(wasteItem => wasteItem.quantity).join(' ').toString().toLowerCase().includes(searchKey)
        );
        setNotes(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get(`/buyerPosts`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingPosts, searchKey);
            }
        });
    };

    return (
        <div>
            <div>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <>
            {
                isLoading ?
                    <div className="posts-b">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                    <div className="posts-b">
                        <h1>Error Occurred</h1>
                    </div> :
                    <div className="posts-b">
                        <div className="posts__container-b">
                            <div className="search-box-shadow-b">
                                <div className="search-bar-box-b">
                                    <div className="post-search-box-b">
                                        <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <div className="search-button-b">
                                        <input type="submit" value="Search"></input>
                                    </div>
                                </div>
                                <div className="search-bar-b">
                                    <div className="box-b">
                                        <h3>Waste Type</h3>
                                        <select onChange={handleSearchArea}>
                                            <option disabled selected >All</option>
                                            <option value="polythene">Polythene</option>
                                            <option value="plastic">Plastic</option>
                                            <option value="organic waste">Organic Waste</option>
                                            <option value="paper">Paper</option>
                                            <option value="metal">Metal</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="box-b">
                                        <h3>Waste Item</h3>
                                        <select onChange={handleSearchArea}>
                                            <option disabled selected >All</option>
                                            <option value="bag" >Bag</option>
                                            <option value="bucket" >Bucket</option>
                                            <option value="plate" >Plate</option>
                                            <option value="paper" >Paper</option>
                                            <option value="chair" >Chair</option>
                                        </select>
                                    </div>
                                    <div className="box-b">
                                        <h3>Quantity</h3>
                                        <select onChange={handleSearchArea}>
                                            <option disabled selected >All</option>
                                            <option value="1">1 kg</option>
                                            <option value="2">2 kg</option>
                                            <option value="3">3 kg</option>
                                            <option value="4">4 kg</option>
                                            <option value="5">5 kg</option>
                                        </select>
                                    </div>
                                    <div className="box-b">
                                        <h3>Location</h3>
                                        <select onChange={handleSearchArea}>
                                            <option disabled selected >All</option>
                                            <option value="ampara">Ampara</option>
                                            <option value="anuradhapura">Anuradhapura</option>
                                            <option value="badulla">Badulla</option>
                                            <option value="batticaloa">Batticaloa</option>
                                            <option value="colombo">Colombo</option>
                                            <option value="galle">Galle</option>
                                            <option value="gampaha">Gampaha</option>
                                            <option value="hambantota">Hambantota</option>
                                            <option value="jaffna">Jaffna</option>
                                            <option value="kalutara">Kalutara</option>
                                            <option value="kandy">Kandy</option>
                                            <option value="kegalle">Kegalle</option>
                                            <option value="kilinochchi">Kilinochchi</option>
                                            <option value="kurunegala">Kurunegala</option>
                                            <option value="mannar">Mannar</option>
                                            <option value="matale">Matale</option>
                                            <option value="matara">Matara</option>
                                            <option value="monaragala">Monaragala</option>
                                            <option value="mullaitivu">Mullaitivu</option>
                                            <option value="nuwaraeliya">Nuwara Eliya</option>
                                            <option value="polonnaruwa">Polonnaruwa</option>
                                            <option value="puttalam">Puttalam</option>
                                            <option value="ratnapura">Ratnapura</option>
                                            <option value="trincomalee">Trincomalee</option>
                                            <option value="vavuniya">Vavuniya</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <main className="grid-b">
                                {notes.map((note,index)=> {
                                    if(wasteItem.find(o=>o.postId === note._id) === undefined && note.postType==='public')
                                        return (
                                        <article>
                                            <img src={note.thumbnail} alt=""></img>
                                            <div className="text-b">
                                                <h3>Post ID: {index + 1}</h3>
                                                <p>Seller Name: {note.sellerName}</p>
                                                <p>District: {note.sellerDistrict}</p>
                                                <p>Post Type: {note.postType}</p>
                                                <p>Address: {note.address}</p>
                                                <p>Telephone No: {note.contact}</p>
                                               
                                            </div>
                                        </article>
                                        );
                                })}
                            </main>
                        </div>
                    </div>
            }

        </>
                </div>
            </div>
            <Footer />
        </div>
    )
}
