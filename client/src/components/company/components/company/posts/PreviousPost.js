import React, {useEffect, useState} from "react";
import './Posts.css';
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../../../buyer/posts/LoadingRing.css';

function PreviousPost() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getCompanyPostsForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setNotes(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(notes);

    const wasteItem = notes?.filter(wasteItem => wasteItem.companyId===companyId);
    console.log(wasteItem);

    const toastNotification = () => {
        toast.info("Deleted successfully !", {
            transition: Slide
        })
    };

    const deletePost = (id) => {
        axios.delete(`/deleteCompanyPost/${id}`)
            .then((result) => {
                toastNotification();
                getAllNotes();
            });
    };

    return(
        <>
            {
                isLoading ?
                    <div className="posts-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="posts-c">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="posts-c">
                            <div className="posts__container-c">
                                <div className="title-c"><h1>All Post</h1></div>
                                <main className="grid-c">
                                    {wasteItem.map((note,index)=> (
                                        <article>
                                            <div className="text-c">
                                                <h3>Post ID: {index + 1}</h3>
                                                <p>Post Type: {note.postType}</p>
                                                <p>Waste Type: {note.wasteType}</p>
                                                <p>Waste Item: {note.item}</p>
                                                <p>Quantity: {note.quantity}</p>
                                                <p>Available Date: {moment(note.avbDate).fromNow()}</p>
                                                <div className="companylink-c">
                                                    <Link style={{color: '#fff', textDecoration: 'none'}}
                                                          to={`/company/companyeditpost/${note._id}`}>Edit Post <i className="fas fa-edit"></i></Link>
                                                </div>
                                                <div className="delete-button-c">
                                                    <button onClick={() => {
                                                        deletePost(note._id)
                                                    }}>Delete Post <i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </main>
                            </div>
                            <ToastContainer position="top-right" toastStyle={{ backgroundColor: "orange" }} autoClose={3000} />
                        </div>
            }

        </>
    );
}

export default PreviousPost;