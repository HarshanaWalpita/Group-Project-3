import React, {useState} from "react";
import { useHistory } from "react-router";
import EditPostForm from './EditPostForm';
import "./AddPost.css";
import Navbar from "../Nav/Navbar";
import Footer from "../Nav/Footer";
import { useDispatch } from 'react-redux';

export default function PostHome() {
    const [currentId, setCurrentId] = useState(0);
   
    
    const history = useHistory();

    if((!localStorage.getItem("authToken")) || !(localStorage.getItem("usertype")==="seller")){
        history.push("/");
    }

    

    const directPost = () => {
        history.push("/seller/findbuyers");
    }
    
   
    return (
        <div>
            <Navbar />
            <EditPostForm />
           <Footer />
        </div>
    )
}
