import React from 'react'
import "./sidebar.css"
import {LineStyle , Timeline , TrendingUp , People , Forum , Report , Business , AssignmentInd , PersonAdd, ListAlt} from "@material-ui/icons"
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/admin" className="link">
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon"/>
                                Home
                            </li>
                        </Link>   
                        <Link to="/admin/statistics" className="link">
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Statistics
                        </li>
                        </Link> 
                        
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon"/>
                            Review Complaints
                        </li>

                        <Link to="/admin/newUser" className="link">
                            <li className="sidebarListItem">
                                <PersonAdd className="sidebarIcon"/>
                                Add New User
                            </li>
                        </Link>    

                    </ul>    
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Users</h3>
                    <ul className="sidebarList">
                        <Link to="/admin/buyers" className="link">
                            <li className="sidebarListItem">
                                <People className="sidebarIcon"/>
                                Buyers
                            </li>
                        </Link>  

                        <Link to="/admin/sellers" className="link">
                            <li className="sidebarListItem">
                                <AssignmentInd className="sidebarIcon"/>
                                Sellers
                            </li>
                        </Link> 

                        <Link to="/admin/companies" className="link">
                        <li className="sidebarListItem">
                            <Business className="sidebarIcon"/>
                            Companies
                        </li>
                        </Link>
                    </ul>    
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                       
                        <li className="sidebarListItem">
                            <Forum className="sidebarIcon"/>
                            Messages
                        </li>

                        <li className="sidebarListItem">
                            <ListAlt className="sidebarIcon"/>
                            Newsfeed
                        </li>

                        <Link to="/admin/report" className="link">
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon"/>
                            Reports
                        </li>
                        </Link>
                    </ul>    
                </div>

               

            </div>
        </div>
    )
}
