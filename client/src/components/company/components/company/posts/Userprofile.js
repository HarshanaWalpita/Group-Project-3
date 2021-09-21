
import React, { useEffect,useState } from "react";
import '../../../../buyer/posts/Posts.css';
import axios from "axios";
import moment from "moment";
import {Link, useHistory} from "react-router-dom";
import emailjs from "emailjs-com";
import '../../../../buyer/posts/LoadingRing.css';
import './Userprofile.css';
import './Posts.css';

function UserProfile() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        getAllComments();
    }, []);

    const getAllComments = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/viewRateAndComment`)
            .then ((response)=>{
                const allNotes=response.data.existingComments;
                setComments(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(comments);

    const sellerComment = comments?.filter(sellerComment => sellerComment.commentAboutId===companyId);
    console.log(sellerComment);

    const [company, setCompany] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${companyId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setCompany(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(company);
    const companyEmail=company.email;
    const companyName=company.username;
    console.log(companyEmail);
    console.log(companyName);

    const [companyDetails, setCompanyDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`/getCompanyDetailsForCompany`)
            .then((response) => setCompanyDetails(response.data.existingCompany))
            .catch((err) => console.error(err));
    }, []);

    console.log(companyDetails);

    const oneCompany = companyDetails.filter(oneBuyer => oneBuyer.companyId === companyId);
    console.log(oneCompany);

    const history = useHistory();

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

    const deleteCompany = (id) => {
        axios.delete(`/deleteCompany/${id}`)
            .then((result) => {
                logoutHandler();
            });
    };

    const deleteCompanyDetails = (id) => {
        axios.delete(`/deleteCompanyDetails/${id}`)
            .then((result) => {
                //sendEmail();
                deleteCompany(companyId);
            });
    };

    const templateParams = {
        from_name: 'Zero-Waste',
        to_name: companyName,
        message: 'Your account deleted successfully! Thank you.',
        reply_to: 'zerowasteproject3@gmail.com',
        user_email:companyEmail,
        project_email:'zerowasteproject3@gmail.com'
    };

    const sendEmail = () => {
        emailjs.send('service_34ny3hp', 'template_91bru6e', templateParams, 'user_pzyBOo0Td3FLgOvuNU4mq')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    };

    return(
        <>
            {
                isLoading ?
                    <div className="posts-b">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="posts-b">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="posts-b">
                            <div className="posts__container-b">
                                <h1>Profile Details</h1>
                                <div className="seller-container-b">
                                    {oneCompany.map((com,index)=> (
                                        <ol className="list">
                                            <li ><span>Company Name: {com.companyName}</span></li>
                                            <li ><span>Company Address : {com.address}</span></li>
                                            <li ><span>Company Email : {companyEmail}</span></li>
                                            <li ><span>Waste Type: {com.wasteType}</span></li>
                                            <li ><span>Waste Item: {com.wasteItem}</span></li>
                                            <li ><span>Registered Date: {moment(com.CreatedAt).fromNow()}</span></li>
                                        </ol>
                                    ))}
                                </div>
                                <div className="all-items-button-b">
                                    {oneCompany.map((com,index)=> (
                                        <main className="grid-b">
                                            <article>
                                                <div className="text-c">
                                                    <div className="companylink-c">
                                                        <Link style={{color: '#fff', textDecoration: 'none'}}
                                                              to={`/company/companyratings/${com._id}`}
                                                        >Ratings <i className="fas fa-angle-double-right"></i></Link>
                                                    </div>
                                                </div>
                                            </article>
                                            <article>
                                                <div className="text-c">
                                                    <div className="companylink-c">
                                                        <Link style={{color: '#fff', textDecoration: 'none'}}
                                                              to={`/company/editprofile/${com._id}`}
                                                        >Edit Profile <i className="fas fa-edit"></i></Link>
                                                    </div>
                                                </div>
                                            </article>
                                            <article>
                                                <div className="text-c">
                                                    <div className="delete-button-c">
                                                        <button onClick={() => {
                                                            deleteCompanyDetails(com._id)
                                                        }}>Delete Profile <i className="fas fa-trash-alt"></i></button>
                                                    </div>
                                                </div>
                                            </article>
                                        </main>
                                    ))}
                                </div>
                            </div>
                        </div>
            }

        </>
    );
}

export default UserProfile;

