const express = require("express");
const router = express.Router();

const { addCompanyDetails, viewCompanyDetails, editCompanyDetails, companyGetOneCompanyDetail } = require("../controllers/companyDetail");

router.post('/addCompanyDetails', addCompanyDetails);
router.post('/viewCompanyDetails', viewCompanyDetails);
router.patch('/editCompanyDetails/:id', editCompanyDetails);
router.get('/companyGetOneCompanyDetail/:id', companyGetOneCompanyDetail);

module.exports = router;