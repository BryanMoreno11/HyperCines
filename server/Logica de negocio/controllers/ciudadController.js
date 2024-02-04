const pool = require("../../Enlace a Datos/database");

async function getCiudades(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from ciudad');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getCiudad(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM ciudad where id_ciudad=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la ciudad' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }


}

async function createCiudad(req, res) {
    const { nombre, descripcion } = req.body;
    const query = 'INSERT INTO ciudad (nombre, descripcion) VALUES ($1, $2)';
    const values = [nombre, descripcion];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó la ciudad' });
        } else {
            res.status(400).json({ message: 'No se guardó la ciudad' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function updateCiudad(req, res) {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const query = 'UPDATE ciudad  SET nombre=$2, descripcion=$3 WHERE id_ciudad=$1';
    const values = [id, nombre, descripcion];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó la ciudad' });
        } else {
            res.status(400).json({ message: 'No se actualizó la ciudad' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function deleteCiudad(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM ciudad where id_ciudad=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'ciudad eliminada' });
        } else {
            res.status(500).json({ message: 'No existe la ciudad' });
        }

    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
module.exports = {
    getCiudades,
    getCiudad,
    createCiudad,
    updateCiudad,
    deleteCiudad
}