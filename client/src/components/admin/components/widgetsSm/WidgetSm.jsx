import React from 'react'
import './widgetSm.css'
import {Visibility} from "@material-ui/icons"

export default function WidgetSm() {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Members</span>
            <ul className="widegetSmList">

                <li className="widgetSmListitem">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2vHQRDe1veliFrYfwBIBIT-eXflDETxUgnnVgpXd1L1PYTT4skyxtkUzVDmuQ6JKkZWHyijWfMhuTw&usqp=CAU" alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Ruvidu Munasinghe</span>
                        <span className="widgetSmrole">Admin</span>
                    </div>
                    <button className="widgetSmbutton">
                        <Visibility className='widgetSmIcon'/>
                        Display

                    </button>
                </li>

                <li className="widgetSmListitem">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2vHQRDe1veliFrYfwBIBIT-eXflDETxUgnnVgpXd1L1PYTT4skyxtkUzVDmuQ6JKkZWHyijWfMhuTw&usqp=CAU" alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Ruvidu Munasinghe</span>
                        <span className="widgetSmrole">Admin</span>
                    </div>
                    <button className="widgetSmbutton">
                        <Visibility className='widgetSmIcon'/>
                        Display

                    </button>
                </li>

                <li className="widgetSmListitem">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2vHQRDe1veliFrYfwBIBIT-eXflDETxUgnnVgpXd1L1PYTT4skyxtkUzVDmuQ6JKkZWHyijWfMhuTw&usqp=CAU" alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Ruvidu Munasinghe</span>
                        <span className="widgetSmrole">Admin</span>
                    </div>
                    <button className="widgetSmbutton">
                        <Visibility className='widgetSmIcon'/>
                        Display

                    </button>
                </li>


            </ul>
        </div>
    )
}
