const pool = require('./../../Enlace a Datos/database');

async function createSala(req, res) {
    const { id_complejo, nombre, capacidad } = req.body;
    const query = 'INSERT INTO sala (id_complejo, nombre, capacidad) VALUES ($1, $2, $3)';
    const values = [id_complejo, nombre, capacidad];
    
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó la sala' });
        } else {
            res.status(400).json({ message: 'No se guardó la sala' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getSala(req, res) {
    const salaId = req.params.id; // Supongamos que el id de la sala está en los parámetros de la solicitud
    const query = 'SELECT * FROM sala WHERE id_sala = $1';
    
    try {
        const client = await pool.connect();
        const result = await client.query(query, [salaId]);
        client.release();
        
        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Sala no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function updateSala(req, res) {
    const salaId = req.params.id;
    const { id_complejo, nombre, capacidad } = req.body;
    const query = 'UPDATE sala SET id_complejo = $1, nombre = $2, capacidad = $3 WHERE id_sala = $4';
    const values = [id_complejo, nombre, capacidad, salaId];
    
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Sala actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Sala no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function deleteSala(req, res) {
    const salaId = req.params.id;
    const query = 'DELETE FROM sala WHERE id_sala = $1';
    
    try {
        const client = await pool.connect();
        const result = await client.query(query, [salaId]);
        client.release();
        
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Sala eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Sala no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getSalas(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM sala');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    createSala,
    getSala,
    updateSala,
    deleteSala,
    getSalas
};
