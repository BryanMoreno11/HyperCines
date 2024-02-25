const pool = require("../../Enlace a Datos/database");

async function getComplejos(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM  vista_complejo_con_ciudad');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getComplejo(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM  vista_complejo_con_ciudad where id_complejo=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe el complejo' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getComplejosFiltro(req, res) {
    const { ciudad } = req.params;
    const query = 'SELECT * FROM  vista_complejo_con_ciudad where nombre_ciudad=$1'
    const values = [ciudad];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existen los complejos' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createComplejo(req, res) {
    const { id_ciudad, nombre, descripcion } = req.body;
    const query = 'INSERT INTO complejo (id_ciudad,nombre, descripcion) VALUES ($1, $2, $3)';
    const values = [id_ciudad, nombre, descripcion];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó el complejo' });
        } else {
            res.status(400).json({ message: 'No se guardó el complejo' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function updateComplejo(req, res) {
    const { id } = req.params;
    const { id_ciudad, nombre, descripcion } = req.body;
    const query = 'UPDATE complejo  SET  id_ciudad=$2, nombre=$3, descripcion=$4 WHERE id_complejo=$1';
    const values = [id, id_ciudad, nombre, descripcion];
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

async function deleteComplejo(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM complejo where id_complejo=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'complejo eliminado' });
        } else {
            res.status(500).json({ message: 'No existe el complejo' });
        }

    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
module.exports = {
    getComplejos,
    getComplejo,
    getComplejosFiltro,
    createComplejo,
    updateComplejo,
    deleteComplejo
}