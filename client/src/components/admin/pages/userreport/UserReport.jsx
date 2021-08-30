import React, { useState } from 'react'
import "./userreport.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import axios from 'axios'

export default function UserReport() {

    const [id, setid] = useState(window.location.pathname.split("/")[3]);
    const [user, setuser] = useState('')
    const [selleroffers, setselleroffers] = useState([])

    useEffect(() => {
        axios.post('/api/adminBS/getuseroffers', { _id: id }).then(res => {
            console.log(res.data)
            setselleroffers(res.data)

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
        { field: 'sellerId', headerName: 'Seller ID', width: 300 },
        { field: 'buyerId', headerName: 'Buyer ID', width: 300 },
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
                    <DataGrid rows={selleroffers} disableSelectionOnClick
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
