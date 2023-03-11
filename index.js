console.log("HELLO");
require("dotenv").config();
require("colors");
const path = require("path");

// ==================================================

const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "static")));

// ==================================================

server.get("/status", (req, res) => {
  res.send("[GET] /status");
});

// ==================================================

server.get("*", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "index.html"));
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
