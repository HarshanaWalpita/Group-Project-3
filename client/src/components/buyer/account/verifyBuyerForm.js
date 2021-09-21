import React, {useEffect, useState} from "react";
import '../posts/Form.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function VerifyBuyerForm() {

    const history = useHistory();

    const buyerId=(localStorage.getItem("userId"));
    const buyerOtp=(localStorage.getItem("userOTP"));
    console.log(buyerId, buyerOtp);

    const initialValues = {
        otp: '',
        accountStatus:''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {
        const data = {
            otp:formValues.otp,
            accountStatus:"Active"
        };
        axios.patch(`/verifyUserAccount/${buyerId}`, data)
            .then((result) => {
                clear();
                history.push(`/buyer/profileDetails`);
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

        if (!values.otp) {
            errors.otp = "Cannot be blank";
        }
        else if (buyerOtp!==values.otp) {
            errors.otp = "OTP is not match";
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
            otp: '',
            accountStatus:''
        });
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
                    <div className="title-b">Account Verification</div>
                    <div className="content-b">
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">One Time Password (මුරපදය)</span>
                                    <input type="text" name="otp" id="otp" placeholder="Enter otp" value={formValues.otp}
                                           onChange={handleChange}
                                           className={formErrors.otp && "input-error"}></input>
                                    {formErrors.otp && (
                                        <span className="error" style={{color:'red'}}>{formErrors.otp}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Verify Account"></input>
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

export default VerifyBuyerForm;