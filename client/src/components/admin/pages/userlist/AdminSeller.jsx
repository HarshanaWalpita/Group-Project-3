import React, { useEffect, useState } from 'react'
import './userlist.css'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline,Assessment } from '@material-ui/icons';
import {Link, useHistory} from 'react-router-dom'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';


export default function Userlist() {
    const history = useHistory();
    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="admin")){
        history.push("/");
    }

    const [tdata, settdata] = useState([])

    useEffect(()=>{
        axios.get('/api/adminuser/getsellers').then(res=>{
            console.log(res.data)
            settdata(res.data)
        }).catch(err=>{
            console.log(err)
        })

    } , [])

    function deleteuser(_id){
        axios.post('/api/adminuser/deleteuser' , {_id:_id}).then(res=>{
            alert(res.data)
            history.go(0)
        }).catch(err=>{
            console.log(err)
        })
    }

    const columns = [
        { field: 'username', headerName: 'Username', width: 250 },
        { field: 'email', headerName: 'E-mail', width: 300 },
        {
            field: 'usertype',
            headerName: 'Role',
            width: 200,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="ticons">
                        <Link to={"/admin/user/" + params.row._id}>
                            <button className="userlistEdit">Edit</button>
                        </Link>

                        <DeleteOutline className="userlistDelete" onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) deleteuser(params.row._id) } } />

                        <Link to={"/admin/userreport/" + params.row._id}>
                            <Assessment className="userlistreport" />
                        </Link>
                    </div>
                )
            }
        }
    ];

    return (
        <div>
        <Navbar/>
        <div className="container">
            <Sidebar/>
        <div className='userList'>
            <DataGrid rows={tdata} disableSelectionOnClick 
            columns={columns}
            getRowId={(row) => row._id}
             pageSize={9} checkboxSelection />
        </div>
        </div>
        <Footer/>
        </div>
    )
}
