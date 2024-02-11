const { Router } = require("express");
const router = new Router();
var { getGeneros } = require("../../Logica de negocio/controllers/generoController");
router.get("/generos", getGeneros);
module.exports = router;