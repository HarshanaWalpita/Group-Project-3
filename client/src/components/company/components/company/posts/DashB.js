import React, {useEffect, useState} from "react";
import './Dashboard.css';
import axios from "axios";
import moment from "moment";
import '../../../../buyer/posts/LoadingRing.css';

function DashB() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getCompanyPostsForCompany`)
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

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingCompanyOffersForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId);
    console.log(wasteItem);

    const checkWeight = (pId) => {
        const wasteItem2 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId && wasteItem.postId===pId);
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

    const checkPrice = (pId) => {
        const wasteItem2 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId && wasteItem.postId===pId);
        console.log(wasteItem2);

        const wasteItemLength = wasteItem2.length;
        console.log(wasteItemLength);

        let price=0;

        for (let i = 0; i < wasteItemLength; i++) {
            price += wasteItem2[i].value
        }

        console.log(price);

        return price;
    }

    return(
        <>
            {
                isLoading ?
                    <div className="dashboard_body-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="dashboard_body-c">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="dashboard_body-c">
                            <div className="tables-c">
                                <div className="tables__container-c">
                                    <h1>Dashboard</h1>
                                    <h3 className="table_title-c">Collection Summary</h3>
                                    <table className="table-c">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Date</th>
                                                <th>Amount (Kg)</th>
                                                <th>Waste Type</th>
                                                <th>Waste Item</th>
                                                <th>Price (Rs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {notes.map((note,index)=> {
                                            if(wasteItem.find(o=>o.postId === note._id) !== undefined)
                                                return (
                                                <tr>
                                                    <td data-label="Offer ID">{index + 1}</td>
                                                    <td data-label="Date">{moment(note.avbDate).fromNow()}</td>
                                                    <td data-label="Amount (Kg)">{checkWeight(note._id)}</td>
                                                    <td data-label="Waste Type">{note.wasteType}</td>
                                                    <td data-label="Waste Item">{note.item}</td>
                                                    <td data-label="Price (Rs)">{checkPrice(note._id)}</td>
                                                </tr>
                                                );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
            }

        </>
    );
}

export default DashB;




