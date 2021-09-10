import React from 'react';
import * as FaIcons from 'react-icons/fa';


export const PostSidebarData = [
    {
        title: 'Add Post',
        path: '/company/companypost',
        icon: <FaIcons.FaCalendarPlus />,
        cName: 'nav-text-c'
    },

    {
        title: 'New Posts',
        path: '/company/previousp',
        icon: <FaIcons.FaClone />,
        cName: 'nav-text-c'
    },

    {
        title: 'Ongoing Posts',
        path: '/company/ongoingp',
        icon: <FaIcons.FaAudioDescription />,
        cName: 'nav-text-c'
    },

    {
        title: 'Accpeted Posts',
        path: '/company/acceptedp',
        icon: <FaIcons.FaCheckSquare />,
        cName: 'nav-text-c'
    },
    
    {
        title: 'Contact Buyers',
        path: '/company/buyersinfo',
        icon: <FaIcons.FaCommentDots />,
        cName: 'nav-text-c'
    },
];