import React from 'react';
import './App.css'
import BuyerHome from './components/buyer/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BuyerServices from './components/buyer/posts/Services';
import BuyerOfferForm from './components/buyer/posts/OfferForm';
import BuyerAOffers from './components/buyer/posts/AOffers';
import BuyerPOffers from './components/buyer/posts/POffers';
import BuyerEditPendingOffers from './components/buyer/posts/EditPendingOffers';
import BuyerCompanyPosts from "./components/buyer/company_posts/CompanyPosts";
import BuyerCompanyOfferForm from "./components/buyer/company_posts/CompanyOfferForm";
import BuyerCompanyAOffers from "./components/buyer/company_posts/CompanyAOffers";
import BuyerCompanyPOffers from "./components/buyer/company_posts/CompanyPOffers";
import BuyerEditCompanyPendingOffers from "./components/buyer/company_posts/EditCompanyPendingOffers";
import BuyerViewCompanyDetails from "./components/buyer/company_posts/ViewCompanyDetails";
import BuyerCompanyNotify from "./components/buyer/company_posts/CompanyNotify";
import BuyerPostsLocation from "./components/buyer/posts/PostsLocation";
import BuyerViewPostDetails from "./components/buyer/posts/ViewPostDetails";
import BuyerEditProfile from "./components/buyer/account/EditProfile";
import BuyerSingleOffers from "./components/buyer/posts/SingleOffers";
import BuyerViewOfferDetails from "./components/buyer/posts/ViewOffers";
import BuyerDirectPosts from "./components/buyer/posts/DirectPosts";
import BuyerCompanyDirectPosts from "./components/buyer/company_posts/CompanyDirectPosts";
import BuyerViewRatings from "./components/buyer/posts/ViewRatings";
import BuyerViewCompanyOffer from "./components/buyer/company_posts/ViewCompanyOffer";

import BuyerProfileDetails from "./components/buyer/account/ProfileDetails";
import BuyerViewProfile from './components/buyer/account/ViewProfile';
import BuyerRateAndComment from './components/buyer/account/RateAndComment';
import BuyerViewNotifications from './components/buyer/account/ViewNotifications';
import BuyerAddComplaints from './components/buyer/account/AddComplaints';
import BuyerViewStats from './components/buyer/account/ViewStats';

import Home from "./components/home/Home";
import LoginScreen from "./components/home/screens/LoginScreen";
import RegisterScreen from "./components/home/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/home/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/home/screens/ResetPasswordScreen";

import SellerHome from './components/seller/Home/Home';
import SellerAddPostDirect from './components/seller/Post/AddPostDirect';
import SellerAddPostPublic from './components/seller/Post/AddPostPublic';
import SellerMyPost from './components/seller/viewpost/Services';
import SellerProfile from './components/seller/Profile/SellerProfile';
import SellerBuyersHome from './components/seller/Buyers/SearchBuyerPage';
import SellerViewPost from './components/seller/viewpost/ViewPosts';
import SellerViewOnePost from './components/seller/viewpost/ViewPost';
import SellerViewBuyer from './components/seller/Buyers/ViewBuyer';
import SellerViewOffers from './components/seller/viewpost/ViewOffers';
import SellerPreviousPosts from './components/seller/viewpost/ViewPreviousPosts';
import SelllerAcceptedOffers from './components/seller/viewpost/ViewAcceptedOffers';
import SellerEditProfile from './components/seller/Profile/SellerEditProfile';
import SellerViewNotifications from './components/seller/Profile/SellerViewNotifications';
import SellerAddComplaint from './components/seller/Profile/AddComplaints';
import SellerViewStats from './components/seller/Profile/SellerViewStats';


