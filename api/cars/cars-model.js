const db = require('../../db/db-config');

// ==================================================

function createCar(car) {
  return db('cars').insert(car);
}

// ==================================================

function getAllCars() {
  return db('cars').select('*');
}

// ==================================================

function getCarByID(id) {
  return db('cars').where('id', id).first();
}

// ==================================================

function deleteCar(id) {
  return db('cars').where('id', id).del();
}

// ==================================================

function updateCar(id, car) {
  console.log('updateCar model - id: ', id);
  return db('cars').where('id', id).update(car);
}

// ==================================================

module.exports = {
  createCar,
  getAllCars,
  getCarByID,
  deleteCar,
  updateCar,
};