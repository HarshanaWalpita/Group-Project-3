import React from 'react';

import { Button } from '../Nav/Button';
import './HeroSection.css';

function HeroSection() {

    return (
        <div className='hero-container-seller'>
            <h1>Your Trash, Our Treasure</h1>
            <p>Are you looking to sell waste?</p>
            <div className='hero-btn-b'>
                <Button
                    className='btn-b'
                    buttonStyle='btn-b--outline'
                    buttonSize='btn-b--large'
                >
                    GET STARTED
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;