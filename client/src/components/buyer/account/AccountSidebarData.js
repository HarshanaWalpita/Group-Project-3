import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { FaAddressCard, FaChartBar, FaCheckSquare, FaCommentDots } from "react-icons/fa";

export const AccountSidebarData = [
    {
        title: 'View Profile',
        path: '/buyer/vprofile',
        icon: <FaAddressCard />,
        cName: 'nav-text'
    },
    {
        title: 'View Notifications',
        path: '/buyer/vnotifications',
        icon: <FaCommentDots />,
        cName: 'nav-text'
    },
    {
        title: 'View Stats',
        path: '/buyer/viewstats',
        icon: <FaChartBar />,
        cName: 'nav-text'
    },
];