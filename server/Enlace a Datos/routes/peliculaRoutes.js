const { Router } = require('express');
const router = new Router();
var { getPeliculas, getPelicula, updatePelicula, createPelicula, deletePelicula, getPeliculasCartelera, getPeliculasProximoEstreno } = require('../../Logica de negocio/controllers/peliculaController');
router.get('/peliculas', getPeliculas);
router.get('/pelicula/:id', getPelicula);
router.get('/peliculas/cartelera/:ciudad/:complejo', getPeliculasCartelera);
router.get('/peliculas/proximo', getPeliculasProximoEstreno);
router.post('/pelicula', createPelicula);
router.put('/pelicula/:id', updatePelicula)
router.delete('/pelicula/:id', deletePelicula);
module.exports = router;