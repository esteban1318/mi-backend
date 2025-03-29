const express = require('express');
const router = express.Router();
const connection = require('./db'); // Asegúrate de que 'db.js' maneje la conexión

// Ruta para obtener los medidores
router.get('/medidores', (req, res) => {
    connection.query("SELECT id, torre, apartamento, medidor, estado FROM medidores ORDER BY apartamento + 0 ASC", 
    (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results); // Responder en JSON
    });
});

module.exports = router;
