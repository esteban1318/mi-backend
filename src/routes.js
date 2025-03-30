// En tu archivo de rutas (ej: app.js o routes/dbTest.js)
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Usa mysql2/promise para async/await

// Configuración de la conexión (usa variables de entorno)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 55687,
  waitForConnections: true,
  connectionLimit: 10
});

// Endpoint de prueba
router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({
      status: '¡Conexión exitosa!',
      database: process.env.DB_NAME,
      result: rows[0].result // Debería ser 2
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error de conexión a la DB',
      details: err.message
    });
  }
});

module.exports = router;
