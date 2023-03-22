const express = require('express');
const router = express.Router();

const carsModel = require('./cars-model');

// ==================================================

// [POST] /api/cars
const createCar = async (req, res) => {

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
const getAllCars = async (req, res) => {
  const cars = await carsModel.getAllCars();
  res.status(200).json({ message: 'cars retrieved', cars });
  // res.status(200).json({ message: '[GET] /cars' });
};

// ==================================================

// [GET] /api/cars/[id]
const getCarByID = async (req, res) => {
  const { id } = req.params;

  const car = await carsModel.getCar(id);
  if (car) {
    const message = `car retrieved up with id: ${id}`;
    res.status(200).json({ message, car });
  }
  else {
    const message = `car not found for id: ${id}`;
    res.status(400).json({ message });
  }
};

// ==================================================

// [PATCH] /api/cars/[id]
const updateCar = async (req, res) => {
  
  console.log('[PATCH] /api/cars/[id]]');
  
  const id = await carsModel.updateCar(req.params.id, req.body)
  console.log('id: ', id);

  const cars = await carsModel.getAllCars();
  console.log('updated cars: ', cars);

  const message = `car updated up with id: ${id}`;
  res.status(200).json({ message, cars, id });
};


// ==================================================

module.exports = {
  createCar,
  getAllCars,
  getCarByID,
  updateCar,
};