const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('./users-controller');

// ==================================================

// [GET] /api/users
router.get("/", (req, res, next) => {
  
  // query the data
  sql = `SELECT * FROM USERS`;
  params = [];
    
  db.all(sql, params, (err, rows) => { 
    
    if (err) {
      // async => use Express error-handling
      return next({ 
        status: 500, 
        message: 'server error',
        err 
      });
    }
      
    const users = [];
    rows.forEach(row => users.push(row));
    res.status(200).send(users);
  });

}); // server.get('/users')

// ==================================================

// [POST] /api/users
router.post('/', (req, res, next) => {
  
  const message = '[POST] /api/user';
  console.log(message);
  
  res.status(200).send({ message });
});

// ==================================================

module.exports = router;