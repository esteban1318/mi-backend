const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Usar pool en lugar de connection

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Configurar Express para servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas de la API
app.get('/api/medidores', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM medidores'); // Correcto para mysql2/promise
    res.json(results);
  } catch (err) {
    console.error('❌ Error en la base de datos:', err);
    res.status(500).send('Error en la base de datos');
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
