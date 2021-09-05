import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import '../../buyer/posts/Form.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SellerComplaints() {

    const [complaint, setComplaint] = useState("");
    console.log(complaint);
    const { buyerId } = useParams();
    const [buyer, setBuyer] = useState({});
    const userId=(localStorage.getItem("userId"));
    const userName=(localStorage.getItem("userName"));
    const userEmail=(localStorage.getItem("userEmail"));
    const apiUrl = '/addComplaint';
    const initialValues = {
        complaintAboutUserId: '',
        complaintAboutUserName: '',
        complaintAboutUserEmail: '',
        complaintDetails: '',
        userId: '',
        userName: '',
        userEmail:''
    };
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);

    useEffect(() => {
        getDetails()
    },[])

    const getDetails =  async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${buyerId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setBuyer(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    const submitComplaint = () => {
        const data = {
            complaintAboutUserId: buyer._id,
            complaintAboutUserName: buyer.username,
            complaintAboutUserEmail: buyer.email,
            complaintDetails: formValues.complaintDetails,
            userId:userId,
            userName:userName,
            userEmail:userEmail
        };
        console.log(data);
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                toastNotification();
            });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    const validate = (values) => {
        let errors = {};

        if (!values.complaintDetails) {
            errors.complaintDetails = "Cannot be blank";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitComplaint();
        }
    }, [formErrors]);

    const clear = () => {
        setFormValues({
            complaintAboutUserId: '',
            complaintAboutUserName: '',
            complaintAboutUserEmail: '',
            complaintDetails: '',
            userId: '',
            userName: '',
            userEmail:''
        });
    };

    const toastNotification = () => {
        toast.info("You're added complaint successfully !", {
            transition: Slide
        })
    };

    
    console.log(buyer);
    return(
    <div className="forms-b">
        <div className="forms__container-b" >
            <div className="container-b">
                <div className="title-b">Add Complaints</div>
                <div className="content-b">
                    <form action="#">
                            <div className="user-details-b">
                            <div className="input-box-b">
                                    <span className="details-b">Buyer : {buyer.username}</span>
                                    
                            </div>
                            <div className="input-box-b">
                                <span className="details-b">Complainant</span>
                                    <input type="text"
                                        name="complaintDetails" id="complaintDetails"
                                       
                    
                                        onChange={handleChange}
                                        value={formValues.complaintDetails}
                                        className={formErrors.complaintDetails && "input-error"}>
                                    </input>
                                      {formErrors.complaintDetails && (
                                    <span className="error" style={{color:'red'}}>{formErrors.complaintDetails}</span>
                                )}
                            </div>
                        </div>
                        <div className="button-b">
                            <input type="submit" value="Add Complaint" onClick={handleSubmit}></input>
                                <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                                
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    );
}

