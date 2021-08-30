import React from 'react';
import { useHistory } from "react-router-dom";
import PrivateScreen from "./PrivateScreen";

function Seller() {

    const history = useHistory();

    console.log(`${localStorage.getItem("authToken")}`);
    console.log(`${localStorage.getItem("usertype")}`);

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    return (
        <>
            <h3>Seller</h3>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
}

export default Seller;