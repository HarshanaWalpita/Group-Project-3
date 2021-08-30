import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';
import AcceptedOffersList from './AcceptedOffersList';
import SellerSidebar from './Sidebar';

export default function ViewAcceptedOffers() {
    return (
        <>
            <Navbar />
            <SellerSidebar />
            <AcceptedOffersList />
            <Footer />
        </>
    )
}