import CompanyHome from './components/company/pages/Home';
import CompanyProfile from './components/company/pages/Profile';
import CompanyDashboard from './components/company/pages/Dashboard';
import CompanyHelpdesk from './components/company/pages/Helpdesk';
import CompanyPost from './components/company/pages/CompanyPost';
import CompanyOffersForPosts from './components/company/pages/OffersForPosts';
import CompanyEditProfile from './components/company/pages/EditProfile';
import CompanyDirectPosts from './components/company/pages/DirectPosts';
import CompanyNotification from './components/company/pages/Notification';
import CompanyOngoingP from './components/company/pages/OngoingP';
import CompanyPreviousP from './components/company/pages/PreviousP';
import CompanyAcceptedP from './components/company/pages/AcceptedP';
import CompanyBuyersInfo from './components/company/pages/BuyersInfo';
import CompanyBuyersContact from './components/company/pages/BuyersContact';
import CompanyGetCompanyDetails from "./components/company/components/company/home/GetCompanyDetails";
import CompanyBuyerDirectPost from "./components/company/pages/BuyerDirectPost";
import CompanyEditPost from "./components/company/pages/EditPost";
import CompanyViewAcceptedOffer from "./components/company/pages/ViewAcceptedOffer";
import CompanyAddComplaint from "./components/company/pages/AddComplaint";
import CompanyViewRating from "./components/company/pages/ViewRating";

import AdminHome from "./components/admin/components/home/Home";
import AdminUserlist from "./components/admin/pages/userlist/Userlist";
import AdminBuyer from "./components/admin/pages/userlist/AdminBuyer";
import AdminSeller from "./components/admin/pages/userlist/AdminSeller";
import AdminCompany from "./components/admin/pages/userlist/AdminCompany";
import AdminUser from "./components/admin/pages/user/User";
import AdminNewuser from './components/admin/pages/newuser/Newuser';
import AdminReport from './components/admin/pages/report/Report';
import AdminUserReport from './components/admin/pages/userreport/UserReport';
import AdminSalesReport from './components/admin/pages/report/SalesReport';
import AdminStatistics from './components/admin/pages/statistics/Statistics';


