const pool = require("../../Enlace a Datos/database");

async function recaudacionSemanal(req, res) {
    let recaudacion_dias;
    try {
        const client = await pool.connect();

        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days' ORDER BY fecha_reserva ASC");
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
        console.log(dia);
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
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days'");
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
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days'");
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

async function entradasSemanal(req, res) {
    let entradas_dias;
    try {
        const client = await pool.connect();

        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days' ORDER BY fecha_reserva ASC");
        client.release();
        entradas_dias = result.rows;
        entradas_dias = obtenerEntradasSemana(entradas_dias);
        res.json(entradas_dias);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerEntradasSemana(entradas_dias) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let entradasSemana = {};
    for (let entrada_dia of entradas_dias) {
        let dia = entrada_dia.fecha_reserva.split('/');
        dia = new Date(`${dia[2]}-${dia[1]}-${dia[0]}`);
        dia.setMinutes(dia.getMinutes() + dia.getTimezoneOffset());
        dia = dia.getDay();
        dia = diasSemana[dia];
        if (entradasSemana[`${dia}`]) {
            entradasSemana[`${dia}`] += entrada_dia.cantidad;
        } else {
            entradasSemana[`${dia}`] = entrada_dia.cantidad;
        }
    }
    return entradasSemana;
}

async function entradasPelicula(req, res) {
    let entradas_peliculas;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days'");
        client.release();
        entradas_peliculas = result.rows;
        entradas_peliculas = obtenerEntradasPelicula(entradas_peliculas);
        res.json(entradas_peliculas);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerEntradasPelicula(entradas_peliculas) {
    let entrada_pelicula_semana = {};
    for (let entrada_pelicula of entradas_peliculas) {
        if (entrada_pelicula_semana[`${entrada_pelicula.nombre_pelicula	}`]) {
            entrada_pelicula_semana[`${entrada_pelicula.nombre_pelicula	}`] += entrada_pelicula.cantidad;
        } else {
            entrada_pelicula_semana[`${entrada_pelicula.nombre_pelicula	}`] = entrada_pelicula.cantidad;
        }
    }
    return entrada_pelicula_semana;
}

async function entradasGenero(req, res) {
    let entradas_genero;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days'");
        client.release();
        entradas_genero = result.rows;
        entradas_genero = obtenerEntradasGenero(entradas_genero);
        res.json(entradas_genero);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerEntradasGenero(entradas_generos) {
    let entrada_genero_semana = {};
    for (let entradas_genero of entradas_generos) {
        console.log(entradas_genero.genero_pelicula);
        if (entrada_genero_semana[`${entradas_genero.genero_pelicula}`]) {
            entrada_genero_semana[`${entradas_genero.genero_pelicula}`] += entradas_genero.cantidad;
        } else {
            entrada_genero_semana[`${entradas_genero.genero_pelicula}`] = entradas_genero.cantidad;
        }
    }
    return entrada_genero_semana;
}

async function recaudacionClasificacion(req, res) {
    let recaudacion_clasificaciones;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_reserva_full WHERE TO_DATE(fecha_reserva, 'DD/MM/YYYY') >= CURRENT_DATE - INTERVAL '6 days'");
        client.release();
        recaudacion_clasificaciones = result.rows;
        recaudacion_clasificaciones = obtenerRecaudacionClasificacion(recaudacion_clasificaciones);
        res.json(recaudacion_clasificaciones);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

function obtenerRecaudacionClasificacion(recaudacion_clasificaciones) {
    let recaudacion_clasificacion_semana = {};
    for (let recaudacion_clasificacion of recaudacion_clasificaciones) {
        if (recaudacion_clasificacion_semana[`${recaudacion_clasificacion.clasificacion		}`]) {
            recaudacion_clasificacion_semana[`${recaudacion_clasificacion.clasificacion		}`] += recaudacion_clasificacion.total;
        } else {
            recaudacion_clasificacion_semana[`${recaudacion_clasificacion.clasificacion		}`] = recaudacion_clasificacion.total;
        }
    }
    return recaudacion_clasificacion_semana;
}



module.exports = {
    recaudacionSemanal,
    recaudacionPelicula,
    recaudacionCiudad,
    entradasSemanal,
    entradasPelicula,
    entradasGenero,
    recaudacionClasificacion
}