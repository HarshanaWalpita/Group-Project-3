import React, {useEffect, useState} from "react";
import '../posts/Form.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {Slide, toast, ToastContainer} from "react-toastify";

function EditCompanyOfferForms() {

    const { offerId, companyId, postId } = useParams();
    console.log(offerId, companyId, postId);

    const [offers, setOffers] = useState([]);

    useEffect(()=>{
        getAllOffers();
    }, []);

    const getAllOffers = async () => {
        await axios.get(`/viewPendingCompanyOffers`)
            .then ((response)=>{
                const allNotes=response.data.existingOffers;
                setOffers(allNotes);
            })
            .catch(error=>console.error(`Error: ${error}`));
    }
    console.log(offers);

    const wasteItem = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId);
    console.log(wasteItem);

    const wasteItem2 = offers?.filter(wasteItem => wasteItem.status==='accepted' && wasteItem.companyId===companyId && wasteItem.postId===postId);
    console.log(wasteItem2);

    const wasteItemLength = wasteItem2.length;
    console.log(wasteItemLength);

    let quantity=0;

    for (let i = 0; i < wasteItemLength; i++) {
        quantity += wasteItem2[i].quantity
    }

    console.log(quantity);

    const [posts, setPosts] = useState({});

    const userName=(localStorage.getItem("userName"));
    const userEmail=(localStorage.getItem("userEmail"));
    console.log(userName);
    console.log(userEmail);

    useEffect(()=>{
        getOnePost();
    }, []);

    const getOnePost = async () => {
        try {
            const response = await axios.get(`/buyerGetOneCompanyPost/${postId}`)
            console.log(response);
            const allPost=response.data.onePost;
            setPosts(allPost);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(posts);

    const initialValues = {
        value: '',
        expiryDate: '',
        collectingDate: '',
        collectingTime: '',
        quantity: '',
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    useEffect(() => {
        const GetData = async () => {
            const result = await axios.get(`/buyerGetOneCompanyOffer/${offerId}`);
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
            collectingTime:formValues.collectingTime,
            quantity:formValues.quantity,
        };
        axios.patch(`/editPendingCompanyOffer/${offerId}`, data)
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

    const newQuantity= posts?.quantity - quantity;
    console.log(newQuantity);

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
        if (!values.quantity) {
            errors.quantity = "Cannot be blank";
        }else if (!regex.test(values.quantity)) {
            errors.quantity = "Invalid quantity format";
        }else if (values.quantity<=0) {
            errors.quantity = "Invalid quantity format";
        }else if (newQuantity<values.quantity) {
            errors.quantity = "You can not add more than post's quantity";
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
            quantity: '',
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
                    <div className="title-b">Edit Company Pending Offer</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Offer Value (Rs)</span>
                                    <input type="text" placeholder="Enter value" name="value" id="value" value={formValues.value}
                                           onChange={handleChange}
                                           className={formErrors.value && "input-error"} ></input>
                                    {formErrors.value && (
                                        <span className="error" style={{color:'red'}}>{formErrors.value}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Expiry Date</span>
                                    <input type="date" placeholder="Enter date" name="expiryDate" id="expiryDate" value={d2}
                                           onChange={handleChange}
                                           className={formErrors.expiryDate && "input-error"}></input>
                                    {formErrors.expiryDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.expiryDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Date</span>
                                    <input type="date" name="collectingDate" id="collectingDate" placeholder="Enter date" value={d4}
                                           onChange={handleChange}
                                           className={formErrors.collectingDate && "input-error"}></input>
                                    {formErrors.collectingDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Collecting Approximate Time</span>
                                    <input type="time" name="collectingTime" id="collectingTime" placeholder="Enter time" value={formValues.collectingTime}
                                           onChange={handleChange}
                                           className={formErrors.collectingTime && "input-error"}></input>
                                    {formErrors.collectingTime && (
                                        <span className="error" style={{color:'red'}}>{formErrors.collectingTime}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Quantity (Kg) [Available Quantity - {newQuantity} Kg]</span>
                                    <input type="text" placeholder="Enter quantity" name="quantity" id="quantity" value={formValues.quantity}
                                           onChange={handleChange}
                                           className={formErrors.quantity && "input-error"}></input>
                                    {formErrors.quantity && (
                                        <span className="error" style={{color:'red'}} >{formErrors.quantity}</span>
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

export default EditCompanyOfferForms;