import React, {useEffect, useState} from "react";
import './Footer.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Slide, toast, ToastContainer} from "react-toastify";

function Footer() {

    const userName=(localStorage.getItem("userName"));
    const userEmail=(localStorage.getItem("userEmail"));
    console.log(userName);
    console.log(userEmail);

    const apiUrl = '/getHelp';
    const initialValues = {
        message: '',
        userName: '',
        userEmail: ''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {
        const data = {
            message:formValues.message,
            userName:userName,
            userEmail:userEmail
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

        if (!values.message) {
            errors.message = "Cannot be blank";
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
            message: '',
            userName: '',
            userEmail: ''
        });
    };

    const toastNotification = () => {
        toast.info("You're added help successfully, you will be replied soon!", {
            transition: Slide
        })
    };

    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Do You Need Any Help!
                </p>
                <p className='footer-subscription-text'>
                    Leave us a message.
                </p>
                <div className='input-areas'>
                    <form onSubmit={handleSubmit} noValidate>
                        <input
                            className='footer-input'
                            name='message'
                            id='message'
                            type='text'
                            placeholder='Your Message'
                            value={formValues.message}
                            onChange={handleChange}
                        />
                        <div className="footer-button-b">
                        <input type="submit" value="Send"></input>
                        <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                    </div>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <h4>Largest Waste Buying and Selling Platform in Sri Lanka</h4>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <h4>zerowaste@gmail.com</h4>
                        <h4>0112690247</h4>
                        <h4>0777140991</h4>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            ZERO-WASTE
                            <i className='fab fa-firstdraft' />
                        </Link>
                    </div>
                    <small className='website-rights'>ZERO-WASTE © 2021</small>
                    <div className='social-icons'>
                        <Link
                            class='social-icon-link facebook'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i className='fab fa-facebook-f' />
                        </Link>
                        <Link
                            class='social-icon-link instagram'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <i className='fab fa-instagram' />
                        </Link>
                        <Link
                            class='social-icon-link youtube'
                            to='/'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i className='fab fa-youtube' />
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i className='fab fa-twitter' />
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i className='fab fa-linkedin' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;