import React, { useEffect,useState } from 'react';
import { Button } from './NavButton';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useHistory } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    



  

    const companyId=(localStorage.getItem("userId"));
    console.log(companyId);

    const [company, setCompany] = useState({});

    useEffect(()=>{
        getOneSellerOrCompany();
    }, []);

    const getOneSellerOrCompany = async () => {
        try {
            const response = await axios.get(`/getOneSellerOrCompany/${companyId}`)
            console.log(response);
            const oneSellerOrCompany=response.data.oneSellerOrCompany;
            setCompany(oneSellerOrCompany);
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    console.log(company);
    const companyEmail=company.email;
    const companyName=company.username;
    console.log(companyEmail);
    console.log(companyName);

    const [companyDetails, setCompanyDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`/getCompanyDetailsForCompany`)
            .then((response) => setCompanyDetails(response.data.existingCompany))
            .catch((err) => console.error(err));
    }, []);

    console.log(companyDetails);

    const oneCompany = companyDetails.filter(oneBuyer => oneBuyer.companyId === companyId);
    console.log(oneCompany);

    const history = useHistory();

    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
        history.push("/");
    };

   

    

    return (
        <>
            <nav className='navbar-b'>
                <Link to='/company' className='navbar-logo-b' onClick={closeMobileMenu}>
                    ZERO-WASTE
                    <i class='fab fa-firstdraft' />
                </Link>
                <div className='menu-icon-b' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-b active' : 'nav-menu-b'}>
                {oneCompany.map((com,index)=> (
                    <li className='nav-item-b'>
                        <Link to='/company/profile' className='nav-links-b' onClick={closeMobileMenu}>
                            {com.companyName}
                        </Link>
                    </li>
                    ))}
                    <li className='nav-item-b'>
                        <Link to='/company/companypost' className='nav-links-b' onClick={closeMobileMenu}>
                            Posts
                        </Link>
                    </li>  
                    <li className='nav-item-b'>
                        <Link to='/company/directposts' className='nav-links-b' onClick={closeMobileMenu}>
                            Offers
                        </Link>
                    </li>   
                    <li className='nav-item-b'>
                        <Link to='/company/notification' className='nav-links-b' onClick={closeMobileMenu}>
                            Notifications
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='nav-links-mobile-b'  onClick={logoutHandler}>
                            Sign Out <i className="fas fa-sign-out-alt"></i>
                        </Link>
                    </li>                
                </ul>
                <Button />
            </nav>
        </>
    );
}

export default Navbar;