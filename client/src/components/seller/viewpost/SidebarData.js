import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';


export const SellerSidebarData = [


    {
        title: 'Available Posts',
        path: '/seller/viewposts',
        icon: <FaIcons.FaAdversal />,
        cName: 'nav-text'
    },
    {
        title: 'View Offers',
        path: '/seller/offers',
        icon: <MdIcons.MdLocalOffer />,
        cName: 'nav-text'
    },
    {
        title: 'Accepted Offers',
        path: '/seller/acceptedoffers',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Previous Posts',
        path: '/seller/previousposts',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    
];