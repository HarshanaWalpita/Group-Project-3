const express = require("express");
const router = express.Router();
const getdirectPFromBuyer = require("../controllers/directPFromBuyer");

router.get('/getdirectPFromBuyer', getdirectPFromBuyer);

module.exports = router;