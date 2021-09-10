import { useHistory } from 'react-router';
import React, { useState } from 'react';
import { Button } from './NavButton';
import { Link } from 'react-router-dom';


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
                <Link to='/seller' className='navbar-logo-b' onClick={closeMobileMenu}>
                    ZERO-WASTE
                    <i class='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon-b' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-b active' : 'nav-menu-b'}>
                    <li className='nav-item-b'>
                        <Link to='/seller' className='nav-links-b' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item-b'>
                        <Link to='/seller/publicpost' className='nav-links-b' onClick={closeMobileMenu}>
                            Add New Post
                        </Link>
                    </li>
                    <li className='nav-item-b'>
                        <Link to='/seller/myposts' className='nav-links-b' onClick={closeMobileMenu}>
                            View My Posts
                        </Link>
                    </li>
                    
                    <li className='nav-item-b'>
                        <Link to='/seller/findbuyers' className='nav-links-b' onClick={closeMobileMenu}>
                            Find Buyers
                        </Link>
                    </li>
                    <li className='nav-item-b'>
                        <Link to='/seller/profile' className='nav-links-b' onClick={closeMobileMenu}>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='nav-links-mobile-b' onClick={logoutHandler}>
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