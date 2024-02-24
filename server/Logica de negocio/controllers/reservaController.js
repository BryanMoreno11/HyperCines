const pool = require("../../Enlace a Datos/database");

async function createReserva(req, res) {
    const { id_usuario, id_funcion, cantidad, total, codigo_reserva } = req.body;
    const query = 'INSERT INTO reserva (id_usuario, id_funcion, cantidad, total, codigo_reserva) VALUES ($1, $2, $3,$4,$5) RETURNING id_reserva';
    const values = [id_usuario, id_funcion, cantidad, total, codigo_reserva];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        const id_reserva = result.rows[0].id_reserva;
        if (result.rowCount > 0) {
            res.json({ "id_reserva": id_reserva });
        } else {
            res.status(400).json({ message: 'No se guardó la reserva' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

module.exports = {
    createReserva
}