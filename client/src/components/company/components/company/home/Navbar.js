import React, { useState } from 'react';
import { Button } from './NavButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const history = useHistory();

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    return (
        <>
            <nav className='navbar-b'>
                <Link to='/company' className='navbar-logo-b' onClick={closeMobileMenu}>
                    ZERO-WASTE
                    <i class='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon-b' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-b active' : 'nav-menu-b'}>
                    <li className='nav-item-b'>
                        <Link to='/company/companypost' className='nav-links-b' onClick={closeMobileMenu}>
                            Posts
                        </Link>
                    </li>  
                    <li className='nav-item-b'>
                        <Link to='/company/directposts' className='nav-links-b' onClick={closeMobileMenu}>
                            Offers
                        </Link>
                    </li>   
                    <li className='nav-item-b'>
                        <Link to='/company/notification' className='nav-links-b' onClick={closeMobileMenu}>
                            Notifications
                        </Link>
                    </li>
                    <li className='nav-item-b'>
                        <Link to='/company/profile' className='nav-links-b' onClick={closeMobileMenu}>
                            Account
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='nav-links-mobile-b'  onClick={logoutHandler}>
                            Sign Out <i className="fas fa-sign-out-alt"></i>
                        </Link>
                    </li>                
                </ul>
                <Button />
            </nav>
        </>
    );
}

export default Navbar;