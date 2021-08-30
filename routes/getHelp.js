const express = require("express");
const router = express.Router();
const { getHelp } = require("../controllers/getHelps");

router.post('/getHelp', getHelp );

module.exports = router;