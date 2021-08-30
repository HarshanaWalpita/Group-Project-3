const express = require("express");
const router = express.Router();
const { addComplaint } = require("../controllers/complaint");

router.post('/addComplaint', addComplaint );

module.exports = router;