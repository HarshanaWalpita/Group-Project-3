import React from 'react';
import './HomeCards.css';
import HomePartnerCardItems from './HomePartnerCardItems';

function HomePartnerCards() {
    return (
        <div className='cards-b'>
            <h1>Our Partners</h1>
            <div className='cards__container-b'>
                <div className='cards__wrapper-b'>
                    <ul className='cards__items-b'>
                        <HomePartnerCardItems
                            src='images/seller.jpg'
                            text='Sellers : Householders who are looking to sell waste items'
                            label='Mystery'
                            path='/posts'
                        />
                        <HomePartnerCardItems
                            src='images/homebuyer.jpg'
                            text='Waste Collectors : Businessmen who are looking for buy waste items'
                            label='Adventure'
                            path='/acceptedoffers'
                        />
                        <HomePartnerCardItems
                            src='images/homecompany.jpg'
                            text='Recycle Company : Large organizations who are looking for buying large quantity of waste items'
                            label='Adrenaline'
                            path='/pendingoffers'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HomePartnerCards;