const express = require("express");
const cors = require("cors");
const router = require("../routes");

const config = app => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());

  app.use("/api", router);
  return app;
};

module.exports = config;
