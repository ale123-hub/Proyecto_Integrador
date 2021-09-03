const express = require('express');
const rutas = express.Router()

const { isLoggedIn } = require("../lib/auth")

const { mostrar, agregar, listar, editar, actualizarPlanificacionActividades,eliminar } = require("../controladores/planificacio_actividades_controladores")

rutas.use(isLoggedIn)

rutas.get("/agregar/:id", isLoggedIn, mostrar)
rutas.post("/agregar/:id", isLoggedIn, agregar)
rutas.get("/listar/:id", isLoggedIn, listar)
rutas.get("/editar/:id", isLoggedIn, editar)
rutas.post("/editar/:id", isLoggedIn, actualizarPlanificacionActividades)
rutas.get("/eliminar/:id", isLoggedIn, eliminar) 

module.exports = rutas