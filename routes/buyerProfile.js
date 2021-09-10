const BuyerDetails = require("../models/BuyerDetails.js");


const router = require("express").Router();

const { buyerAddDetails, buyerViewDetails, buyerUpdateDetails } = require("../controllers/buyerProfile.js");

router.post('/buyerAddDetails', buyerAddDetails);
router.get('/buyerViewDetails/:id', buyerViewDetails);
router.patch('/buyerUpdateDetails/:id', buyerUpdateDetails);

module.exports = router;