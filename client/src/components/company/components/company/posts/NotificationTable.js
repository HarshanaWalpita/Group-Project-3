import React, {useEffect, useState} from "react";
import './Notifications.css';
import axios from "axios";
import moment from "moment";
import '../../../../buyer/posts/LoadingRing.css';

function NotificationTable() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getAllNotes();
    }, []);

    const getAllNotes = async () => {
        setIsLoading(true)
        try{
        await axios.get(`/getNotifyDetailsForCompany`)
            .then ((response)=>{
                const allNotes=response.data.existingPosts;
                setNotes(allNotes);
                setIsLoading(false)
            })
        }catch (error) {
            console.error(`Error: ${error}`)
            setHasError(true)
        }
    }
    console.log(notes);

    const wasteItem = notes?.filter(wasteItem => wasteItem.companyId === companyId);
    console.log(wasteItem);

    return(
        <>
            {
                isLoading ?
                    <div className="n_content-c">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div> : hasError ?
                        <div className="n_content-c">
                            <h1>Error Occurred</h1>
                        </div> :
                        <div className="n_content-c">
                            <h1>Notifications</h1>
                            {wasteItem.map((note,index)=> (
                                <div className="n_wraper-c">
                                    <div className="notify_card-c">
                                        <div className="n_header-c">
                                            <h2>{index + 1} - {note.buyerName}</h2>
                                            <h3 id="timestamp-c">Notification Created : {moment(note.notificationCreatedAt).fromNow()}</h3>
                                        </div>
                                        <div className="massage-c">
                                            <p>You have a notification from a buyer that says he want to make offer for {note.wasteType} waste type and {note.wasteItem} waste item. The quantity of offer is {note.quantity} Kg and value is Rs. {note.value}.</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
            }

        </>
    );
}

export default NotificationTable;