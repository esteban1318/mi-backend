const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'ballast.proxy.rlwy.net',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'bkgjXZqXcmXDdUuEPIylionwtbNfBglv',
  database: process.env.MYSQL_DATABASE || 'conjunto_residencial',
  port: process.env.MYSQL_PORT || 55687,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }, // Agregar si Railway requiere SSL
});

module.exports = pool;
