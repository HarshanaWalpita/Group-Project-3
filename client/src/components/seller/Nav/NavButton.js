import React from 'react';
import './NavButton.css';
import { Link, useHistory } from 'react-router-dom';


export function Button() {

    const history = useHistory();

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };


    return (
        <Link to='/'>
            <button className='btn-nav-b'onClick={logoutHandler}>Sign Out <i className="fas fa-sign-out-alt"></i></button>
        </Link>
    );
}