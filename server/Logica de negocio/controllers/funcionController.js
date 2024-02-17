const pool = require("../../Enlace a Datos/database");

async function getFunciones(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select id_funcion,id_pelicula, id_sala, fecha, precio, asientos_disponibles,  nombre_pelicula, nombre_sala, nombre_ciudad,nombre_complejo from vista_funcion');
        client.release();
        res.json(result.rows);
        console.log(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getFuncion(req, res) {
    const { id } = req.params;
    const query = 'SELECT id_funcion,id_pelicula, id_sala, fecha, precio, asientos_disponibles,  nombre_pelicula, nombre_sala, nombre_ciudad from vista_funcion where id_funcion=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la función' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getFuncionCompleta(req, res) {
    const { id } = req.params;
    const query = 'SELECT * from vista_funcion where id_funcion=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la función' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createFuncion(req, res) {
    const { id_pelicula, id_sala, fecha, precio, asientos_disponibles } = req.body;
    const query = 'INSERT INTO funcion (id_pelicula, id_sala, fecha, precio, asientos_disponibles) VALUES ($1, $2, $3,$4,$5)';
    const values = [id_pelicula, id_sala, fecha, precio, asientos_disponibles];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó la función' });
        } else {
            res.status(400).json({ message: 'No se guardó la función' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

async function updateFuncion(req, res) {
    const { id } = req.params;
    const { id_pelicula, id_sala, fecha, precio, asientos_disponibles } = req.body;
    const query = 'UPDATE funcion SET id_pelicula=$2, id_sala=$3, fecha=$4, precio=$5, asientos_disponibles=$6 WHERE id_funcion=$1;';
    const values = [id, id_pelicula, id_sala, fecha, precio, asientos_disponibles];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó la función' });
        } else {
            res.status(400).json({ message: 'No se actualizó la función' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

async function deleteFuncion(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM funcion where id_funcion=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'funcion eliminada' });
        } else {
            res.status(500).json({ message: 'No existe la funcion' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function obtenerFechasFuncion(req, res) {
    const { id_pelicula, ciudad, complejo } = req.params;
    const query = 'SELECT * FROM vista_funcion WHERE id_pelicula=$1 AND nombre_ciudad=$2 AND nombre_complejo=$3'
    const values = [id_pelicula, ciudad, complejo];
    let funciones;
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        funciones = result.rows;
        funciones = obtenerFechas(funciones);
        res.json(funciones);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

function obtenerFechas(funciones) {
    let fechas_Funcion = [];
    const mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    for (let funcion of funciones) {
        funcion.fecha.setMinutes(funcion.fecha.getMinutes() + funcion.fecha.getTimezoneOffset());
        if (funcion.fecha > new Date()) {
            let fecha = {
                fecha: new Date(funcion.fecha.setHours(0, 0, 0, 0)),
                fecha_texto: `${dias[funcion.fecha.getDay()]}. ${funcion.fecha.getDate()} de ${mesesDelAnio[funcion.fecha.getMonth()]}`
            }
            fechas_Funcion.push(fecha);
        }
    }
    fechas_Funcion = new Map([...fechas_Funcion.map(fecha_funcion => [fecha_funcion.fecha_texto, fecha_funcion])]);
    fechas_Funcion = Array.from(fechas_Funcion.values());
    return fechas_Funcion;
}

async function obtenerHorasFuncion(req, res) {
    const { id_pelicula, ciudad, complejo, fecha } = req.params;
    const query = 'SELECT * FROM vista_funcion WHERE id_pelicula=$1 AND nombre_ciudad=$2 AND nombre_complejo=$3';
    const values = [id_pelicula, ciudad, complejo];
    let funciones_hora;
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        funciones_hora = result.rows;
        funciones_hora = obtenerFechasHora(funciones_hora, fecha);
        res.json(funciones_hora);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", details: err.message });
    }
}

function obtenerFechasHora(funciones, fecha) {
    fecha = new Date(fecha);
    let horas_Funcion = [];
    horas_Funcion[0] = [];
    horas_Funcion[1] = [];
    for (let funcion of funciones) {
        funcion.fecha.setMinutes(funcion.fecha.getMinutes() + funcion.fecha.getTimezoneOffset());
        if (funcion.fecha > new Date() && funcion.fecha.getFullYear() == fecha.getFullYear() && funcion.fecha.getMonth() == fecha.getMonth() &&
            funcion.fecha.getDate() == fecha.getDate()) {
            let hora_funcion = {
                id_funcion: funcion.id_funcion,
                hora: `${funcion.fecha.getHours()}:${String(funcion.fecha.getMinutes()).padStart(2,0)}`
            }
            if (funcion.capacidad_sala == 60) {
                hora_funcion.tipo_sala = "Sala Principal";
                horas_Funcion[0].push(hora_funcion);
            } else {
                hora_funcion.tipo_sala = "Sala VIP";
                horas_Funcion[1].push(hora_funcion);
            }
        }
    }
    return horas_Funcion;
}

module.exports = {
    obtenerFechasFuncion,
    obtenerHorasFuncion,
    getFunciones,
    getFuncion,
    getFuncionCompleta,
    createFuncion,
    updateFuncion,
    deleteFuncion
};