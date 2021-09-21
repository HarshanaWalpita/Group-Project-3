import React, {useEffect, useState} from "react";
import '../../../../buyer/posts/Form.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";

function GetCompanyDetailsForm() {

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const apiUrl = '/addCompanyDetails';
    const initialValues = {
        companyName:'',
        companyContact: '',
        address: '',
        wasteType: '',
        wasteItem: '',
        companyId: '',
        description:''
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    const submitForm = () => {
        const data = {
            companyName:formValues.companyName,
            companyContact:formValues.companyContact,
            address:formValues.address,
            wasteType:formValues.wasteType,
            wasteItem:formValues.wasteItem,
            companyId:companyId,
            description:formValues.description,
        };
        axios.post(apiUrl, data)
            .then((result) => {
                clear();
                history.push('/company');
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
        
        const len=values.description.length

        if (!values.companyName) {
            errors.companyName = "Cannot be blank";
        }
        if (!values.companyContact) {
            errors.companyContact = "Cannot be blank";
        }else if (!regex.test(values.companyContact)) {
            errors.companyContact = "Invalid value format";
        }
        if (!values.address) {
            errors.address = "Cannot be blank";
        }
        if (!values.wasteType) {
            errors.wasteType = "Cannot be blank";
        }
        if (!values.wasteItem) {
            errors.wasteItem = "Cannot be blank";
        }
        if (!values.description) {
            errors.description = "Cannot be blank";
        }
        else if(len>75) {
            errors.description = "You cannot add more than 75 characters";
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
            companyName:'',
            companyContact: '',
            address: '',
            wasteType: '',
            wasteItem: '',
            companyId: '',
            description:''
        });
    };

    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="content-b">
                        <div className="title-b">Company Details</div>
                        <form className="buyer-form-b" onSubmit={handleSubmit} noValidate>
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Company Name (නම)</span>
                                    <input type="text" name="companyName" id="companyName" placeholder="Enter name" value={formValues.companyName}
                                           onChange={handleChange}
                                           className={formErrors.companyName && "input-error"}></input>
                                    {formErrors.companyName && (
                                        <span className="error" style={{color:'red'}}>{formErrors.companyName}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Contact Number (ඇමතුම් අංකය)</span>
                                    <input type="text" name="companyContact" id="companyContact" placeholder="Enter contact number" value={formValues.companyContact}
                                           onChange={handleChange}
                                           className={formErrors.companyContact && "input-error"}></input>
                                    {formErrors.companyContact && (
                                        <span className="error" style={{color:'red'}}>{formErrors.companyContact}</span>
                                    )}
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Address (ලිපිනය)</span>
                                    <input type="text" name="address" id="address" placeholder="Enter address" value={formValues.address}
                                           onChange={handleChange}
                                           className={formErrors.address && "input-error"}></input>
                                    {formErrors.address && (
                                        <span className="error" style={{color:'red'}}>{formErrors.address}</span>
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
                                    <span className="details-b">Description (විස්තරය)</span>
                                    <input type="text" name="description" id="description" placeholder="Enter description" value={formValues.description}
                                           onChange={handleChange}
                                           className={formErrors.description && "input-error"}></input>
                                    {formErrors.description && (
                                        <span className="error" style={{color:'red'}}>{formErrors.description}</span>
                                    )}
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Save Details"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetCompanyDetailsForm;