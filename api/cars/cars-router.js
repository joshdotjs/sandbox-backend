const express = require('express');
const router = express.Router();

const carsModel = require('../../db/cars');

const controller = require('./cars-controller');

// ==================================================

// [POST] /api/cars
router.post('/', controller.postCars);

// ==================================================

// [POST] /api/cars
router.get('/', controller.getCars);

// ==================================================

// [POST] /api/cars/[id]
router.get('/:id', controller.getCarByID);

// ==================================================

module.exports = router;