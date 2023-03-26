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

const carsRouter = require("./api/cars/cars-router");

server.use('/api/cars', carsRouter);

// ==================================================

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ==================================================

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

// ==================================================

server.use((error, req, res, next) => {
  console.log('error: ', error);
  const { status, message, err } = error;
  res.status(status).send({ message, err });
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // console.log(
  //   `*** server is running on: http://localhost:${PORT} locallly`
  //     .america
  // );
    console.log(
    `server is running`
      .blue
  );
});
