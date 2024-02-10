const { Pool } = require('pg');
//cadena de conexión
const pool = new Pool({
    host: 'ep-soft-flower-a5sc8k15.us-east-2.aws.neon.tech',
    database: 'cine',
    user: 'BryanMoreno11',
    password: 'c1E3uFmwqPJV',
    port: 5432,
    ssl: {
        require: true,
        sslmode: 'require'
    }
});
module.exports = pool;