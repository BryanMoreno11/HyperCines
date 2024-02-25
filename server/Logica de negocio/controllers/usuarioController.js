const pool = require('./../../Enlace a Datos/database');

async function createUsuario(req, res) {
    const { nombre, apellido, cedula, telefono, correo, password, direccion } = req.body;
    const query = 'INSERT INTO usuario (nombre, apellido, cedula, telefono, correo, password, direccion ) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING id_usuario';
    const values = [nombre, apellido, cedula, telefono, correo, password, direccion];
    if (await correoRepetido(correo) == false) {
        try {
            const client = await pool.connect();
            const result = await client.query(query, values);
            client.release();
            const id_usuario = result.rows[0].id_usuario;
            if (result.rowCount > 0) {
                res.json({ "id_usuario": id_usuario });
            } else {
                res.status(400).json({ message: 'No se guardó el cliente' });
            }
        } catch (err) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    } else {
        res.status(400).json({ message: 'Correo repetido' });
    }

}

async function verificarUsuario(req, res) {
    const query = "SELECT * FROM usuario WHERE correo= $1 AND password=$2"
    const { correo, password } = req.body;
    const values = [correo, password];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows[0].id_usuario);
        } else {
            res.status(400).json({ message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function correoRepetido(correo) {
    const query = "SELECT * FROM usuario where correo=$1";
    try {
        const client = await pool.connect();
        const result = await client.query(query, [correo]);
        client.release();
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("Error en la conexión con la BD");
    }

}

async function getUsuarios(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM usuario");
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getUsuario(req, res) {
    const usuarioId = req.params.id;
    const query = 'SELECT * FROM usuario WHERE id_usuario = $1'

    try {
        const client = await pool.connect();
        const result = await client.query(query, [usuarioId]);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }

    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" })
    }

}

async function deleteUsuario(req, res) {
    const usuarioId = req.params.id;
    const query = 'DELETE FROM usuario WHERE id_usuario = $1';

    try {
        const client = await pool.connect();
        const result = await client.query(query, [usuarioId]);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function updateUsuario(req, res) {
    const usuarioId = req.params.id;
    const { nombre, apellido, cedula, telefono, correo, password, direccion } = req.body;
    const query = 'UPDATE usuario SET nombre = $1, apellido = $2, cedula = $3, telefono = $4, correo = $5, password = $6, direccion = $7 WHERE id_usuario = $8';
    const values = [nombre, apellido, cedula, telefono, correo, password, direccion, usuarioId];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = {
    createUsuario,
    getUsuarios,
    getUsuario,
    updateUsuario,
    verificarUsuario,
    deleteUsuario
}