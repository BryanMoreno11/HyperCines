const pool = require("../../Enlace a Datos/database");

async function getReservas(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from vista_reserva_full');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

async function getReserva(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM vista_reserva_full where id_reserva=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la reserva' });
        }


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createDetalleReserva(req, res) {
    const { id_reserva, posicion_asiento } = req.body;
    const query = 'INSERT INTO detalle_reserva (id_reserva, posicion_asiento) VALUES ($1, $2)';
    const values = [id_reserva, posicion_asiento];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó el detalle_reserva' });
        } else {
            res.status(400).json({ message: 'No se guardo el detalle_reserva' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

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
    getReservas,
    getReserva,
    getAsientosOcupados,
    getCapacidadSala,
    createDetalleReserva
}