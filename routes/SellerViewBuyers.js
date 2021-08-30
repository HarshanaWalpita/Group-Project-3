const BuyerDetails = require("../models/BuyerDetails.js");


const router = require("express").Router();

const { sellerViewBuyerDetails,
    sellerViewAllBuyers
} = require("../controllers/SellerViewBuyers.js");

router.get('/sellerViewBuyerDetails/:id', sellerViewBuyerDetails);
router.get('/viewAllBuyers', sellerViewAllBuyers);


module.exports = router;