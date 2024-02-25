const pool = require("../../Enlace a Datos/database");

async function recaudacionSemanal(req, res) {
    let recaudacion_dias;
    try {
        const client = await pool.connect();

        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '7 days'");
        client.release();
        recaudacion_dias = result.rows;
        recaudacion_dias = obtenerRecaudacionSemana(recaudacion_dias);
        res.json(recaudacion_dias);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerRecaudacionSemana(recaudacion_dias) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let recaudacionSemana = {};
    for (let recaudacion_dia of recaudacion_dias) {
        let dia = recaudacion_dia.fecha_reserva.split('/');
        dia = new Date(`${dia[2]}-${dia[1]}-${dia[0]}`);
        dia.setMinutes(dia.getMinutes() + dia.getTimezoneOffset());
        dia = dia.getDay();
        dia = diasSemana[dia];
        if (recaudacionSemana[`${dia}`]) {
            recaudacionSemana[`${dia}`] += recaudacion_dia.total;
        } else {
            recaudacionSemana[`${dia}`] = recaudacion_dia.total;
        }
    }
    return recaudacionSemana;
}

async function recaudacionPelicula(req, res) {
    let recaudacion_peliculas;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '7 days'");
        client.release();
        recaudacion_peliculas = result.rows;
        recaudacion_peliculas = obtenerRecaudacionPelicula(recaudacion_peliculas);
        res.json(recaudacion_peliculas);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerRecaudacionPelicula(recaudacion_peliculas) {
    let recaudacion_pelicula_semana = {};
    for (let recaudacion_pelicula of recaudacion_peliculas) {
        if (recaudacion_pelicula_semana[`${recaudacion_pelicula.nombre_pelicula	}`]) {
            recaudacion_pelicula_semana[`${recaudacion_pelicula.nombre_pelicula	}`] += recaudacion_pelicula.total;
        } else {
            recaudacion_pelicula_semana[`${recaudacion_pelicula.nombre_pelicula	}`] = recaudacion_pelicula.total;
        }
    }
    return recaudacion_pelicula_semana;
}

async function recaudacionCiudad(req, res) {
    let recaudacion_ciudad;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '7 days'");
        client.release();
        recaudacion_ciudad = result.rows;
        recaudacion_ciudad = obtenerRecaudacionCiudad(recaudacion_ciudad);
        res.json(recaudacion_ciudad);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerRecaudacionCiudad(recaudacion_ciudades) {
    let recaudacion_ciudad_semanal = {};
    for (let recaudacion_ciudad of recaudacion_ciudades) {
        console.log(recaudacion_ciudad.ciudad);
        if (recaudacion_ciudad_semanal[`${recaudacion_ciudad.ciudad}`]) {
            recaudacion_ciudad_semanal[`${recaudacion_ciudad.ciudad}`] += recaudacion_ciudad.total;
        } else {
            recaudacion_ciudad_semanal[`${recaudacion_ciudad.ciudad	}`] = recaudacion_ciudad.total;
        }
    }
    return recaudacion_ciudad_semanal;
}



module.exports = {
    recaudacionSemanal,
    recaudacionPelicula,
    recaudacionCiudad
}