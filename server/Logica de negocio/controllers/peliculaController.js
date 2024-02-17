const pool = require("../../Enlace a Datos/database");

async function getPeliculas(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('select * from vista_pelicula');
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function getPelicula(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM vista_pelicula where id_pelicula=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200);
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(500).json({ message: 'No existe la película' });
        }


    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

async function createPelicula(req, res) {
    const { id_genero, id_clasificacion, nombre_pelicula, duracion, imagen_miniatura, imagen_portada, trailer, sinopsis, fecha_estreno } = req.body;
    const query = 'INSERT INTO pelicula (id_genero, id_clasificacion, nombre_pelicula, duracion, imagen_miniatura, imagen_portada, trailer, sinopsis, fecha_estreno) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)';
    const values = [id_genero, id_clasificacion, nombre_pelicula, duracion, imagen_miniatura, imagen_portada, trailer, sinopsis, fecha_estreno];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardó la película' });
        } else {
            res.status(400).json({ message: 'No se guardó la película' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

async function updatePelicula(req, res) {
    const { id } = req.params;
    const { id_genero, id_clasificacion, nombre_pelicula, duracion, imagen_miniatura, imagen_portada, trailer, sinopsis, fecha_estreno } = req.body;
    const query = 'UPDATE pelicula  SET id_genero=$2, id_clasificacion=$3, nombre_pelicula=$4, duracion=$5, imagen_miniatura=$6, imagen_portada=$7, trailer=$8, sinopsis=$9, fecha_estreno=$10 WHERE id_pelicula=$1';
    const values = [id, id_genero, id_clasificacion, nombre_pelicula, duracion, imagen_miniatura, imagen_portada, trailer, sinopsis, fecha_estreno];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se actualizó la película' });
        } else {
            res.status(400).json({ message: 'No se actualizó la película' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", message: err.message });
    }
}

async function deletePelicula(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM pelicula where id_pelicula=$1'
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'pelicula eliminada' });
        } else {
            res.status(500).json({ message: 'No existe la pelicula' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

async function getPeliculasCartelera(req, res) {
    const { ciudad } = req.params;
    const { complejo } = req.params;
    let peliculas;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_pelicula_complejo");
        client.release();
        peliculas = result.rows;
        peliculas = filtrarPeliculasCartelera(peliculas, ciudad, complejo);
        res.json(peliculas);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

function filtrarPeliculasCartelera(peliculas, ciudad, complejo) {
    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
    peliculas = peliculas.filter(pelicula => {
        return pelicula.ciudad_nombre == ciudad && pelicula.complejo_nombre == complejo && pelicula.fecha > fecha
    });
    peliculas = new Map([...peliculas.map(pelicula => [pelicula.id_pelicula, pelicula])]);
    peliculas = Array.from(peliculas.values());
    return peliculas;
}

async function getPeliculasProximoEstreno(req, res) {
    let peliculas;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM vista_pelicula ORDER BY fecha_estreno");
        client.release();
        peliculas = result.rows;
        peliculas = filtrarPeliculasProximoEstreno(peliculas);
        res.json(peliculas);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

function filtrarPeliculasProximoEstreno(peliculas) {
    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
    peliculas = peliculas.filter(pelicula => {
        return pelicula.fecha_estreno > fecha;
    });
    peliculas = clasificarPeliculasMes(peliculas);
    return peliculas;
}

function clasificarPeliculasMes(peliculas) {
    const mesesDelAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let mes_pelicula = {};
    for (let pelicula of peliculas) {
        if (mes_pelicula[mesesDelAnio[pelicula.fecha_estreno.getMonth()]]) {
            mes_pelicula[mesesDelAnio[pelicula.fecha_estreno.getMonth()]].push(pelicula);
        } else {
            mes_pelicula[mesesDelAnio[pelicula.fecha_estreno.getMonth()]] = [];
            mes_pelicula[mesesDelAnio[pelicula.fecha_estreno.getMonth()]].push(pelicula);
        }

    }
    return mes_pelicula;
}

module.exports = {
    getPeliculas,
    getPelicula,
    updatePelicula,
    deletePelicula,
    createPelicula,
    getPeliculasCartelera,
    getPeliculasProximoEstreno
};