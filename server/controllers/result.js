const User = require("../models/User");

const randomID = length => {
  var chars = "23456789abcdefghkmnpqrstuvwxyz".split(""); // o 0 1 i lare removed

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

module.exports = {
  getSingleResult: async (req, res, next) => {
    try {
      const { id, userID } = req.params;

      if (!userID || !id) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const user = await User.findById(userID);

      if (!user) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const result = user.results.filter(x => x.id === id);

      return res.status(201).json({ msg: "Success!", result });
    } catch (e) {
      return res.status(400).json({ msg: "Bad request" });
    }
  },

  getAllResults: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ msg: "Bad request" });
      }

      let data = user.results;
      data.reverse();
      return res.status(201).json({ msg: "Success!", results: data });
    } catch (e) {
      return res.status(400).json({ msg: "Bad request" });
    }
  },

  saveResult: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      if (!data || !id) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const results = [...user.results];
      if (results.length === 3) {
        results.shift();
      }

      results.push({ data });
      user.results = results;
      await user.save();

      return res.status(201).json({ msg: "Saved" });
    } catch (e) {
      return res.status(400).json({ msg: "Bad request" });
    }
  },

  deleteSingleResult: async (req, res, next) => {
    try {
      const { id, userID } = req.body;

      if (!userID || !id) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const user = await User.findById(userID);

      if (!user) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const results = user.results.filter(
        x => x._id.toString() !== id.toString()
      );
      user.results = results;

      await user.save();

      return res.status(201).json({ msg: "Deleted!" });
    } catch (e) {
      return res.status(400).json({ msg: "Bad request" });
    }
  },

  deleteAllResult: async (req, res, next) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "Bad request" });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ msg: "Bad request" });
      }

      user.results = [];

      await user.save();

      return res.status(201).json({ msg: "Deleted All!" });
    } catch (e) {
      return res.status(400).json({ msg: "Bad request" });
    }
  },
};
