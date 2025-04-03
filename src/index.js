const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Asegúrate de que db.js esté configurado

const app = express();

// Configurar CORS para permitir solicitudes desde tu frontend
const corsOptions = {
  origin: 'https://orientallock.netlify.app', // Permite solo tu dominio frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

app.use(express.json());

// Servir archivos estáticos (si es necesario)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Middleware de logging (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas de la API
app.get('/api/medidores', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM medidores');
    res.json(results);
  } catch (err) {
    console.error('❌ Error en la base de datos:', err);
    res.status(500).json({ error: 'Error en la base de datos', detalle: err.message });
  }
});

app.post('/api/medidores', async (req, res) => {
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

// Iniciar el servidor en el puerto asignado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
