require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// NEXT JS MODULES
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const config = require("./config");

const MONGO_URI = process.env.MONGO_URI;

nextApp.prepare().then(() => {
  let app = express();
  // Lets expres handle all server side (API) route client-side
  app = config(app);

  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log("DB connected")
  );

  // Lets next js handle any other route e.g client-side
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
