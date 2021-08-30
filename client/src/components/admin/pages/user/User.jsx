import { LocationSearching, Mail, MailOutline, PermIdentity, Person, PhoneAndroid, Publish } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./user.css"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect } from 'react';
import axios from 'axios'

export default function User() {

    const [_id,setid] = useState(window.location.pathname.split("/")[3]);

    const [username,setusername] = useState('')
    const [email,setemail] = useState('')
    const [role,setrole] = useState('')

    useEffect(()=>{
        axios.post('/api/adminuser/getuserdata' , {_id:_id}).then(res=>{
            console.log(res)

            const userdata = res.data[0]
            setusername(userdata.username)
            setemail(userdata.email)
            setrole(userdata.usertype)

        }).catch(err=>{
            console.log(err)
        })
    },[])

    function updateuser(){

        const updateduser = {
            username : username , 
            email : email ,
            _id : _id
        }

        axios.post('/api/adminuser/updateuser' , updateduser).then(res=>{
            console.log(res)
            alert(res.data)
        }).catch(err=>{
            console.log(err)
        })

    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className='user'>
                    <div className="userTitleContainer">
                        <h1 className="userTitle">Edit User</h1>
                    </div>
                    <div className="userContainer">
                        <div className="userShow">
                            <div className="userShowTop">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9l62Oh7haAVOSzvNyN-d-JSo0YmIzNm9ch-iXQZiYbqxrWr3WDF_nU9vU6WJqvTGl7-6HFiH0wtDqUg&usqp=CAU" alt="" className="userimg" />
                                <div className="title">
                                    <span className="name">{username}</span>
                                </div>
                            </div>
                            <div className="userShowBottom">
                                <span className="showTitle">Account Details</span>

                                <div className="userinfo">
                                    <PermIdentity className='icon' />
                                    <span className="use">{username}</span>
                                </div>
                                <div className="userinfo">
                                    <MailOutline className='icon' />
                                    <span className="use">{email}</span>
                                </div>
                                <div className="userinfo">
                                    <Person className='icon' />
                                    <span className="use">{role}</span>
                                </div>

                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="uTitle">Edit</span>
                            <form className="userform">
                                <div className="uleft">

                                    <div className="uitem">
                                        <label>Username</label>
                                        <input type="text" placeholder="Ruvidu" className='uinput'
                                        value={username} onChange={(e)=>{setusername(e.target.value)}} />
                                    </div>

                                    <div className="uitem">
                                        <label>E-mail</label>
                                        <input type="text" placeholder="Ruvidu@gmail.com" className='uinput'
                                        value={email} onCHange={(e)=>{setemail(e.target.value)}} />
                                    </div>

                                   


                                </div>
                            </form>
                            <button className="ubutton" onClick={updateuser}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
