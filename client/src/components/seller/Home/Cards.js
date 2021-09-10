import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
    return (
        <div className='cards-b'>
            <h1>Check out these Services!</h1>
            <div className='cards__container-b'>
                <div className='cards__wrapper-b'>
                    <ul className='cards__items-b'>
                        <CardItem
                            src="images/waste_items.jpg"
                            text='Make posts about any waste items'
                            path='seller/publicpost'
                        />
                        <CardItem
                            src='images/Fotolia_61034637_XS.jpg'
                            text='View your stats'
                            path='seller/stats'
                        />
                    </ul>
                    <ul className='cards__items-b'>
                        <CardItem
                            src='images/view_post.jpg'
                            text='View Posts'
                            label='Mystery'
                            path='seller/myposts'
                        />
                        <CardItem
                            src='images/accepted.jpg'
                            text='View Accepted Offers'
                            label='Adventure'
                            path='seller/acceptedoffers'
                        />
                        <CardItem
                            src='images/pending_offers.jpg'
                            text='View Pending Offers'
                            label='Adrenaline'
                            path='seller/viewposts'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;