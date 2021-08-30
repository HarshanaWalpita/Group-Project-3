const express = require("express");
const router = express.Router();
const {
    getPosts,
    getOnePost,
    getCompanyPosts,
    getOneCompanyPost,
    getBuyerCompanyDetails,
    getOneSellerOrCompany,
    getBuyerDetails,
    deleteBuyer,
    deleteBuyerDetails
} = require("../controllers/buyerPosts");

router.get('/buyerPosts', getPosts);
router.get('/buyerGetOnePost/:id', getOnePost);
router.get('/buyerGetCompanyPosts', getCompanyPosts);
router.get('/buyerGetOneCompanyPost/:id', getOneCompanyPost);
router.get('/getBuyerCompanyDetails', getBuyerCompanyDetails);
router.get('/getOneSellerOrCompany/:id', getOneSellerOrCompany);
router.get('/getBuyerDetails', getBuyerDetails);
router.delete('/deleteBuyer/:id', deleteBuyer);
router.delete('/deleteBuyerDetails/:id', deleteBuyerDetails);

module.exports = router;