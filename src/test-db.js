const pool = require('./db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        console.log('✅ Conexión exitosa. Tablas en conjunto_residencial:', rows);
    } catch (error) {
        console.error('❌ Error en la conexión:', error);
    } finally {
        pool.end();
    }
}

testConnection();
