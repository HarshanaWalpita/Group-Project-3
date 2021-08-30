import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';


export const SellerSidebarData = [


    {
        title: 'Profile',
        path: '/seller/profile',
        icon: <FaIcons.FaAdversal />,
        cName: 'nav-text'
    },
    {
        title: 'Notifications',
        path: '/seller/notification',
        icon: <MdIcons.MdLocalOffer />,
        cName: 'nav-text'
    },
    {
        title: 'Add Complain',
        path: '/seller/complaint',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Stats',
        path: '/seller/stats',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    
];