const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'ballast.proxy.rlwy.net', // Host de Railway
  user: process.env.MYSQL_USER || 'root',     // Usuario correcto
  password: process.env.MYSQL_PASSWORD || 'bkgjXZqXcmXDdUuEPIylionwtbNfBglv', // Contraseña de Railway
  database: process.env.MYSQL_DATABASE || 'conjunto_residencial', // Asegura que sea esta BD
  port: process.env.MYSQL_PORT || 3306,       // Puerto de Railway
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
