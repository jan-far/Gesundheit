const express = require("express");
const router = express.Router();

const user = require("./user");
const country = require("./country");
const assist = require("./assist");

router.use("/user", user);
router.use("/country", country);
router.use("/assist", assist);

module.exports = router;
