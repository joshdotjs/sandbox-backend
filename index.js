console.log("HELLO");
require("dotenv").config();
require("colors");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// ==================================================

const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "static")));
server.use(morgan("dev"));
server.use(cors());

// ==================================================

server.get("/status", (req, res) => {
  res.send("[GET] /status");
});

// ==================================================

const { v4: uuid } = require("uuid");
uuid();

server.get("/users", (req, res) => {
  res.status(200).send([
    { id: uuid(), name: "josh" },
    { id: uuid(), name: "steve" },
  ]);
});

// ==================================================

// SQL
const s3 = require("sqlite3").verbose();
let sql;
const fErr = (err) => {
  if (err) return console.log(err);
};

// connect to DB
const db = new s3.Database("./test.db", s3.OPEN_READWRITE, fErr);

// // create table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
// db.run(sql);

// // drop table
// sql = `DROP TABLE IF EXISTS users`;
// db.run(sql);

// // insert data into table
sql = `INSERT INTO users(first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`;
// db.run(sql, ["Josh", "holloway", "joshDotJS", "1234", "josh@josh.com"], fErr);

// update:
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ["Steve", 1], fErr);

// delete:
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [1], fErr);

// query the data
sql = `SELECT * FROM USERS`;
db.all(sql, [], (err, rows) => {
  if (err) return console.log(err);
  rows.forEach((row) => {
    console.log(row);
  });
});

// ==================================================

server.get("/", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "index.html"));
});

// ==================================================

server.get("*", (req, res) => {
  // res.send('<h1>fail</h1>');
  res.sendFile(path.join(__dirname, "404.html"));
});

// ==================================================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `*** server is running on: http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`
      .america
  );
});
