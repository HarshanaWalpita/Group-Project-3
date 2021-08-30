import React, { useEffect,useState } from "react";
import "./Modal.css";
import './AcceptedOffers.css';
import axios from "axios";
import {Link} from "react-router-dom";
import moment from "moment";
import '../../../../buyer/posts/LoadingRing.css';

function DirectP() {

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
        await axios.get(`/getNotifyDetailsForCompany`)
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

    const wasteItem = notes?.filter(wasteItem => wasteItem.companyId === companyId);
    console.log(wasteItem);

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (notes) =>
                notes?.buyerName.toLowerCase().includes(searchKey) ||
                notes?.wasteType.toLowerCase().includes(searchKey) ||
                notes?.wasteItem.toLowerCase().includes(searchKey) ||
                notes?.value.toString().toLowerCase().includes(searchKey)  ||
                notes?.quantity.toString().toLowerCase().includes(searchKey)
        );
        setNotes(result);
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get(`/getNotifyDetailsForCompany`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.existingPosts, searchKey);
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
                      <h1>Direct Offers</h1>
                        <div className="search_box-c">
                            <input type="text" placeholder="What are you looking for?" onChange={handleSearchArea}></input>
                            <i className="fas fa-search"></i>
                        </div>
                        <table className="table-c">
                          <thead>
                            <tr>
                                <th>Offer ID</th>
                                <th>Buyer Name</th>
                                <th>Waste Type</th>
                                <th>Waste Item</th>
                                <th>Quantity (Kg)</th>
                                <th>Value (Rs)</th>
                                <th>Delivery Date</th>
                                <th>Expiry Date</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {wasteItem.map((note,index)=> (
                              <tr>
                                <td data-label="Offer ID">{index + 1}</td>
                                <td data-label="Buyer Name">{note.buyerName}</td>
                                <td data-label="Waste Type">{note.wasteType}</td>
                                <td data-label="Waste Type">{note.wasteItem}</td>
                                <td data-label="Quantity (Kg)">{note.quantity}</td>
                                  <td data-label="Value (Rs)">{note.value}</td>
                                  <td data-label="Delivery Date">{moment(note.deliveryDate).fromNow()}</td>
                                  <td data-label="Expiry Date">{moment(note.expiryDate).fromNow()}</td>
                                <td data-label="Action">
                                <span className="action_btn-b">
                                  <Link style={{color: '#000', textDecoration: 'none'}}
                                        to={`/company/buyerdirectpost/${note.buyerId}`}>Accept</Link>
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

export default DirectP;