const express = require("express");
const router = express.Router();
const getDirectBuyerOffers = require("../controllers/directPFromBuyer");

router.get('/getDirectBuyerOffers', getDirectBuyerOffers);

module.exports = router;

