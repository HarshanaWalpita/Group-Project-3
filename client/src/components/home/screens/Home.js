import React from 'react';
import { useHistory } from "react-router-dom";

function Home() {

    const history = useHistory();

    const handleRoute = () =>{
        history.push("/login");
    }

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/home");
    };

    return (
        <>
            <h3>Home</h3>
            <button onClick={handleRoute}>Login</button>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
}

export default Home;