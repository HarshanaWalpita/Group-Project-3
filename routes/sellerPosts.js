const SellerPost = require("../models/SellerPost.js");
const BuyerOffers = require("../models/BuyerOffersForSeller.js");

const router = require("express").Router();


const { sellerAddPost,
    sellerViewPosts,
    sellerViewOffers,
    sellerViewAcceptedOffers,
    sellerViewOnePostDetails,
    sellerAcceptPostOffer,
    sellerDeclineOffer,
    sellerAcceptWasteItemOffer,
    deletePendingSellerPost,
    sellerUpdatePost,
    sellerViewPrvPost,
    sellerViewAllPosts,
    sellerViewAllOffers,
    viewItemOffers,
    sellerViewPrvOffers
} = require("../controllers/sellerPosts.js");

router.post('/sellerAddPost', sellerAddPost);
router.get('/sellerViewPosts/:id', sellerViewPosts);
router.get('/sellerViewOffers/:id', sellerViewOffers);
router.get('/sellerViewOnePost/:id', sellerViewOnePostDetails);
router.patch('/sellerAcceptPostOffer/:id', sellerAcceptPostOffer);
router.patch('/sellerDeclineOffer/:id', sellerDeclineOffer);
router.patch('/sellerAcceptWasteItemOffer/:id', sellerAcceptWasteItemOffer);
router.get('/sellerViewAcceptedOffers/:id', sellerViewAcceptedOffers);
router.delete('/deletePendingSellerPost/:id', deletePendingSellerPost);
router.patch('/sellerUpdatePost/:id', sellerUpdatePost);
router.get('/sellerViewPrvPost/:id', sellerViewPrvPost);
router.get('/viewAllPosts/:id', sellerViewAllPosts);
router.get('/viewAllOffers/:id', sellerViewAllOffers);
router.get('/viewItemOffers/:id', viewItemOffers);
router.get('/sellerViewPrvOffers/:id', sellerViewPrvOffers);


module.exports = router;