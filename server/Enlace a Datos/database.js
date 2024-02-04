const { Pool } = require('pg');
//cadena de conexión
const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'cine',
    port: '5432'
});
module.exports = pool;