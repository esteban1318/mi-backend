const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Asegúrate de que db.js esté configurado

const app = express();

// Forzar encabezados CORS manualmente (refuerzo)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://orientallock.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// Configuración de CORS (opcional, pero recomendada)
const corsOptions = {
  origin: 'https://orientallock.netlify.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

app.use(express.json());

// Servir archivos estáticos (si es necesario)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas de la API
app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
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

// Iniciar el servidor en el puerto asignado por Railway o 3000 en local
const PORT = process.env.PORT || 3000;  // NO pongas un puerto fijo

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

