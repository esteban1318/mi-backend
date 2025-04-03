const express = require('express');
const pool = require('./db'); // Importa la conexión a la DB
const app = express();  // ⬅ ¡Aquí defines `app`!
app.use(express.json()); // ⬅ NECESARIO para procesar JSON en POST requests


// Ruta para obtener todos los medidores
app.get('/api/medidores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medidores');
        res.json(rows);
    } catch (error) {
        console.error('Error MySQL:', error);
        res.status(500).json({ 
            error: 'Error al consultar la base de datos',
            detalle: error.message
        });
    }
});

// 🔽 NUEVA RUTA PARA INSERTAR UN MEDIDOR
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
        console.error('Error MySQL:', error);
        res.status(500).json({ 
            error: 'Error al insertar el medidor'+error.message,
            detalle: error.message
        });
    }
});
