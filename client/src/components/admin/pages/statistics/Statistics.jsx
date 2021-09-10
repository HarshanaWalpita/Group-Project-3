import React, { useState , useEffect} from 'react'
import './statistics.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import axios from 'axios'


const data01 = [
    { name: "Plastic", value: 400 },
    { name: "Glass", value: 300 },
    { name: "Paper", value: 300 },
    { name: "Organic", value: 200 }
];

export default function Statistics() {

    const [buyers,setbuyers] = useState('')
    const [sellers,setsellers] = useState('')
    const [companies,setcompanies] = useState('')
    const [accSellers,setaccSellers] = useState('');
    const [accCompanies,setaccCompanies] = useState('');
    const [accOffers,setaccOffers] = useState('')
    const [allSellers,setallSellers] = useState('');
    const [allCompanies,setallCompanies] = useState('');
    const [allOffers,setallOffers] = useState('')

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }
    useEffect(()=>{
        axios.get('/api/adminBS/getofferedsellers').then(res=>{
            console.log(res.data.length)
            setaccSellers(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        axios.get('/api/adminBC/getofferedcompanies').then(res=>{
            console.log(res.data.length)
            setaccCompanies(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        if(accSellers != '' && accCompanies != ''){
            var x = accSellers+accCompanies;
            console.log(x)
            setaccOffers(x);
        }

    } , [accSellers,accCompanies])

    useEffect(()=>{
        axios.get('/api/adminBS/getallsellerposts').then(res=>{
            console.log(res.data.length)
            setallSellers(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        axios.get('/api/adminBC/getallcompanyposts').then(res=>{
            console.log(res.data.length)
            setallCompanies(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        if(allSellers != '' && allCompanies != ''){
            var y = allSellers+allCompanies;
            console.log(y)
            setallOffers(y);
        }

    } , [allSellers,allCompanies])




    useEffect(()=>{
        axios.get('/api/adminuser/getcompanies').then(res=>{
            console.log(res.data)
            setcompanies(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        axios.get('/api/adminuser/getbuyers').then(res=>{
            console.log(res.data)
            setbuyers(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    useEffect(()=>{
        axios.get('/api/adminuser/getsellers').then(res=>{
            console.log(res.data)
            setsellers(res.data.length)
        }).catch(err=>{
            console.log(err)
        })

    } , [])
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
                                <span className="featuredMoney">{allOffers}</span>
                                <span className="featuredMoneyrate"> -6<ArrowDownward className='featuredIcon negative' /></span>
                            </div>
                            <span className="featuredSub">Compared to last month</span>
                        </div>

                        <div className="featuredItem">
                            <span className="featuredTitle">Total Orders Accepted</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{accOffers}</span>
                                <span className="featuredMoneyrate"> +5<ArrowUpward className='featuredIcon' /></span>
                            </div>
                            <span className="featuredSub">Compared to last month</span>
                        </div>

                    </div>

                    <div className='fe_info'>
                        <div className="infoItem">
                            <span className="featuredTitle">Buyers Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{buyers}</span>
                            </div>
                        </div>

                        <div className="infoItem">
                            <span className="featuredTitle">Companies Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{companies}</span>
                            </div>
                        </div>
                        <div className="infoItem">
                            <span className="featuredTitle">Sellers Registered</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">{sellers}</span>
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
