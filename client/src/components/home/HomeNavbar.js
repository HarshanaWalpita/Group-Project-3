import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../buyer/home/Navbar.css';

function HomeNavbar() {
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
                <Link to='/' className='navbar-logo-b' onClick={closeMobileMenu}>
                    ZERO-WASTE
                    <i class='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon-b' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-b active' : 'nav-menu-b'}>
                    <li className='nav-item-b'>
                        <Link to='/register' className='nav-links-b' onClick={closeMobileMenu}>
                            <i className="fas fa-user-plus"></i> SIGN UP
                        </Link>
                    </li>
                    <li className='nav-item-b'>
                        <Link to='/login' className='nav-links-b' onClick={closeMobileMenu}>
                            <i className="fas fa-sign-in-alt"></i> SIGN IN
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default HomeNavbar;