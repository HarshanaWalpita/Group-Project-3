const express = require("express");
const router = express.Router();

const { addCompanyHelp } = require("../controllers/companyHelp");

router.post('/addCompanyHelp', addCompanyHelp);

module.exports = router;