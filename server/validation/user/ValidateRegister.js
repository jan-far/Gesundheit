const Joi = require("@hapi/joi");
const User = require("../../models/User");

const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate({ ...req.body });

  let msg = "";
  let key = "";
  let type = "";

  if (error) {
    msg = error.details[0].message
      .replace('"', "")
      .replace('"', "")
      .replace("fullname", "Fullname")
      .replace("email", "Email")
      .replace("username", "Username")
      .replace("password", "Password");

    key = error.details[0].path[0];
    type = error.details[0].type;

    return res.json({ success: false, msg, key, type });
  }

  try {
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

    if (!req.regValue) req.regValue = {};
    req.regValue["body"] = value;
    req.regValue["body"].email = req.regValue["body"].email.toLowerCase();

    next();
  } catch (e) {
    res.status(400).json({ msg: "Bad Request" });
  }
};

module.exports = registerValidation;
