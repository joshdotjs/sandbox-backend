const express = require('express');
const router = express.Router();

const controller = require('./cars-controller');

// ==================================================

router.post('/', controller.createCar);
router.get('/', controller.getAllCars);
router.get('/:id', controller.getCarByID);
router.patch('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

// ==================================================

module.exports = router;