import React, {useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import '../../buyer/posts/Ratings.css';
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RateAndCommentArea = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const userName = (localStorage.getItem("userName"));
    const userId = (localStorage.getItem("userId"));

    const commentAboutId = props.userId;
    const commentAboutName = props.userName;
   // console.log(buyerId);
   // console.log(userName, userId);
    const apiUrl = '/addRateAndComment';
    const initialValues = {
        commenterName: '',
        commenterId: '',
        comment: '',
        rating: '',
        commentAboutName:'',
        commentAboutId: ''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitForm = () => {
        const data = {
            commenterName: userName,
            commenterId: userId,
            comment: formValues.comment,
            rating: rating,
            commentAboutName:commentAboutName,
            commentAboutId: commentAboutId
        };
        console.log(data);
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

        if (!values.comment){
            errors.comment = "Cannot be blank";
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
            commenterName: '',
            commenterId: '',
            comment: '',
            rating: '',
            commentAboutName:'',
            commentAboutId: ''
        });
    };

    const toastNotification = () => {
        toast.info("You're commented successfully !", {
            transition: Slide
        })
    };
    return (
        <div className="buyer-ratings">
            <h1 style={{ color: "#164A41" }}>Rate this user!</h1>
            <div className="buyer-ratings-2">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label>
                            <input style={{ visibility: 'hidden' }}
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                                className="star"
                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#808080"}
                                style={{ marginLeft: "5px" }}
                                size={30}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
                <form className="comment-form" onSubmit={handleSubmit} noValidate>
                    <input type="text" placeholder="Your Comment" name="comment" id="comment" className="comment-input" value={formValues.comment}
                        onChange={handleChange} />
                    <div className="comment-button-b">
                        <input type="submit" value="Submit"></input>
                        <ToastContainer position="top-right" toastStyle={{ backgroundColor: "green" }} autoClose={3000} />
                    </div>
                </form>
            </div>
        </div>
    );

    
}
export default RateAndCommentArea;