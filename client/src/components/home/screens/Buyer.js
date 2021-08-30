import React from 'react';
import { useHistory } from "react-router-dom";
import PrivateScreen from "./PrivateScreen";

function Buyer() {

    const history = useHistory();

    console.log(`${localStorage.getItem("authToken")}`);
    console.log(`${localStorage.getItem("data.usertype")}`);

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="buyer")){
        history.push("/");
    }

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    return (
        <>
            <h3>Buyer</h3>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
}

export default Buyer;