function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/buyer/home' exact component={BuyerHome} />
                    <Route path='/buyer/posts' component={BuyerServices} />
                    <Route path='/buyer/offerforms/:postId/:sellerId' component={BuyerOfferForm} />
                    <Route path='/buyer/acceptedoffers' component={BuyerAOffers} />
                    <Route path='/buyer/pendingoffers' component={BuyerPOffers} />
                    <Route path='/buyer/editpendingoffers/:postId' component={BuyerEditPendingOffers} />
                    <Route path='/buyer/companyposts' component={BuyerCompanyPosts} />
                    <Route path='/buyer/companyofferforms/:postId/:companyId' component={BuyerCompanyOfferForm} />
                    <Route path='/buyer/companyacceptedoffers' component={BuyerCompanyAOffers} />
                    <Route path='/buyer/companypendingoffers' component={BuyerCompanyPOffers} />
                    <Route path='/buyer/editcompanypendingoffers/:offerId/:companyId/:postId' component={BuyerEditCompanyPendingOffers} />
                    <Route path='/buyer/viewcompanydetails' component={BuyerViewCompanyDetails} />
                    <Route path='/buyer/notifyaboutwaste/:detailId/:companyId' component={BuyerCompanyNotify} />
                    <Route path='/buyer/location/:offerId' component={BuyerPostsLocation} />
                    <Route path='/buyer/viewpostdetails/:postId' component={BuyerViewPostDetails} />
                    <Route path='/buyer/editprofile/:detailId' component={BuyerEditProfile} />
                    <Route path='/buyer/singleoffers/:postId/:arrayId/:sellerId' component={BuyerSingleOffers} />
                    <Route path='/buyer/viewofferdetails/:offerId/' component={BuyerViewOfferDetails} />
                    <Route path='/buyer/directposts' component={BuyerDirectPosts} />
                    <Route path='/buyer/companydirectposts' component={BuyerCompanyDirectPosts} />
                    <Route path='/buyer/viewratings/:sellerId' component={BuyerViewRatings} />
                    <Route path='/buyer/viewcompanyofferdetails/:offerId/:companyId' component={BuyerViewCompanyOffer} />

                    <Route path='/buyer/vprofile' component={BuyerViewProfile} />
                    <Route path='/buyer/rcomment' component={BuyerRateAndComment} />
                    <Route path='/buyer/vnotifications' component={BuyerViewNotifications} />
                    <Route path='/buyer/addcomplaints/:sellerOrCompanyId' component={BuyerAddComplaints} />
                    <Route path='/buyer/viewstats' component={BuyerViewStats} />

                    <Route path='/buyer/profileDetails' component={BuyerProfileDetails} />
                    

                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/forgotpassword" component={ForgotPasswordScreen}/>
                    <Route path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>

                   

                    <Route path='/admin' exact component={AdminHome} />
                    <Route path='/admin/users' component={AdminUserlist} />
                    <Route path='/admin/user/:userid' component={AdminUser} />
                    <Route path='/admin/newuser' component={AdminNewuser} />
                    <Route path='/admin/report' component={AdminReport} />
                    <Route path='/admin/statistics' component={AdminStatistics} />

                    <Route path='/seller/publicpost' exact component={SellerAddPostPublic} />
                    <Route path='/seller/directpost' exact component={SellerAddPostDirect} />
                    <Route path='/seller/myposts' exact component={SellerMyPost} />
                    <Route path='/seller/viewposts' exact component={SellerViewPost} />
                    <Route path='/seller/buyer/:buyerId' exact component={SellerViewBuyer} />
                    <Route path='/seller/viewpost/:postId' component={SellerViewOnePost}/>
                    <Route path='/seller/findbuyers' exact component={SellerBuyersHome} />
                    <Route path='/seller/buyer' exact component={SellerViewBuyer} />
                    <Route path='/seller/profile' exact component={SellerProfile} />
                    <Route path='/seller' exact component={SellerHome} />
                    <Route path='/seller/offers' component={SellerViewOffers} />
                    <Route path='/seller/previousposts' component={SellerPreviousPosts} />
                    <Route path='/seller/acceptedoffers' component={SelllerAcceptedOffers} />
                    <Route path='/seller/editprofile' component={SellerEditProfile} />
                    <Route path='/seller/notification' component={SellerViewNotifications} />
                    <Route path='/seller/complaint' component={SellerAddComplaint} />
                    <Route path='/seller/stats' component={SellerViewStats} />


                    <Route path='/admin' exact component={AdminHome} />
                    <Route path='/admin/users' component={AdminUserlist} />
                    <Route path='/admin/buyers' component={AdminBuyer} />
                    <Route path='/admin/sellers' component={AdminSeller} />
                    <Route path='/admin/companies' component={AdminCompany} />
                    <Route path='/admin/user/:_id' component={AdminUser} />
                    <Route path='/admin/userreport/:_id' component={AdminUserReport} />
                    <Route path='/admin/newuser' component={AdminNewuser} />
                    <Route path='/admin/report' component={AdminReport} />
                    <Route path='/admin/statistics' component={AdminStatistics} />
                    <Route path='/admin/salesreport' component={AdminSalesReport} />


					<Route path='/company' exact component={CompanyHome} />
                    <Route path='/company/profile' component={CompanyProfile} />
                    <Route path='/company/dashboard' component={CompanyDashboard} />
                    <Route path='/company/helpdesk' component={CompanyHelpdesk} />
                    <Route path='/company/companypost' component={CompanyPost} />
                    <Route path='/company/offersforposts/:postId' component={CompanyOffersForPosts} />
                    <Route path='/company/editprofile/:postId' component={CompanyEditProfile} />
                    <Route path='/company/DirectPosts' component={CompanyDirectPosts} />
                    <Route path='/company/notification' component={CompanyNotification} />
                    <Route path='/company/ongoingp' component={CompanyOngoingP} />
                    <Route path='/company/previousp' component={CompanyPreviousP} />
                    <Route path='/company/acceptedp' component={CompanyAcceptedP} />
                    <Route path='/company/buyersinfo' component={CompanyBuyersInfo} />
                    <Route path='/company/buyerscontact' component={CompanyBuyersContact} />
                    <Route path='/company/getcompanydetails' component={CompanyGetCompanyDetails} />
                    <Route path='/company/buyerdirectpost/:buyerId' component={CompanyBuyerDirectPost} />
                    <Route path='/company/companyeditpost/:postId' component={CompanyEditPost} />
                    <Route path='/company/offersforacceptedposts/:postId' component={CompanyViewAcceptedOffer} />
                    <Route path='/company/addcomplaints/:buyerId' component={CompanyAddComplaint} />
                    <Route path='/company/viewbuyerratings/:buyerId' component={CompanyViewRating} />
                </Switch>
            </Router>
        </>
    );
}

export default App;