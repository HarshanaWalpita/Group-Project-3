import React from "react";

const Popup = props => {
    return (
        <div className="popup-box-register">
            <div className="box-register">
                <span className="close-icon-register" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    );
};

export default Popup;