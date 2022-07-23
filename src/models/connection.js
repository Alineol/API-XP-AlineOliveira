const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const connection = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b7d39aa3a7c462',
  password: 'fb5f81c6',
  database: 'heroku_78f307a106fddb2',
});

module.exports = connection;
