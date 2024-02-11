const pool = require("../../Enlace a Datos/database");

async function getGeneros(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from genero');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getGeneros
}