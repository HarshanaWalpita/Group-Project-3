import React, { useState } from 'react'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { DeleteOutline, Email } from '@material-ui/icons';
import axios from 'axios'
import './reviewcomplaints.css'
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com'



export default function Reviewcomplaints() {

    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }

    const [complaints, setcomplaints] = useState([])

    useEffect(() => {
        axios.get('/api/admincomplaints/getcomplaints').then(res => {
            console.log(res.data)
            setcomplaints(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    
    function emailUser(username,email){
        emailjs.send('service_34ny3hp', 'template_91bru6e',
         {from_name: 'Zero-Waste',
         to_name: username,
         message: 'Your complaint has been recored and we will take necessary actions.Thank you.',
         reply_to: 'zerowasteproject3@gmail.com',
         user_email:email,
         project_email:'zerowasteproject3@gmail.com'},
          'user_pzyBOo0Td3FLgOvuNU4mq')
            .then(res =>{
                alert("Email has been sent")
                console.log('SUCCESS!', res.status, res.text);
            }).catch(err=>{
                console.log('FAILED...', err);
                alert("E-mail has not been send")
            })
    }

    function showus(us,em){
        alert("username = "+us )
    }

    const columns = [
        { field: 'userName', headerName: 'User', width: 150 },
        { field: 'complaintAbout', headerName: 'Complain About', width: 170 },
        {
            field: 'complaintDetails',
            headerName: 'Details',
            width: 200,
        },
        {
            field: "complaintCreatedAt",
            headerName: "Created At",
            width: 275,

        },
        {
            field: "userEmail",
            headerName: "Email",
            width: 220,

        },
        {
            field: "action",
            headerName: "Send an Email",
            width: 200,

            renderCell: (params) => {
                return (
                    <div className="revicons">
                       
                        <Email className="userlistemail" onClick={() => { if (window.confirm('Are you sure you wish to email this user?')) emailUser(params.row.userName,params.row.userEmail) } } />

                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <div>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <div className="reviewcomp">
                        <h1 className='headd'>View Complaints</h1>
                        <div className="revtable">
                            <DataGrid rows={complaints} disableSelectionOnClick
                                columns={columns}
                                getRowId={(row) => row._id}
                                pageSize={10}
                                autoHeight checkboxSelection
                            />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
