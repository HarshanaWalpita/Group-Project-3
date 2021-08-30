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
        title: 'Ongoing Post',
        path: '/company/ongoingp',
        icon: <FaIcons.FaAudioDescription />,
        cName: 'nav-text-c'
    },

    {
        title: 'Accpeted Post',
        path: '/company/acceptedp',
        icon: <FaIcons.FaCheckSquare />,
        cName: 'nav-text-c'
    },

    {
        title: 'All Posts',
        path: '/company/previousp',
        icon: <FaIcons.FaClock />,
        cName: 'nav-text-c'
    },
    
    {
        title: 'Contact Buyers',
        path: '/company/buyersinfo',
        icon: <FaIcons.FaCommentDots />,
        cName: 'nav-text-c'
    },
];