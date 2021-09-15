require("dotenv").config();
const bcrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "48h" }
  );
}

function capitalizeName(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

let msg = "";
let key = "";
let type = "";

module.exports = {
  login: async (req, res, next) => {
    const { emailorusername, password, member } = req.logInValue.body;

    try {
      // Compare passwords
      const match = await bcrypt.compare(password, member.password);
      // If password does not match - end/return error
      if (!match) {
        msg = "Wrong credentials";
        key = "password";
        type = "invalid.password";

        return res.json({ success: false, msg, key, type });
      }

      // Generate new Token
      const token = generateToken(member);

      const user = {
        id: member._id,
        email: member.email,
        fullname: member.fullname,
        username: member.username,
      };

      res.json({ success: true, token, user });
    } catch (e) {
      const msg = "Connection Error";
      const key = "REGISTER";
      const type = "register";
      return res.json({ success: false, msg, key, type });
    }
  },

  register: async (req, res, next) => {
    const { fullname, username, email, password } = req.regValue.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const emailCheck = await User.findOne({ email: req.body.email });
      const usernameCheck = await User.findOne({ username: req.body.username });

      if (emailCheck) {
        msg = "Email already exist";
        key = "email";
        type = "invalid.email";
        return res.json({ success: false, msg, key, type });
      }

      if (usernameCheck) {
        msg = "Username already exist";
        key = "username";
        type = "invalid.username";
        return res.json({ success: false, msg, key, type });
      }

      // Create new Member
      const newUser = new User({
        fullname: capitalizeName(fullname),
        username,
        email,
        password: hashedPassword,
      });

      // Save new Member
      const member = await newUser.save();

      // Generate new Token
      const token = generateToken(member);

      const user = {
        id: member._id,
        email: member.email,
        fullname: member.fullname,
        username: member.username,
      };
      res.json({ success: true, token, user });
    } catch (e) {
      console.log(e);
      const msg = "Connection Error";
      const key = "REGISTER";
      const type = "register";
      return res.json({ success: false, msg, key, type });
    }
  },

  authenticate: async (req, res, next) => {
    const { id } = req.payload;
    try {
      const member = await User.findById(id);
      if (!member) {
        msg = "User does not exist";
        key = "user";
        type = "invalid.user";

        return res.status(400).json({ success: false, msg, key, type });
      }

      const user = {
        id: member._id,
        fullname: member.fullname,
        email: member.email,
        username: member.username,
      };

      res.json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
