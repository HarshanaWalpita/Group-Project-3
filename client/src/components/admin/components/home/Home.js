import React from 'react'
import './home.css'
import FeaturedInfo from './../featuredinfo/FeaturedInfo';
import Chart from '../chart/Chart';
import { userdata } from './Dummydata';
import WidgetLg from './../widgetsLg/WidgetLg';
import WidgetSm from './../widgetsSm/WidgetSm';
import Navbar from './../navbar/Navbar';
import Sidebar from './../sidebar/Sidebar';
import Footer from './../footer/Footer';


export default function Home() {
    return (
        <div> 
            <Navbar/>
                <div className="container">
                    <Sidebar/>
                    <div className='adminHome'>
                            <Chart data={userdata} title="Sales Done Through The Site" grid dataKey="Sales"/>
                        <div className="homeWidgets">
                                <WidgetSm/>
                                <WidgetLg/>
                        </div>
                    </div>
                </div>
            <Footer/>    
        </div>  
    )
}
