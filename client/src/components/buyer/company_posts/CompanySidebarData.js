import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { GiArrowsShield } from "react-icons/gi";

export const CompanySidebarData = [
    {
        title: 'View Company Posts',
        path: '/buyer/companyposts',
        icon: <FaIcons.FaAdversal />,
        cName: 'nav-text'
    },
    {
        title: 'Accepted Offers',
        path: '/buyer/companyacceptedoffers',
        icon: <MdIcons.MdLocalOffer />,
        cName: 'nav-text'
    },
    {
        title: 'Pending Offers',
        path: '/buyer/companypendingoffers',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Company Direct Posts',
        path: '/buyer/companydirectposts',
        icon: <GiArrowsShield />,
        cName: 'nav-text'
    },
    {
        title: 'Search Company',
        path: '/buyer/viewcompanydetails',
        icon: <IoIcons.IoIosSearch />,
        cName: 'nav-text'
    },
];