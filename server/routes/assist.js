const express = require("express");
const router = express.Router();

const {
  getAllSubstances,
  calculateAssesment,
} = require("../controllers/assist");

// GET -  All Substances
router.get("/substance/all", getAllSubstances);

// POST - Calculate Assesment
router.post("/assesment/calculate", calculateAssesment);

module.exports = router;
