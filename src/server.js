// Modifica tu ruta /medidores para mostrar el error real
app.get('/medidores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM medidores');
        res.json(rows);
    } catch (error) {
        console.error('Error MySQL:', error); // ← Esto mostrará el detalle real
        res.status(500).json({ 
            error: 'Error al consultar la base de datos',
            detalle: error.message // ← Envía el mensaje real al cliente
        });
    }
});