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
                                                    <td data-label="Amount (Kg)">
                                                    {wasteItem.map((q)=>(
                                                        <span>{q.quantity}</span>
                                                    ))}
                                                    </td>
                                                    <td data-label="Waste Type">{note.wasteType}</td>
                                                    <td data-label="Waste Item">{note.item}</td>
                                                    <td data-label="Price (Rs)">
                                                    {wasteItem.map((p)=>(
                                                        <span>{p.value}</span>
                                                    ))}
                                                    </td>
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




