const pool = require("../../Enlace a Datos/database");

async function getAsientosOcupados(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM vista_detalle_reserva where id_funcion=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existen asientos ocupados' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getCapacidadSala(req, res) {
    const { id } = req.params;
    const query = 'SELECT capacidad_sala FROM vista_funcion where id_funcion=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existen la función' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getAsientosOcupados,
    getCapacidadSala
}