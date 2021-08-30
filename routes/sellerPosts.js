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
    deletePendingSellerPost
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


module.exports = router;