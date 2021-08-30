import React, {useEffect, useState} from "react";
import '../posts/AcceptedOffers.css';
import axios from "axios";
import {Link} from "react-router-dom";
import '../posts/LoadingRing.css';

function ViewCompany() {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getBuyerCompanyDetails`)
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

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (notes) =>
                notes?.companyName.toLowerCase().includes(searchKey) ||
                notes?.companyContact.toString().toLowerCase().includes(searchKey) ||
                notes?.address.toLowerCase().includes(searchKey) ||
                notes?.wasteType.toLowerCase().includes(searchKey) ||
                notes?.wasteItem.toLowerCase().includes(searchKey) ||
                notes?.description.toLowerCase().includes(searchKey)
        );
        setNotes(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get(`/getBuyerCompanyDetails`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingPosts, searchKey);
            }
        });
    };

    return(
        <>
            {
                isLoading ?
                    <div className="tables-b">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="tables-b">
                            <h1>Error Occurred</h1>
                        </div> :
                    <div className="tables-b">
                        <div className="tables__container-b">
                            <h1>Company Details</h1>
                            <div className="search_box-b">
                                <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                                <i className="fas fa-search"></i>
                            </div>

                            <table className="table-b">
                                <thead>
                                <tr>
                                    <th>Company ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Waste Type</th>
                                    <th>Waste Item</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notes.map((note,index)=> (
                                    <tr>
                                        <td data-label="Company ID">{index + 1}</td>
                                        <td data-label="Company Name">{note.companyName}</td>
                                        <td data-label="Phone">{note.companyContact}</td>
                                        <td data-label="Address">{note.address}</td>
                                        <td data-label="Waste Type">{note.wasteType}</td>
                                        <td data-label="Waste Item">{note.wasteItem}</td>
                                        <td data-label="Description">{note.description}</td>
                                        <td data-label="Action">
                                          <span className="action_btn-b">
                                              <Link style={{color: '#000', textDecoration: 'none'}}
                                                    to={`/buyer/notifyaboutwaste/${note._id}/${note.companyId}`}>Notify</Link>
                                          </span>
                                            <span className="action_btn-b">
                                              <Link style={{color: '#000', textDecoration: 'none'}}
                                                    to={`/buyer/addcomplaints/${note.companyId}`}>Complain</Link>
                                          </span>
                                            <span className="action_btn-b">
                                              <Link style={{color: '#000', textDecoration: 'none'}}
                                                    to={`/buyer/viewratings/${note.companyId}`}>Ratings</Link>
                                          </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }

        </>
    );
}

export default ViewCompany;