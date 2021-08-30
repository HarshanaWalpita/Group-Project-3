const express = require("express");
const router = express.Router();
const { addRateAndComment, viewRateAndComment } = require("../controllers/rateAndComment");

router.post('/addRateAndComment', addRateAndComment);
router.get('/viewRateAndComment', viewRateAndComment );

module.exports = router;