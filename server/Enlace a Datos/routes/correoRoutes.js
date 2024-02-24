const { Router } = require("express");
const router = new Router();
var { enviarCorreoPrueba } = require('../../Logica de negocio/controllers/correoController');
router.get('/correo/', enviarCorreoPrueba);
module.exports = router;