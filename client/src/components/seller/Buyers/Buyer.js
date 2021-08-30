import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Buyer.css';
import buypic from './BuyerImages/images.jpg';
import '../../buyer/posts/LoadingRing.css';

export default function Buyer() {

    useEffect(() => {
        getAllBuyers() 
     }, [])
     const [buyers, setBuyers] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [hasError, setHasError] = useState(false);
 
     const getAllBuyers = async () => {
         setIsLoading(true)
         try {
             const response = await axios.get(`/viewAllBuyers`)
          //   console.log(response);
             const allBuyers = response.data.buyer;
             setBuyers(allBuyers);
             setIsLoading(false)
         } catch (error) {
             console.error(`Error: ${error}`)
             setHasError(true)
         }
     }
     console.log(buyers);

    const history = useHistory();

    const viewdirectpost = () => {

        history.push("/seller/directpost")
    }
   

    const filterData = (postsPara, searchKey) => {
        const result = postsPara.filter(
            (notes) =>
                notes?.buyerAddress.toLowerCase().includes(searchKey) ||
                notes?.favouriteAreas?.map(area => area.toLowerCase()).includes(searchKey) ||
                notes?.favouriteWasteTypes?.map(type => type.toLowerCase()).includes(searchKey) ||
                notes?.favouriteWasteItems?.map(item => item.toLowerCase()).includes(searchKey)                    
               // notes?.contact.toString().toLowerCase().includes(searchKey) ||
              //  notes?.favouriteAreas?.map(areas).join(' ').toLowerCase().includes(searchKey) ||
               // notes?.wasteItemList?.map(wasteItem => wasteItem.item).join(' ').toLowerCase().includes(searchKey) ||
               // notes?.wasteItemList?.map(wasteItem => wasteItem.quantity).join(' ').toString().toLowerCase().includes(searchKey)
        );
        setBuyers(result);
    };

    const handleSearchArea = (e) => {
        setIsLoading(true)
        const searchKey = e.currentTarget.value;

        axios.get(`/viewAllBuyers`).then((res) => {
            if (res?.data?.success) {
                filterData(res?.data?.buyer, searchKey);
                setIsLoading(false)
            }
        });
    }
    return (
        <>
            {
                isLoading ?
                    <div className="seller-post-list-background">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="seller-post-list-background">
                            <h1>Error occured.</h1>
                        </div> :
                        <div className="buyer-list-background">
                            <div className="view-buyers">
            
           
                                <div class="seller-buyer-search-container">
                                    <form className="seller-search-buyer">
                                        <label className="serch-buyer-lable">Waste Type</label>
                                        <input type="text" placeholder="Search.." name="search" onChange={handleSearchArea} id="serchinput"></input>
                                        <label className="serch-buyer-lable">Waste Item</label>
                                        <input type="text" placeholder="Search.." name="search" id="serchinput"></input>
                                        <label className="serch-buyer-lable">Area</label>
                                        <input type="text" placeholder="Search.." name="search" id="serchinput"></input>
                                        <button className="seller-search-buyer-btn" type="submit" value="Search"></button>
                                    </form>
                                </div>
           
                            </div>
           
                            <div className="buyer-list">
                                <div className="buyer-list-header">
                                    <h2>Buyers</h2>
                                </div>
                                <div className="buyer-row">
                                    
                                        {buyers.map((buyer) => {
                                            return (
                                                <div className="buyer-column">
                                                    <div className="buyer-card">
                                                        <img src={buypic} alt="logo" />
                                                        <h1>{buyer.buyerName}</h1>
                                                        <p>{buyer.buyerAddress}</p>
                                                        <p>{buyer.buyerDescription}</p>
                                                        <h4>Rathings</h4>
                                                        <div className="ratings-star">
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                            <span className="fa fa-star checked"></span>
                                                        </div>
                                                        <div>
                                                        <Link style={{ textDecoration: 'none' }}
                                                                to={`/seller/buyer/${buyer.buyerId}`}>View Buyer <i
                                                                    className="fas fa-angle-double-right"></i></Link>
                                                        </div>
                                                        <div>
                                                        <Link style={{textDecoration: 'none' }}
                                                                to={`/seller/directpost/${buyer.buyerId}`}>Sell Now <i
                                                                    className="fas fa-angle-double-right"></i></Link>
                                                        </div>


                                                       
                                                    </div>
                    
                                                </div>
                                            );
                                        })}
                                        
                                </div>
                            </div>
                        </div>
                
            }
            </>
    )
}