const Joi = require("@hapi/joi");
const User = require("../../models/User");

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    emailorusername: Joi.string().required(),
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
      .replace("emailorusername", "Email or Username")
      .replace("password", "Password")
      .trim();
    key = error.details[0].path[0];
    type = error.details[0].type;

    return res.json({ success: false, msg, key, type });
  }

  const { emailorusername, password } = req.body;

  // Find by username and/or Find by email
  const memberUsername = await User.findOne({
    username: emailorusername,
  });
  const memberEmail = await User.findOne({ email: emailorusername });

  // If user doesnt exist by email AND username - end/return error
  if (!memberUsername && !memberEmail) {
    msg = "User does not Exist";
    key = "emailorusername";
    type = "invalid.emailorusername";

    return res.json({ success: false, msg, key, type });
  }

  let member;
  if (memberUsername) member = memberUsername;
  if (memberEmail) member = memberEmail;

  if (!req.logInValue) req.logInValue = {};
  req.logInValue["body"] = value;
  req.logInValue["body"].member = member;

  next();
};

module.exports = loginValidation;
