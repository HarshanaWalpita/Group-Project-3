import React, { useEffect,useState } from "react";
import './AcceptedOffers.css';
import axios from "axios";
import {Link} from "react-router-dom";
import '../../../../buyer/posts/LoadingRing.css';

function BuyerInfo() {

    const [buyerDetails, setBuyerDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getBuyerDetailsForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingBuyers;
                setBuyerDetails(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }

    console.log(buyerDetails);

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (buyerDetails) =>
                buyerDetails?.buyerAddress.toLowerCase().includes(searchKey) ||
                buyerDetails?.favouriteWasteTypes?.map(wasteItem => wasteItem.favouriteWasteTypes).join(' ').toLowerCase().includes(searchKey) ||
                buyerDetails?.favouriteWasteItems?.map(wasteItem => wasteItem.favouriteWasteItems).join(' ').toLowerCase().includes(searchKey) ||
                buyerDetails?.favouriteAreas?.map(wasteItem => wasteItem.favouriteAreas).join(' ').toLowerCase().includes(searchKey) ||
                buyerDetails?.buyerContact?.map(wasteItem => wasteItem.buyerContact).join(' ').toLowerCase().includes(searchKey) ||
                buyerDetails?.buyerDescription.toLowerCase().includes(searchKey)
        );
        setBuyerDetails(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get(`/getBuyerDetailsForCompany`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingBuyers, searchKey);
            }
        });
    };

    return(
        <>
            {
                isLoading ?
                    <div className="tables-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="tables-c">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="tables-c">
                            <div className="tables__container-c">
                                <h1>Contact Buyers</h1>
                                <div className="search_box-c">
                                    <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                                    <i className="fas fa-search"></i>
                                </div>
                                <table className="table-c">
                                    <thead>
                                        <tr>
                                            <th>Buyer ID</th>
                                            <th>Waste Type</th>
                                            <th>Waste Item</th>
                                            <th>Collecting Area</th>
                                            <th>Contact No</th>
                                            <th>Description</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buyerDetails.map((note,index)=> (
                                            <tr>
                                                <td data-label="Offer ID">{index + 1}</td>
                                                <td data-label="Waste Type">
                                                {note.favouriteWasteTypes.map((wasteTypes)=>(
                                                    <span>
                                                    {wasteTypes}
                                                    </span>
                                                ))}
                                                </td>
                                                <td data-label="Waste Item">
                                                    {note.favouriteWasteItems.map((wasteItems)=>(
                                                        <span>
                                                    {wasteItems}
                                                    </span>
                                                    ))}
                                                </td>
                                                <td data-label="Collecting Area">
                                                    {note.favouriteAreas.map((wasteAreas)=>(
                                                        <span>
                                                    {wasteAreas}
                                                    </span>
                                                    ))}
                                                </td>
                                                <td data-label="Contact No">
                                                    {note.buyerContact.map((wasteContact)=>(
                                                        <span>
                                                    {wasteContact}
                                                    </span>
                                                    ))}
                                                </td>
                                                <td data-label="Description">{note.buyerDescription}</td>
                                                <td data-label="Address">{note.buyerAddress}</td>
                                                <td data-label="Action">
                                                    <span className="action_btn-c">
                                                  <Link style={{color: '#000', textDecoration: 'none'}}
                                                        to={`/company/buyerdirectpost/${note.buyerId}`}>Contact</Link>
                                                    </span>
                                                    <span className="action_btn-c">
                                                  <Link style={{color: '#000', textDecoration: 'none'}}
                                                        to={`/company/addcomplaints/${note.buyerId}`}>Complain</Link>
                                                    </span>
                                                    <span className="action_btn-c">
                                                  <Link style={{color: '#000', textDecoration: 'none'}}
                                                        to={`/company/viewbuyerratings/${note.buyerId}`}>Ratings</Link>
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

export default BuyerInfo;