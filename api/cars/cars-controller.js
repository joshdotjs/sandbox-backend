const express = require('express');
const router = express.Router();

const carsModel = require('./cars-model');

// ==================================================

// [POST] /api/cars
const createCar = async (req, res) => {
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
};

// ==================================================

// [GET] /api/cars/[id]
const getCarByID = async (req, res) => {
  const { id } = req.params;

  const car = await carsModel.getCarByID(id);
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
  // console.log('[PATCH] /api/cars/[id]]');  

  const { id } = req.params;;
  const car = req.body;

  const did_update = await carsModel.updateCar(id, car);

  if (did_update) {
    const cars = await carsModel.getAllCars();
    const message = `car updated up with id: ${id}`;
    res.status(200).json({ message, cars, id });
  }
  else {
    const message = `car not found for id: ${id}`;
    res.status(400).json({ message });
  }

};

// ==================================================

const deleteCar = async (req, res) => {

  const { id } = req.params;

  const did_delete = await carsModel.deleteCar(id);
  console.log('did_delete: ', did_delete);

  if (did_delete) {
    const cars = await carsModel.getAllCars(); 
    const message = `car deleted with id: ${id}`;
    res.status(200).json({ message, cars, id });
  }
  else {
    const message = `car not found for id: ${id}`;
    res.status(400).json({ message });
  }
};

// ==================================================

module.exports = {
  createCar,
  getAllCars,
  getCarByID,
  updateCar,
  deleteCar,
};