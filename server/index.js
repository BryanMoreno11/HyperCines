const express = require("express");
const app = express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas
const peliculaRoutes = require("./Enlace a Datos/routes/peliculaRoutes");
const ciudadRoutes = require("./Enlace a Datos/routes/ciudadRoutes");
const complejoRoutes = require("./Enlace a Datos/routes/complejoRoutes");
const funcionRoutes = require("./Enlace a Datos/routes/funcionRoutes");
const usuarioRoutes = require("./Enlace a Datos/routes/usuarioRoutes");
const dashboardRoutes = require("./Enlace a Datos/routes/dashboardRoutes");
const generoRoutes = require("./Enlace a Datos/routes/generoRoutes");
const clasificacionRoutes = require("./Enlace a Datos/routes/clasificacionRoutes");
app.use("/api", peliculaRoutes);
app.use("/api", ciudadRoutes);
app.use("/api", complejoRoutes);
app.use("/api", funcionRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", generoRoutes);
app.use("/api", clasificacionRoutes);
app.listen("3000");
console.log("server up localhost:3000");