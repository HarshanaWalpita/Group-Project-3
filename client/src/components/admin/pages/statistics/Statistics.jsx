import React from 'react'
import './statistics.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useHistory } from 'react-router-dom';


const data01 = [
    { name: "Plastic", value: 400 },
    { name: "Glass", value: 300 },
    { name: "Paper", value: 300 },
    { name: "Organic", value: 200 }
];

export default function Statistics() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }
    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className='cc'>
                    <div className='featured'>
                        <div className="featuredItem">
                            <span className="featuredTitle">New Posts</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">15</span>
                                <span className="featuredMoneyrate"> -6<ArrowDownward className='featuredIcon negative' /></span>
                            </div>
                            <span className="featuredSub">Compared to last month</span>
                        </div>

                        <div className="featuredItem">
                            <span className="featuredTitle">Total Orders</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">22</span>
                                <span className="featuredMoneyrate"> +5<ArrowUpward className='featuredIcon' /></span>
                            </div>
                            <span className="featuredSub">Compared to last month</span>
                        </div>

                    </div>

                    <div className='fe_info'>
                        <div className="infoItem">
                            <span className="featuredTitle">Buyers Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">85</span>
                            </div>
                        </div>

                        <div className="infoItem">
                            <span className="featuredTitle">Companies Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">34</span>
                            </div>
                        </div>
                        <div className="infoItem">
                            <span className="featuredTitle">Sellers Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">65</span>
                            </div>
                        </div>

                    </div>
                    <div className='bb'>
                    <h3 className="chartTitle">Waste Type Selling Precentage</h3>
                        <PieChart width={400} height={350}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx={180}
                                cy={160}
                                outerRadius={120}
                                fill="#2E8B57"
                                label
                            />

                            <Tooltip />
                        </PieChart>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
