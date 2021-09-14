const { verify } = require("jsonwebtoken");
const { serverRuntimeConfig } = require("next/config").default();
const JWT_SECRET = serverRuntimeConfig.JWT_SECRET;
const User = require("../models/User");

module.exports = {
  hasToken: async (req, res, next) => {
    try {
      // Obtain authorization header from request
      const { authorization } = req.headers;

      // Throw error if authorization header is not present
      if (!authorization)
        return res.status(401).json({
          success: false,
          msg: "Authorization header must be present to access this resource.",
        });

      // Throw error if authorization header doesn't begin with 'Bearer' string
      if (!authorization.startsWith("Bearer"))
        return res.status(400).json({
          success: false,
          msg: "Authorization header must begin with 'Bearer'",
        });

      // Obtain token
      const token = authorization.substring(7, authorization.length);

      // Throw error if token is not present
      if (!token || token.trim().length === 0)
        return res.status(401).json({
          success: false,
          msg: "Token not present in authorization header",
        });

      // Variable to hold payload from token
      verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, msg: "token error" }); // Token has expired, has been tampered with, etc
        }
        // decoded undefined
        req.payload = decoded;

        try {
          const user = await User.findById(decoded.id);

          if (!user) {
            return res.status(401).json({
              success: false,
              msg: "User not found!",
            });
          }
          next();
        } catch (e) {
          return res.status(401).json({
            success: false,
            msg: "User not found!",
          });
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        msg: "internal server error",
      });
    }
  },
};
