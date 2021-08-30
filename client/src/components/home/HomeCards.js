import React from 'react';
import './HomeCards.css';
import HomeCardItem from './HomeCardItem';

function HomeCards() {
    return (
        <div className='cards-b'>
            <h1>Our Services</h1>
            <div className='cards__container-b'>
                <div className='cards__wrapper-b'>
                    <ul className='cards__items-b'>
                        <HomeCardItem
                            src="images/waste_items.jpg"
                            text='If you are a seller then you can post about your waste items'
                            path='/seller/publicpost'
                        />
                        <HomeCardItem
                            src='images/homewasteitems.jpeg'
                            text='Buyers can search for waste items and give offers'
                            path='/buyer/viewcompanydetails'
                        />
                    </ul>
                    <ul className='cards__items-b'>
                        <HomeCardItem
                            src='images/view_post.jpg'
                            text='If you are a company then you can ask for large quantity of waste items'
                            label='Mystery'
                            path='/company/buyersinfo'
                        />
                        <HomeCardItem
                            src='images/accepted.jpg'
                            text='Accept or reject offers'
                            label='Adventure'
                            path='/seller'
                        />
                        <HomeCardItem
                            src='images/location.png'
                            text='View location of waste items'
                            label='Adrenaline'
                            path='/buyer/posts'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomeCards;