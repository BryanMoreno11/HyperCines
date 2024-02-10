const pool = require("../../Enlace a Datos/database");

async function usuariosRegistroDiarios(req, res) {
    let usuarios;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM usuario where Date(fecha_creacion)= Current_Date");
        client.release();
        usuarios = result.rows;
        usuarios = obtenerUsuariosRegistroDiarios(usuarios);
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

function obtenerUsuariosRegistroDiarios(usuarios) {
    let usuariosDiarios = {};
    for (let usuario of usuarios) {
        if (usuariosDiarios[`${usuario.fecha_creacion.getHours()}:00`]) {
            usuariosDiarios[`${usuario.fecha_creacion.getHours()}:00`]++;
        } else {
            usuariosDiarios[`${usuario.fecha_creacion.getHours()}:00`] = 1;
        }
    }
    return usuariosDiarios;
}

module.exports = {
    usuariosRegistroDiarios
}