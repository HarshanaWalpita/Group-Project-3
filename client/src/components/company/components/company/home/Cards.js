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
                            src='../images/add_post.png'
                            text='Add Posts'
                            path='/company/companypost'
                        />
                        <CardItem
                            src="../images/contact.jpg"
                            text='Contact Buyers'
                            path='/company/buyersinfo'
                        />
                    </ul>
                    <ul className='cards__items-b'>
                        <CardItem
                            src='../images/accepted_post.png'
                            text='Accepted Posts'
                            label='Mystery'
                            path='/company/acceptedp'
                        />
                        <CardItem
                            src='../images/ongoing_post.png'
                            text='Ongoing Posts'
                            label='Adventure'
                            path='/company/ongoingp'
                        />
                        <CardItem
                            src='../images/offers.jpg'
                            text='Direct Offers'
                            label='Adrenaline'
                            path='/company/directposts'
                        />
                       
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;