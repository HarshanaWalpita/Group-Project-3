const express = require("express");
const router = express.Router();
const getdirectPFromBuyer = require("../controllers/companyNotifications");

router.get('/viewCompanyNotifications', viewCompanyNotifications);

module.exports = router;