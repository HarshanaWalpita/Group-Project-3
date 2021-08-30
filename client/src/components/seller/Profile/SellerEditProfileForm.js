import React from "react";
import '../../buyer/posts/Form.css';

function EditProfileForms() {

    return(
        <div className="forms-b">
            <div className="forms__container-b" >
                <div className="container-b">
                    <div className="title-b">Edit Profile</div>
                    <div className="content-b">
                        <form className="buyer-form-b" action="#">
                            <div className="user-details-b">
                                <div className="input-box-b">
                                    <span className="details-b">Name</span>
                                    <input type="text" placeholder="Enter Name" required></input>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Address</span>
                                    <input type="text" placeholder="Enter Address" required></input>
                                </div>
                                <div className="input-box-b">
                                    <span className="details-b">Telephone</span>
                                    <input type="text" placeholder="Enter Telephone" required></input>
                                </div>
                            </div>
                            <div className="button-b">
                                <input type="submit" value="Edit Profile"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileForms;