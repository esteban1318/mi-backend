const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Importa la conexión a MySQL

const app = express();

// 🔹 Configuración de CORS para permitir peticiones desde Netlify
const corsOptions = {
    origin: '*', // Cambia '*' por tu dominio específico si lo deseas
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json()); // Permitir recibir JSON en las solicitudes

// 🔹 Servir archivos estáticos desde "frontend"
app.use(express.static(path.join(__dirname, '../../frontend')));

// 🔹 Rutas de la API
app.get(['/medidores', '/api/medidores'], async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM medidores');
        res.json(results);
    } catch (err) {
        console.error('❌ Error en la base de datos:', err);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

// 🔹 Ruta para insertar un medidor
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

// 🔹 Puerto del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
