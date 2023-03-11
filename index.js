console.log("HELLO");
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// ==================================================

const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "static")));
server.use(morgan("dev"));
server.use(cors());

// ==================================================

server.get("/status", (req, res) => {
  res.send("[GET] /status");
});

// ==================================================

const { v4: uuid } = require("uuid");
uuid();

server.get("/users", (req, res) => {
  res.status(200).send([
    { id: uuid(), name: "josh" },
    { id: uuid(), name: "steve" },
  ]);
});

// ==================================================

server.get("/", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "index.html"));
});

// ==================================================

server.get("*", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "404.html"));
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
