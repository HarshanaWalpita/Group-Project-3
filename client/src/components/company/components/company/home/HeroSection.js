import React from 'react';
import '../../../../../App.css'
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {

    return (
        <div className='hero-container-c'>
            <h1>Your Trash, Our Treasure</h1>
            <p>Get connected with waste collectors</p>
            <div className='hero-btn-c'>
                <Button
                    className='btn-c'
                    buttonStyle='btn-c--outline'
                    buttonSize='btn-c--large'
                >
                    GET STARTED
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;