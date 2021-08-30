import {useHistory} from "react-router-dom";
import '../../buyer/posts/Posts.css';


export default function ProfileDetails() {

    const history = useHistory();

    const viewEditProfile = () =>{
        history.push("/seller/editprofile");
    }


    return (
        <div className="posts-b">
        <div className="posts__container-b">
            <h1>Profile Details</h1>
            <div className="seller-container-b">
                <ol className="list">
                    <li ><span>Seller Name: Frodo</span></li>
                    <li ><span>Address: Kinigama, Gampaha</span></li>
                    <li ><span>Email: frodo@gmail.com</span></li>
                    <li ><span>Mobile No: 0711409911</span></li>
                </ol>
            </div>
            <div className="all-items-button-b">
                <button onClick={viewEditProfile}>Edit Profile<i className="fas fa-angle-double-right"></i></button>
                <button >Delete Profile<i className="fas fa-angle-double-right"></i></button>
            </div>
        </div>
    </div>

    )
}