import React, {useEffect, useState} from "react";
import '../posts/Posts.css';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from 'moment';
import '../posts/LoadingRing.css';

function CompanyDirectPostsView() {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
            await axios.get(`/buyerGetCompanyPosts`)
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

    const [offers, getOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingCompanyOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                getOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItem => wasteItem.status==='accepted');
    console.log(wasteItem);

    const checkWeight = (cId, pId) => {
        const wasteItem2 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===cId && wasteItem.postId===pId);
        console.log(wasteItem2);

        const wasteItemLength = wasteItem2.length;
        console.log(wasteItemLength);

        let quantity=0;

        for (let i = 0; i < wasteItemLength; i++) {
            quantity += wasteItem2[i].quantity
        }

        console.log(quantity);

        return quantity;
    }

    const calculateWeight = (postWeight, calWeight) =>{
        const trueWeight=postWeight-calWeight;
        console.log(trueWeight);
        return trueWeight;
    }

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (notes) =>
                notes?.address?.district.toLowerCase().includes(searchKey) ||
                notes?.address?.city.toLowerCase().includes(searchKey) ||
                notes?.wasteType.toLowerCase().includes(searchKey) ||
                notes?.item.toLowerCase().includes(searchKey) ||
                notes?.contact.toString().toLowerCase().includes(searchKey) ||
                notes?.quantity.toString().toLowerCase().includes(searchKey)
        );
        setNotes(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get(`/buyerGetCompanyPosts`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingPosts, searchKey);
            }
        });
    };

    return(
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
                                            <input type="text" placeholder="What are you looking for? (සොයන්න)" onChange={handleSearchArea}></input>
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <div className="search-button-b">
                                            <input type="submit" value="Search"></input>
                                        </div>
                                    </div>
                                    <div className="search-bar-b">
                                        <div className="box-b">
                                            <h3>Waste Type (වර්ගය)</h3>
                                            <select onChange={handleSearchArea}>
                                                <option disabled selected >All</option>
                                                <option value="polythene">Polythene (පොලිතීන්)</option>
                                                <option value="plastic">Plastic (ප්ලාස්ටික්)</option>
                                                <option value="organic waste">Organic Waste (කාබනික)</option>
                                                <option value="paper">Paper (කඩදාසි)</option>
                                                <option value="metal">Metal (ලෝහ)</option>
                                            </select>
                                        </div>
                                        <div className="box-b">
                                            <h3>Waste Item (අයිතමය)</h3>
                                            <select onChange={handleSearchArea}>
                                                <option disabled selected >All</option>
                                                <option value="bag" >Bag (බෑගය)</option>
                                                <option value="bucket" >Bucket (බාල්දිය)</option>
                                                <option value="plate" >Plate (තහඩුව)</option>
                                                <option value="paper" >News Paper (පුවත්පත)</option>
                                                <option value="chair" >Chair (පුටුව)</option>
                                            </select>
                                        </div>
                                        <div className="box-b">
                                            <h3>Quantity (ප්රමාණය)</h3>
                                            <select onChange={handleSearchArea}>
                                                <option disabled selected >All</option>
                                                <option value="100">100 kg</option>
                                                <option value="200">200 kg</option>
                                                <option value="300">300 kg</option>
                                                <option value="400">400 kg</option>
                                                <option value="500">500 kg</option>
                                            </select>
                                        </div>
                                        <div className="box-b">
                                            <h3>Location (ස්ථානය)</h3>
                                            <select onChange={handleSearchArea}>
                                                <option disabled selected >All</option>
                                                <option value="ampara">Ampara (අම්පාර)</option>
                                                <option value="anuradhapura">Anuradhapura (අනුරාධපුර)</option>
                                                <option value="badulla">Badulla (බදුල්ල)</option>
                                                <option value="batticaloa">Batticaloa (මඩකලපුව)</option>
                                                <option value="colombo">Colombo (කොළඹ)</option>
                                                <option value="galle">Galle (ගාල්ල)</option>
                                                <option value="gampaha">Gampaha (ගම්පහ)</option>
                                                <option value="hambantota">Hambantota (හම්බන්තොට)</option>
                                                <option value="jaffna">Jaffna (යාපනය)</option>
                                                <option value="kalutara">Kalutara (කළුතර)</option>
                                                <option value="kandy">Kandy (මහනුවර)</option>
                                                <option value="kegalle">Kegalle (කෑගල්ල)</option>
                                                <option value="kilinochchi">Kilinochchi (කිලිනොච්චි)</option>
                                                <option value="kurunegala">Kurunegala (කුරුණෑගල)</option>
                                                <option value="mannar">Mannar (මන්නාරම)</option>
                                                <option value="matale">Matale (මාතලේ)</option>
                                                <option value="matara">Matara (මාතර)</option>
                                                <option value="monaragala">Monaragala (මොනරාගල)</option>
                                                <option value="mullaitivu">Mullaitivu (මුලතිව්)</option>
                                                <option value="nuwaraeliya">Nuwara Eliya (නුවරඑලිය)</option>
                                                <option value="polonnaruwa">Polonnaruwa (පොළොන්නරුව)</option>
                                                <option value="puttalam">Puttalam (පුත්තලම)</option>
                                                <option value="ratnapura">Ratnapura (රත්නපුර)</option>
                                                <option value="trincomalee">Trincomalee (ත්රිකුණාමලය)</option>
                                                <option value="vavuniya">Vavuniya (වවුනියාව)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <main className="grid-b">
                                    {notes.map((note,index)=> {
                                        if(wasteItem.find(o=>o.postId === note._id && note.quantity<=checkWeight(note.companyId,note._id)) === undefined && note.postType==='direct' && note.buyer===buyerId)
                                            return (
                                                <article>
                                                    <div className="text-b">
                                                        <h3>Post ID: {index + 1}</h3>
                                                        <p>Company Name: {note.companyName}</p>
                                                        <p>Post Type: {note.postType}</p>
                                                        <p>Waste Type: {note.wasteType}</p>
                                                        <p>Waste Item: {note.item}</p>
                                                        <p>Quantity: {calculateWeight(note.quantity, checkWeight(note.companyId,note._id))} Kg</p>
                                                        <p>Telephone No: {note.contact}</p>
                                                        <p>Can Collect Items: {moment(note.avbDate).fromNow()}</p>
                                                        <p>City: {note.address.city}</p>
                                                        <p>Location: {note.address.district}</p>
                                                        <div className="buyerlink-b">
                                                            <Link style={{color: '#fff', textDecoration: 'none'}}
                                                                  to={`/buyer/companyofferforms/${note._id}/${note.companyId}`}>Make Offer <i
                                                                className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                    })}
                                </main>
                            </div>
                        </div>
            }

        </>
    );
}

export default CompanyDirectPostsView;