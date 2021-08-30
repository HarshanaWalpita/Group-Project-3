import React, {useEffect, useState} from "react";
import './BuyerContact.css';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BuyerContact() {
    const buyerId  = useParams();
    console.log(buyerId);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const apiUrl = '/addContactBuyer';
    const initialValues = {
        wasteType: '',
        wasteItem: '',
        quantity: '',
        requiredDate: '',
        companyId: '',
        buyerListId:''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    const submitForm = () => {
        const data = {
            wasteType: formValues.wasteType,
            wasteItem: formValues.wasteItem,
            quantity: formValues.quantity,
            requiredDate: formValues.requiredDate,
            companyId: companyId,
            buyerListId: buyerId
        };
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                //sendEmail();
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

    const validate = (values) => {
        let errors = {};
        const regex = /^[0-9]+$/;
        if (!values.value) {
            errors.value = "Cannot be blank";
        }else if (!regex.test(values.value)) {
            errors.value = "Invalid value format";
        }else if (values.value<=0) {
            errors.value = "Invalid value format";
        }
        if (!values.wasteType) {
            errors.wasteType = "Cannot be blank";
        }if (!values.wasteItem) {
            errors.wasteItem = "Cannot be blank";
        }
        if (!values.quantity) {
            errors.quantity = "Cannot be blank";
        }else if (!regex.test(values.quantity)) {
            errors.quantity = "Invalid quantity format";
        }else if (values.quantity<=0) {
            errors.quantity = "Invalid quantity format";
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
            wasteType: '',
            wasteItem: '',
            quantity: '',
            requiredDate: '',
            companyId: '',
            buyerListId:''
        });
    };

    const toastNotification = () => {
        toast.info("Sent the query successfully !", {
            transition: Slide
        })
    };


    return(
        <div class="body-c">
            <div id="content1-c">
                <div className="image-c" id="image-c">
                    <img src="../../images/WCP.png" alt="" />
                </div> 
                <div className="buyer_contact-c" id="buyer_contact-c">
                    <h3 className="buyer_name-c">Tom Harris</h3><br></br>
                    <h4 className="buyer_email-c">wcp@gmail.com</h4><br></br>
                    <h4 className="buyer_mobile-c">011-1111111</h4><br></br>
                    <h4 className="buyer_address-c">Abc Rd, Colombo 07</h4><br></br>
                    <h4 className="buyer_collecting_area-c" >Colombo</h4>
                </div>
            </div>

            <div id="content2-c">
                <div className="forms__container-c" >
                    <div className="container-c">
                        <div className="title-c">Contact Buyer</div>
                        <div className="content-c">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="user-details-c">
                                    <div className="input-box-c">
                                        <span className="details-c">Waste Type</span>
                                        <input type="text" name="wasteType" id="wasteType" placeholder="Enter waste type" value={formValues.wasteType}
                                            onChange={handleChange}
                                            className={formErrors.wasteType && "input-error"}></input>
                                        {formErrors.wasteType && (
                                            <span className="error" style={{color:'red'}}>{formErrors.wasteType}</span>
                                        )}
                                    </div>
                                    <div className="input-box-c">
                                        <span className="details-c">Waste Item</span>
                                        <input type="text" name="wasteItem" id="wasteItem" placeholder="Enter waste item" value={formValues.wasteItem}
                                            onChange={handleChange}
                                            className={formErrors.wasteItem && "input-error"}></input>
                                        {formErrors.wasteItem && (
                                            <span className="error" style={{color:'red'}}>{formErrors.wasteItem}</span>
                                        )}
                                    </div>
                                    <div className="input-box-c">
                                        <span className="details-c">Amount</span>
                                        <input type="text" name="quantity" id="quantity" placeholder="Enter quantity" value={formValues.quantity}
                                            onChange={handleChange}
                                            className={formErrors.quantity && "input-error"}></input>
                                        {formErrors.quantity && (
                                            <span className="error" style={{color:'red'}}>{formErrors.quantity}</span>
                                        )}
                                    </div>
                                    <div className="input-box-c">
                                        <span className="details-c">Date</span>
                                        <input type="date" name="requiredDate" id="requiredDate" placeholder="Enter requiredDate" value={formValues.requiredDate}
                                            onChange={handleChange}
                                            className={formErrors.requiredDate && "input-error"}></input>
                                        {formErrors.requiredDate && (
                                            <span className="error" style={{color:'red'}}>{formErrors.requiredDate}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="button-c">
                                    <input type="submit" value="Send"></input>
                                    <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="content3-c">
                <h1>Reviews</h1>
                <div className="reviews_c">
                    <div className="reviews_header_c">
                        <h2>5.0/5.0</h2>
                        <div className="reviews_star_c">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <h3> | 1 review</h3><br></br>
                        </div>
                        <button className="reviews_button_c">Feedback</button>
                    </div>
                    <div className="reviews_body_c">
                        <div className="review_body_header_c">
                            <div className="review_body_header_image_c">
                                <img src="../../images/polythene.jpg" alt="" classsName="review_image_c"></img>
                            </div>
                            <div className="div_star-c">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <h3>by John Smith  on 20/07/2020</h3>
                        </div>
                        <div className="review_body-c">
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quas repellendus excepturi obcaecati sed et veritatis perferendis, ea, aspernatur dolore, minima quasi eligendi deserunt atque eum libero temporibus modi. Ex?</h4>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="reviews_body_c">
                        <div className="review_body_header_c">
                            <div className="review_body_header_image_c">
                                <img src="../../images/polythene.jpg" alt="" classsName="review_image_c"></img>
                            </div>
                            <div className="div_star-c">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <h3>by John Smith  on 20/07/2020</h3>
                        </div>
                        <div className="review_body-c">
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quas repellendus excepturi obcaecati sed et veritatis perferendis, ea, aspernatur dolore, minima quasi eligendi deserunt atque eum libero temporibus modi. Ex?</h4>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="reviews_body_c">
                        <div className="review_body_header_c">
                            <div className="review_body_header_image_c">
                                <img src="../../images/polythene.jpg" alt="" classsName="review_image_c"></img>
                            </div>
                            <div className="div_star-c">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <h3>by John Smith  on 20/07/2020</h3>
                        </div>
                        <div className="review_body-c">
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quas repellendus excepturi obcaecati sed et veritatis perferendis, ea, aspernatur dolore, minima quasi eligendi deserunt atque eum libero temporibus modi. Ex?</h4>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="reviews_body_c">
                        <div className="review_body_header_c">
                            <div className="review_body_header_image_c">
                                <img src="../../images/polythene.jpg" alt="" classsName="review_image_c"></img>
                            </div>
                            <div className="div_star-c">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <h3>by John Smith  on 20/07/2020</h3>
                        </div>
                        <div className="review_body-c">
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quas repellendus excepturi obcaecati sed et veritatis perferendis, ea, aspernatur dolore, minima quasi eligendi deserunt atque eum libero temporibus modi. Ex?</h4>
                            <br></br>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerContact;