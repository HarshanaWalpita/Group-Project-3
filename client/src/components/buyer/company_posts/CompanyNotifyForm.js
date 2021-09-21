import React, {useEffect, useState} from "react";
import '../posts/Form.css';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Slide, toast, ToastContainer} from "react-toastify";
import emailjs from "emailjs-com";

function CompanyNotifyForms() {

    const { detailId, companyId } = useParams();
    console.log(detailId, companyId);

    const buyerId=(localStorage.getItem("userId"));
    const buyerName=(localStorage.getItem("userName"));
    console.log(buyerId, buyerName);

    const apiUrl = '/addBuyerNotifyCompany';
    const initialValues = {
        value: '',
        expiryDate: '',
        wasteType: '',
        wasteItem: '',
        quantity: '',
        deliveryDate:'',
        buyerId: '',
        companyListId: '',
        companyId: '',
        buyerName:''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    const submitForm = () => {
        const data = {
            value:formValues.value,
            expiryDate:formValues.expiryDate,
            wasteType:formValues.wasteType,
            wasteItem:formValues.wasteItem,
            quantity:formValues.quantity,
            deliveryDate:formValues.deliveryDate,
            buyerId:buyerId,
            companyListId:detailId,
            companyId:companyId,
            buyerName:buyerName
        };
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                sendEmail();
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
        const d3 = new Date(values.deliveryDate);
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
        if (!values.deliveryDate) {
            errors.deliveryDate = "Cannot be blank";
        }else if (d3<=date2) {
            errors.deliveryDate = "Delivery date should not be a past date.";
        }
        if (!values.quantity) {
            errors.quantity = "Cannot be blank";
        }else if (!regex.test(values.quantity)) {
            errors.quantity = "Invalid quantity format";
        }else if (values.quantity<=0) {
            errors.quantity = "Invalid quantity format";
        }
        if (!values.wasteType) {
            errors.wasteType = "Cannot be blank";
        }
        if (!values.wasteItem) {
            errors.wasteItem = "Cannot be blank";
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
            value: '',
            expiryDate: '',
            wasteType: '',
            wasteItem: '',
            quantity: '',
            deliveryDate:'',
            buyerId: '',
            companyListId: '',
            companyId: '',
            buyerName:''
        });
    };

    const toastNotification = () => {
        toast.info("You're notified company successfully !", {
            transition: Slide
        })
    };

    const [seller, setSeller] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${companyId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setSeller(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(seller);
    const sellerEmail=seller.email;
    const sellerName=seller.username;
    console.log(sellerEmail);
    console.log(sellerName);

    const templateParams = {
        from_name: 'Zero-Waste',
        to_name: sellerName,
        message: 'Your company has been notified about waste items by a buyer! Please visit our site for more details.',
        reply_to: 'zerowasteproject3@gmail.com',
        user_email:sellerEmail,
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
        <div className="forms-b">
            <div className="forms__container-b" >
                <br></br>
                <br></br>
                <br></br>
                <div className="container-b">
                    <div className="title-b">Notify Company</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Offer Value (Rs) (වටිනාකම)</span>
                                    <input type="text" name="value" id="value" placeholder="Enter value" value={formValues.value}
                                           onChange={handleChange}
                                           className={formErrors.value && "input-error"}></input>
                                    {formErrors.value && (
                                        <span className="error" style={{color:'red'}}>{formErrors.value}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Notification Expiry Date (කල්පිරෙන දිනය)</span>
                                    <input type="date" name="expiryDate" id="expiryDate" placeholder="Enter date" value={formValues.expiryDate}
                                           onChange={handleChange}
                                           className={formErrors.expiryDate && "input-error"}></input>
                                    {formErrors.expiryDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.expiryDate}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Type (වර්ගය)</span>
                                    <input type="text" name="wasteType" id="wasteType" placeholder="Enter waste type" value={formValues.wasteType}
                                           onChange={handleChange}
                                           className={formErrors.wasteType && "input-error"}></input>
                                    {formErrors.wasteType && (
                                        <span className="error" style={{color:'red'}}>{formErrors.wasteType}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Item (අයිතමය)</span>
                                    <input type="text" name="wasteItem" id="wasteItem" placeholder="Enter waste item" value={formValues.wasteItem}
                                           onChange={handleChange}
                                           className={formErrors.wasteItem && "input-error"}></input>
                                    {formErrors.wasteItem && (
                                        <span className="error" style={{color:'red'}}>{formErrors.wasteItem}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Quantity (Kg) (ප්රමාණය)</span>
                                    <input type="text" name="quantity" id="quantity" placeholder="Enter quantity" value={formValues.quantity}
                                           onChange={handleChange}
                                           className={formErrors.quantity && "input-error"}></input>
                                    {formErrors.quantity && (
                                        <span className="error" style={{color:'red'}} >{formErrors.quantity}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Waste Items Delivery Date (බෙදාහැරීමේ දිනය)</span>
                                    <input type="date" name="deliveryDate" id="deliveryDate" placeholder="Enter date" value={formValues.deliveryDate}
                                           onChange={handleChange}
                                           className={formErrors.deliveryDate && "input-error"}></input>
                                    {formErrors.deliveryDate && (
                                        <span className="error" style={{color:'red'}}>{formErrors.deliveryDate}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Notify Company"></input>
                                <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                            </div>
                        </form>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default CompanyNotifyForms;