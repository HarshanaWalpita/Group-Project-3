import React, {useEffect, useState} from "react";
import './Form.css';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";

function AddComplaintPage() {

    const { buyerId } = useParams();
    console.log(buyerId);

    const [buyer, setBuyer] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${buyerId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setBuyer(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(buyer);
    console.log(buyer.username);
    console.log(buyer.email);

    const companyId=(localStorage.getItem("userId"));
    const companyName=(localStorage.getItem("userName"));
    const companyEmail=(localStorage.getItem("userEmail"));
    console.log(companyId, companyName, companyEmail);

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
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {
        const data = {
            complaintAboutUserId: buyerId,
            complaintAboutUserName: buyer.username,
            complaintAboutUserEmail: buyer.email,
            complaintDetails:formValues.complaintDetails,
            userId:companyId,
            userName:companyName,
            userEmail:companyEmail
        };
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                toastNotification();
            });
    };

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
            submitForm();
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

    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="container-b">
                    <div className="title-b">Add Complaints</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Complaint Details</span>
                                    <input type="text" name="complaintDetails" id="complaintDetails" placeholder="Enter details" value={formValues.complaintDetails}
                                           onChange={handleChange}
                                           className={formErrors.complaintDetails && "input-error"}></input>
                                    {formErrors.complaintDetails && (
                                        <span className="error" style={{color:'red'}}>{formErrors.complaintDetails}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Add Complaint"></input>
                                <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                            </div>
                        </form>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default AddComplaintPage;