const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Cambia esto si usas otro usuario
    password: '1318',   // Cambia esto si tienes contraseña
    database: 'conjunto_residencial'
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
