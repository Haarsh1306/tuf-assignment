const mysql = require("mysql2/promise");

const pool = mysql.createPool(
  process.env.CONNECTION_STRING
);

module.exports = pool;
