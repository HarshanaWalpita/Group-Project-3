import React, { useEffect, useState } from "react";
import "./Modal.css";
import './AcceptedOffers.css';
import axios from 'axios';
import {useParams} from "react-router-dom";
import moment from 'moment';
import {Slide, toast, ToastContainer} from "react-toastify";

function ViewOffers() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const companyId=(localStorage.getItem("userId"));
  console.log(companyId);

  const { postId } = useParams();
    console.log(postId);
    

  const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewOffersForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    

    

  return(
    <>
      <div className="tables-c">
        <div className="tables__container-c">
          <h1>Offers</h1>
            <div className="search_box-c">
                <input type="text" placeholder="What are you looking for?"></input>
                <i className="fas fa-search"></i>
            </div>
            <table className="table-c">
              <thead>
                <tr>
                    <th>Offer ID</th>
                    <th>Buyer</th>
                    <th>Collecting Time</th>
                    <th>Collecting Date</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {offers.map((offer,index)=> {
                    if(offer.status==='pending' && offer.companyId===companyId && offer.postId===postId)
                        return (
                                <tr>
                                <td data-label="Offer ID">{index + 1}</td>
                                <td data-label="Buyer"><u><button onClick={toggleModal} className="btn-modal-c">{offer.buyerId}</button></u></td>
                                <td data-label="Collecting Time">{offer.collectingTime}</td>
                                <td data-label="Collecting Date">{offer.collectingDate}</td>
                                <td data-label="Quantity">{offer.quantity}</td>
                                <td data-label="Action">
                                    <span className="action_btn-c">
                                    <a href="#" >Accept</a>
                                    <a href="#">Reject</a>
                                    </span>
                                </td>
                                </tr>
                                );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay-c"></div>
            <div className="modal-content-c">
              <div className="contact-c">
                <img src="../../images/polythene.jpg" alt="" className="profileimage-c"></img>
                <h1>Tom Harrison</h1><br></br>
                <h2 >Email: th@gmail.com</h2><br></br>
                <h2>Contact: 011-1111111</h2>
              </div>
              <div className="detail-c">
                <label>Collecting Area: </label><h2>Colombo</h2><br></br>
                <label>Address: </label><h2> Reid Aveneu, Colombo 07</h2><br></br>
                <label>Working Hours: </label><h2> 8.00 a.m - 5.00 p.m</h2><br></br>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Providentperferendis suscipit officia recusandae.</p>
              </div>
              <button className="close-modal-c" onClick={toggleModal}>
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
    </>
  );
}

export default ViewOffers;