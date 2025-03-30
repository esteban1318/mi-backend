const express = require('express');
const app = express();

// Ruta GET /test-db para probar conexión
app.get('/test-db', async (req, res) => {
    try {
        // Aquí pondrías tu lógica de conexión a la DB (ej: MongoDB, MySQL, etc.)
        // Ejemplo simulado:
        const dbStatus = "Conexión exitosa a la DB"; // Reemplaza esto con tu código real

        res.json({
            success: true,
            message: dbStatus,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error al conectar con la DB: " + error.message
        });
    }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
