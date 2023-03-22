console.log("JOSH");
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

// server.use('/api/users', require('./api/users/users-routes'));

// ==================================================

const carsModel = require('./db/cars');
server.post('/api/cars', async (req, res) => {

  console.log('req.body: ', req.body);

  const car = req.body;
  // car: { name: String }
  if (car.name) {
    const results = await carsModel.createCar(car);
    const id = results[0];
    const cars = await carsModel.getAllCars();
    res.status(201).json({ message: `new car created with id: ${id}`, cars, id });
  } else {
    res.status(500).json({ message: 'name cannot be blank' });
  }

});

// ==================================================

server.get('/api/cars', async (req, res) => {
  const cars = await carsModel.getAllCars();
  res.status(200).json({ message: 'get cars: success UPDATE', cars });
  // res.status(200).json({ message: '[GET] /cars' });
});

// ==================================================

server.get('/api/cars/:id', async (req, res) => {
  const { id } = req.params;

  const car = await carsModel.getCar(id);
  if (car) {
    const message = `new car id: ${id}`;
    res.status(200).json({ message, car });
  }
  else {
    const message = `car not found for id: ${id}`;
    res.status(400).json({ message });
  }

});

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
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
