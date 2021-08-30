import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { PostSidebarData } from './PostSidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function PostSidebar() {
    const [postsidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!postsidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars-c'>
                        <FaIcons.FaBars style={{color: '#164A41'}} onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={postsidebar ? 'nav-menu-c active' : 'nav-menu-c'}>
                    <ul className='nav-menu-items-c' onClick={showSidebar}>
                        <li className='navbar-toggle-c'>
                            <Link to='#' className='menu-bars-c'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {PostSidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default PostSidebar;