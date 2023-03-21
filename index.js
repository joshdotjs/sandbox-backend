console.log("HELLO");
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { v4: uuid } = require("uuid");

// ==================================================

const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "static")));
server.use(morgan("dev"));
server.use(cors());

// ==================================================

server.use('/api/users', require('./api/users/users-routes'));

// ==================================================

server.get("/", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "index.html"));
});

// ==================================================

const db = require('./db/cars');
server.post('/api/cars', async (req, res) => {
  const results = await db.createCar(req.body);
  const id = results[0];
  const cars = await db.getAllCars();
  res.status(201).json({ message: `create car: success - new car id: ${id}`, cars, id });
});

server.get('/api/cars', async (req, res) => {
  const cars = await db.getAllCars();
  res.status(200).json({ message: 'get cars: success', cars });
  // res.status(200).json({ message: '[GET] /cars' });
});

// ==================================================

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

// ==================================================

server.use((error, req, res, next) => {
  console.log('error: ', error);
  const { status, message, err } = error;
  res.status(status).send({ status, err });
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
