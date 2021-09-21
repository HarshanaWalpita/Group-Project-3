import React, { useState } from 'react'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { useEffect } from 'react';
import { DeleteOutline, Email } from '@material-ui/icons';
import axios from 'axios'
import './messages.css'
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com'
import Popup from '../../components/popup/Popup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Messages() {

    const history = useHistory();
    if ((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype") === "admin")) {
        history.push("/");
    }

    const [open, setOpen] = React.useState(false);
    const [msg,setmsg] = useState('')
    const [usermail,setusermail] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [messages, setmessages] = useState([])

    useEffect(() => {
        axios.get('/api/adminmessages/getmessages').then(res => {
            console.log(res.data)
            setmessages(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function emailUser() {
        if(msg!="" && usermail!=""){
        emailjs.send('service_34ny3hp', 'template_91bru6e',
            {
                from_name: 'Zero-Waste',
                to_name: 'Customer',
                message: msg,
                reply_to: 'zerowasteproject3@gmail.com',
                user_email: usermail,
                project_email: 'zerowasteproject3@gmail.com'
            },
            'user_pzyBOo0Td3FLgOvuNU4mq')
            .then(res => {
                alert("Email has been sent")
                console.log('SUCCESS!', res.status, res.text);
            }).catch(err => {
                console.log('FAILED...', err);
                alert("E-mail has not been send")
            })
        }
    }

    const columns = [
        { field: 'userName', headerName: 'User', width: 180 },
        { field: 'message', headerName: 'Message', width: 500 },
        {
            field: "CreatedAt",
            headerName: "Created At",
            width: 275,

        },
        {
            field: "userEmail",
            headerName: "Email",
            width: 220,

        },
    ];

    return (
        <div>
            <div>
                <Navbar />
                <div className="container">
                    <Sidebar />
                    <div className="reviewcomp">
                        <h1 className='headm'>View Messages</h1>
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                Send Message
                            </Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Write the Message and the Email address to send an email to the user.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="message"
                                        label="Message"
                                        type="String"
                                        value={msg} onChange={(e)=>{setmsg(e.target.value)}}
                                        fullWidth
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        value={usermail} onChange={(e)=>{setusermail(e.target.value)}}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={emailUser} color="primary">
                                        Send
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className="revtable">
                            <DataGrid rows={messages} disableSelectionOnClick
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
