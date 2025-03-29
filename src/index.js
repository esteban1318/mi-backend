const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Configurar Express para servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas de la API
app.get('/api/medidores', (req, res) => {
  connection.query('SELECT * FROM medidores', (err, results) => {
    if (err) {
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
