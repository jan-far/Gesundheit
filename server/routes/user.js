const express = require("express");
const router = express.Router();

const Auth = require("../middlewares/auth");
const { login, register, authenticate } = require("../controllers/user");
const { ValidateLogin, ValidateRegister } = require("../validation/user");

const {
  getSingleResult,
  getAllResults,
  saveResult,
  deleteSingleResult,
  deleteAllResult,
} = require("../controllers/result");

// POST - Login
router.post("/login", ValidateLogin, login);

// POST - Register
router.post("/register", ValidateRegister, register);

// GET - Authenticate Single User
router.get("/authenticate", Auth.hasToken, authenticate);

// GET - Single Result
router.get("/result", getSingleResult);

// GET - All Result
router.get("/results/:id", getAllResults);

// POST - Save Result
router.post("/result/save", saveResult);

// POST - Delete Result
router.post("/result/delete/", deleteSingleResult);

// POST - Delete All Result
router.post("/result/all/delete", deleteAllResult);

module.exports = router;
