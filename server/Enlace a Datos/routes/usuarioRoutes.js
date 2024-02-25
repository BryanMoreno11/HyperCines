const { Router } = require("express");
const router = new Router();
var { createUsuario, getUsuarios, verificarUsuario, getUsuario, deleteUsuario, updateUsuario } = require("./../../Logica de negocio/controllers/usuarioController");
router.post("/usuario", createUsuario);
router.get("/usuario/:id", getUsuario)
router.get("/usuarios", getUsuarios);
router.post("/usuario/verificar", verificarUsuario);
router.put("/usuario/:id/", updateUsuario);
router.delete("/usuario/:id/", deleteUsuario);
module.exports = router;