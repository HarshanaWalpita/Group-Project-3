import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import '../../buyer/posts/Posts.css';
import axios from 'axios';

export default function ProfileDetails() {

    const history = useHistory();

    const viewEditProfile = () =>{
        history.push("/seller/editprofile");
    }
    const sellerId = (localStorage.getItem("userId"));
    const sellerName = (localStorage.getItem("userName"));
    const sellerEmail = (localStorage.getItem("userEmail"));
    console.log(sellerEmail)

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    const deleteUser = (id) => {
        axios.delete(`/deleteBuyer/${id}`)
            .then((result) => {
                logoutHandler();
            });
    };

    return (
        <div className="posts-b">
        <div className="posts__container-b">
            <h1>Profile Details</h1>
            <div className="seller-container-b">
                <ul className="list">
                        <li ><span>User Name: {sellerName}</span></li>
                   
                        <li ><span>Email: {sellerEmail}</span></li>
                   
                </ul>
            </div>
            <div className="all-items-button-b">
                
                    <button onClick={() => {
                        deleteUser(sellerId);
                    }
                        
                }>Delete Profile<i className="fas fa-angle-double-right"></i></button>
            </div>
        </div>
    </div>

    )
}