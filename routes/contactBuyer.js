const express = require("express");
const router = express.Router();

const { addContactBuyer } = require("../controllers/contactBuyer");

router.post('/addContactBuyer', addContactBuyer);

module.exports = router;