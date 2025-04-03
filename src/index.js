const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Usar pool en lugar de connection

const app = express();

// 🔹 Configurar CORS para permitir solicitudes desde tu frontend
const corsOptions = {
  origin: 'https://orientallock.netlify.app', // Reemplaza con la URL de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

// Puerto asignado por Railway o 3000 en local
const PORT = process.env.PORT || 3000;

// 🔹 Configurar Express para servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../../frontend')));

// Middleware para logs (opcional, ayuda a depurar)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas de la API
app.get(['/medidores', '/api/medidores'], async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM medidores');
    res.json(results);
  } catch (err) {
    console.error('❌ Error en la base de datos:', err);
    res.status(500).json({ error: 'Error en la base de datos', detalle: err.message });
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

// Iniciar servidor en el puerto correcto
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
