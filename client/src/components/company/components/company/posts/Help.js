import React, {useEffect, useState} from "react";
import './Help.css';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

function Help() {
	const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const apiUrl = '/addCompanyHelp';
    const initialValues = {
        choice: '',
        description: '',
        companyId: ''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const history = useHistory();

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        submitForm(searchKey);
    };

    const submitForm = (searchKey) => {
        const data = {
            choice:searchKey,
            description:formValues.description,
            companyId:companyId
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
        if (!values.value) {
            errors.value = "Cannot be blank";
        }
        if (!values.choice) {
            errors.choice = "Cannot be blank";
        }
        if (!values.description) {
            errors.description = "Cannot be blank";
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
            choice: '',
            description: '',
            companyId: ''
        });
    };

    const toastNotification = () => {
        toast.info("You submited the query successfully !", {
            transition: Slide
        })
    };


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

    const templateParams = {
        from_name: companyName,
        to_name: 'Zero-Waste',
        message: 'Query submitted',
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
    <div className="addpost_container-c">
    <div className="forms-c">
        <div className="forms__container-c" >
            <div className="container-c">
                <div className="content-c">
                    <div className="title-c">Help Desk</div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="user-details-c">
                            <div className="input-box-c">
                                <span className="details-c">Choice</span>
                                <select onChange={handleSearchArea}>
                                <option value="q0" disabled selected value> -- select an option -- </option>
									<option value="Incorrect/outdated information on a page.">I found incorrect/outdated information on a page.</option>
									<option value="Website is not working">The website is not working the way they should.</option>
									<option value="Feedback / Suggestions">I would like to give feedback / suggestions</option>
									<option value="Complaint">Complaint</option>
									<option value="Other">Other</option>
                            </select>
                            </div>
                            <div className="input-box-c">
                            <span className="details-b">Description</span>
                            <input type="text" name="description" id="description" placeholder="Enter description" value={formValues.description}
                                   onChange={handleChange}
                                   className={formErrors.description && "input-error"}></input>
                            {formErrors.description && (
                                <span className="error" style={{color:'red'}}>{formErrors.description}</span>
                            )}
                            </div>
                        </div>
                        <div className="button-c">
                            <input type="submit" value="Send"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>       
    );
}

export default Help;