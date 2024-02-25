const { Router } = require('express');
const router = new Router();
var { createSala, getSalas, deleteSala, updateSala, getSala } = require('../../Logica de negocio/controllers/salaController');
router.get("/salas", getSalas);
router.get("/sala/:id", getSala);
router.post('/sala', createSala);
router.put('/sala/:id', updateSala);
router.delete('/sala/:id', deleteSala);
module.exports = router;