const express = require("express");
const router = express.Router();

const { addCompanyPost,
    getCompanyPostsForCompany,
    viewPendingCompanyOffersForCompany,
    getBuyerDetailsForCompany,
    deleteCompanyPost,
    editCompanyPost,
    companyGetOneCompanyPost,
    editCompanyOfferStatus,
    getNotifyDetailsForCompany,
    getCompanyDetailsForCompany,
    deleteCompanyDetails,
    deleteCompany
} = require("../controllers/companyPosts");

router.post('/addCompanyPost', addCompanyPost);
router.get('/getCompanyPostsForCompany', getCompanyPostsForCompany);
router.get('/viewPendingCompanyOffersForCompany', viewPendingCompanyOffersForCompany);
router.get('/getBuyerDetailsForCompany', getBuyerDetailsForCompany);
router.delete('/deleteCompanyPost/:id', deleteCompanyPost);
router.patch('/editCompanyPost/:id', editCompanyPost);
router.get('/companyGetOneCompanyPost/:id', companyGetOneCompanyPost);
router.patch('/editCompanyOfferStatus/:id', editCompanyOfferStatus);
router.get('/getNotifyDetailsForCompany', getNotifyDetailsForCompany);
router.get('/getCompanyDetailsForCompany', getCompanyDetailsForCompany);
router.delete('/deleteCompany/:id', deleteCompany);
router.delete('/deleteCompanyDetails/:id', deleteCompanyDetails);

module.exports = router;