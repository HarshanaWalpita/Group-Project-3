import React from 'react';
import './HomeHeroSection.css';
import {Button} from "./HomeButton";

function HomeHeroSection() {

    return (
        <div className='hero-container-home'>
            <h1>Recycle,</h1>
            <p>It’s not hard to do, you can earn profit, reduce pollution and help the world too.</p>
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

export default HomeHeroSection;