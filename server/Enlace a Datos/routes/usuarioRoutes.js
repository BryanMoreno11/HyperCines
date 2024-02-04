const { Router } = require("express");
const router = new Router();
var { createUsuario, getUsuarios, verificarUsuario } = require("./../../Logica de negocio/controllers/usuarioController");
router.post("/usuario", createUsuario, getUsuarios);
router.get("/usuario", getUsuarios);
router.post("/usuario/verificar", verificarUsuario);
module.exports = router;