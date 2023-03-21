const db = require('./db-config');

function createCar(car) {
    return db('cars').insert(car);
}

function getAllCars() {
    return db('cars').select('*');
}

function deleteCar(id) {
    return db('cars').where('id', id).del();
}

function updateCar(id, car) {
    return db('cars').where('id', id).update(car);
}

module.exports = {
    createCar,
    getAllCars,
    deleteCar,
    updateCar,
};