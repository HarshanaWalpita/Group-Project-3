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
                            src="../images/waste_items.jpg"
                            text='Search for Waste'
                            path='/buyer/posts'
                        />
                        <CardItem
                            src='../images/company.jpg'
                            text='Search for Companies'
                            path='/buyer/viewcompanydetails'
                        />
                    </ul>
                    <ul className='cards__items-b'>
                        <CardItem
                            src='../images/view_post.jpg'
                            text='View Posts'
                            label='Mystery'
                            path='/buyer/posts'
                        />
                        <CardItem
                            src='../images/accepted.jpg'
                            text='View Accepted Offers'
                            label='Adventure'
                            path='/buyer/acceptedoffers'
                        />
                        <CardItem
                            src='../images/pending_offers.jpg'
                            text='View Pending Offers'
                            label='Adrenaline'
                            path='/buyer/pendingoffers'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;