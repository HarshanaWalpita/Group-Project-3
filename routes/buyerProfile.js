const BuyerDetails = require("../models/BuyerDetails.js");


const router = require("express").Router();

const { buyerAddDetails, buyerViewDetails } = require("../controllers/buyerProfile.js");

router.post('/buyerAddDetails', buyerAddDetails);
router.get('/buyerViewDetails/:id', buyerViewDetails);

module.exports = router;