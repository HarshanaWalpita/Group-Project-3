import React, { useState } from 'react'
import "./userreport.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export default function CompanyReport() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }

    const [id, setid] = useState(window.location.pathname.split("/")[3]);
    const [user, setuser] = useState('')
    const [companyoffers, setcompanyoffers] = useState([])

    useEffect(() => {
        axios.post('/api/adminBC/getcompanyoffers', { _id: id }).then(res => {
            console.log(res.data)
            setcompanyoffers(res.data)

        }).catch(err => {
            console.log(err)
        })
    }, [])

    function getUsername(userid, callback) {
        axios.post('/api/adminuser/getuserdata', { _id: userid }).then(res => {
            console.log(res.data)
            const userdata = res.data[0]
            setuser(userdata.username)

        }).catch(err => {
            console.log(err)
        })

        return user

    }
    const u1 = getUsername(id)



    const columns = [
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'buyerName', headerName: 'Buyer Name', width: 200 },
        {
            field: 'offerCreatedAt',
            headerName: 'Created Date',
            width: 300,
        },
        {
            field: "value",
            headerName: "Amount Rs.",
            width: 200,

        },
        {
            field: "status",
            headerName: "Status",
            width: 200,

        }
    ];

    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="transactions">
                    <h1 className="reportTitle">User Transactions</h1>
                    <div className="headingss">
                        <span className="hdr">{u1} - {id}</span>
                    </div>
                    <DataGrid rows={companyoffers} disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        autoHeight
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}
