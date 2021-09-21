import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Form.css';
import {useParams, useHistory} from "react-router-dom";
import {Slide, toast, ToastContainer} from "react-toastify";
import moment from 'moment';

function EditOfferForms() {

    const { postId } = useParams();
    console.log(postId);

    const initialValues = {
        value: '',
        expiryDate: '',
        collectingDate: '',
        collectingTime: ''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    useEffect(() => {
        const GetData = async () => {
            const result = await axios.get(`/buyerGetOneSellerOffer/${postId}`);
            setFormValues(result.data.oneOffer);
        };
        GetData();
    }, []);

    console.log(formValues);

    const submitForm = () => {
        const data = {
            value:formValues.value,
            expiryDate:formValues.expiryDate,
            collectingDate:formValues.collectingDate,
            collectingTime:formValues.collectingTime
        };
        axios.patch(`/editPendingSellerOffer/${postId}`, data)
            .then((result) => {
                clear();
                toastNotification();
                //history.push(`/buyer/viewpostdetails/${id}`);
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

    const date = new Date();
    date.setDate(date.getDate() + 28);

    const date2 = new Date();
    date2.setDate(date2.getDate());

    const validate = (values) => {
        let errors = {};
        const regex = /^[0-9]+$/;
        const d1 = new Date(values.expiryDate);
        const d3 = new Date(values.collectingDate);
        console.log(d1);
        if (!values.value) {
            errors.value = "Cannot be blank";
        }else if (!regex.test(values.value)) {
            errors.value = "Invalid value format";
        }else if (values.value<=0) {
            errors.value = "Invalid value format";
        }
        if (!values.expiryDate) {
            errors.expiryDate = "Cannot be blank";
        }else if (date<=d1) {
            errors.expiryDate = "Expiry date should not be longer than a month.";
        }else if (d1<=date2) {
            errors.expiryDate = "Expiry date should not be a past date.";
        }
        if (!values.collectingDate) {
            errors.collectingDate = "Cannot be blank";
        }else if (d3<=date2) {
            errors.collectingDate = "Collecting date should not be a past date.";
        }
        if (!values.collectingTime) {
            errors.collectingTime = "Cannot be blank";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [formErrors]);

    const d1 = new Date(formValues.expiryDate);
    console.log(d1);
    const d2 = moment(d1).format('YYYY-MM-DD');
    console.log(d2);
    const d3 = new Date(formValues.collectingDate);
    const d4 = moment(d3).format('YYYY-MM-DD');

    const clear = () => {
        setFormValues({
            value: '',
            expiryDate: '',
            collectingDate: '',
            collectingTime: '',
        });
    };

    const toastNotification = () => {
        toast.info("You're updated offer successfully !", {
            transition: Slide
        })
    };

    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="title-b">Edit Pending Offer</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Offer Value (Rs) (වටිනාකම)</span>
                                    <input type="text" placeholder="Enter value" name="value" id="value" value={formValues.value}
                                           onChange={handleChange}
                                           className={formErrors.value && "input-error"} ></input>
                                    {formErrors.value && (
                                        <span className="error" style={{color:'red'}}>{formErrors.value}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Offer Expiry Date (කල්පිරෙන දිනය)</span>
                                    <input type="date" placeholder="Enter date" name="expiryDate" id="expiryDate" value={d2}
                                           onChange={handleChange}
                                           className={formErrors.expiryDate && "input-error"}></input>
                                    {formErrors.expiryDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.expiryDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Date (එකතුකිරීමේ දිනය)</span>
                                    <input type="date" name="collectingDate" id="collectingDate" placeholder="Enter date" value={d4}
                                           onChange={handleChange}
                                           className={formErrors.collectingDate && "input-error"}></input>
                                    {formErrors.collectingDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Approximate Time (ආසන්න වේලාව)</span>
                                    <input type="time" name="collectingTime" id="collectingTime" placeholder="Enter time" value={formValues.collectingTime}
                                           onChange={handleChange}
                                           className={formErrors.collectingTime && "input-error"}></input>
                                    {formErrors.collectingTime && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingTime}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Edit Offer"></input>
                                <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditOfferForms;