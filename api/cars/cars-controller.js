const express = require('express');
const router = express.Router();

const carsModel = require('../../db/cars');

// ==================================================

// [POST] /api/cars
const postCars = async (req, res) => {

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

}

// ==================================================

// [GET] /api/cars
const getCars = async (req, res) => {
  const cars = await carsModel.getAllCars();
  res.status(200).json({ message: 'get cars: success UPDATE', cars });
  // res.status(200).json({ message: '[GET] /cars' });
};

// ==================================================

// [GET] /api/cars/[id]
const getCarByID = async (req, res) => {
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

};

// ==================================================

module.exports = {
  postCars,
  getCars,
  getCarByID,
};