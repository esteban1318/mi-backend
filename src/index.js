const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Usar pool en lugar de connection

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// 🔹 Configurar Express para servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas de la API
app.get(['/medidores', '/api/medidores'], async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM medidores');
    res.json(results);
  } catch (err) {
    console.error('❌ Error en la base de datos:', err);
    res.status(500).send('Error en la base de datos');
  }
});
app.post(['/medidores', '/api/medidores'], async (req, res) => {
  const { torre, apartamento, medidor, estado } = req.body;

  if (!torre || !apartamento || !medidor || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const sql = 'INSERT INTO medidores (torre, apartamento, medidor, estado) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [torre, apartamento, medidor, estado]);

    res.status(201).json({ message: 'Medidor agregado correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error MySQL:', error);
    res.status(500).json({ error: 'Error al insertar el medidor', detalle: error.message });
  }
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

