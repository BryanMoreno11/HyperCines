const pool = require("../../Enlace a Datos/database");

async function getSalas(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from vista_sala');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getSalas
}