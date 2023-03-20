const express = require('express');
const router = express.Router();
const path = require('path');

const { getUsers, postUser } = require('./users-controller');

// ==================================================

// [GET] /api/users
router.get("/", getUsers); 

// ==================================================

// [POST] /api/users
router.post('/', postUser);

// ==================================================

module.exports = router;