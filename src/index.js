require('dotenv').config();
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
 // Carga las variables de entorno
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
 // Asegúrate de que db.js esté configurado

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
app.get('/api/medidores', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medidores');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error MySQL:', error);
    res.status(500).json({ error: 'Error al obtener los medidores' });
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
pool.getConnection()
  .then(connection => {
    console.log("✅ Conexión a MySQL exitosa");
    connection.release();
  })
  .catch(err => {
    console.error("❌ Error conectando a MySQL:", err);
  });


// Iniciar el servidor en el puerto asignado por Railway o 3000 en local
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en http://0.0.0.0:${PORT}`);
});
app.post('/api/login', async (req, res) => {
  const { usuario, contraseña, rol } = req.body;

  if (!usuario || !contraseña || !rol) {
    return res.status(400).json({ success: false, message: 'Usuario, contraseña y rol son obligatorios' });
  }

  try {
    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ? AND rol = ?';
    const [rows] = await pool.query(sql, [usuario, contraseña, rol]); 

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        message: 'Login exitoso',
        usuario: user.usuario,
        rol: user.rol
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales o rol incorrecto' });
    }
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor', detalle: error.message });
  }
});




