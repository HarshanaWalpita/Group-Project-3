import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn-b--primary', 'btn-b--outline', 'btn-b--test'];

const SIZES = ['btn-b--medium', 'btn-b--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
})=>{
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <Link to='/posts' className='btn-b-mobile'>
            <button
            className={`btn-b ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
};