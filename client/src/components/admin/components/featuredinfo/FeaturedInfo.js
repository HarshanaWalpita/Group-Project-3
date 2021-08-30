import React from 'react'
import './featuredinfo.css'
import {ArrowDownward , ArrowUpward} from '@material-ui/icons'

export default function FeaturedInfo() {
    return (
        <div className='featured'> 


            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$5.00</span>
                    <span className="featuredMoneyrate"> -13.5<ArrowDownward className='featuredIcon negative'/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$8.00</span>
                    <span className="featuredMoneyrate"> -15.5<ArrowDownward className='featuredIcon negative'/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$10.00</span>
                    <span className="featuredMoneyrate"> +20.5<ArrowUpward className='featuredIcon'/></span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        
        </div>
    )
}
