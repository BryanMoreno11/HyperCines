process.env.TZ = 'America/Guayaquil';
const pool = require("../../Enlace a Datos/database");

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
    for (let funcion of funciones) {
        if (funcion.fecha > new Date() && funcion.fecha.getFullYear() == fecha.getFullYear() && funcion.fecha.getMonth() == fecha.getMonth() &&
            funcion.fecha.getDate() == fecha.getDate()) {
            let hora_funcion = {
                id_funcion: funcion.id_funcion,
                hora: `${funcion.fecha.getHours()}:${String(funcion.fecha.getMinutes()).padStart(2,0)}`
            }
            horas_Funcion.push(hora_funcion);
        }
    }
    return horas_Funcion;
}

module.exports = {
    obtenerFechasFuncion,
    obtenerHorasFuncion
};