const express = require("express");
const router = express.Router();

const { viewOffersForCompany } = require("../controllers/companyViewOffers");

router.get('/viewOffersForCompany', viewOffersForCompany);

module.exports = router;