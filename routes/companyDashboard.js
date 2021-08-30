const express = require("express");
const router = express.Router();

const { viewCompanyDashboard } = require("../controllers/companyDashboard");

router.post('/viewCompanyDashboard', viewCompanyDashboard);

module.exports = router;