const express = require("express")
const rutas = express.Router()

const { mostrar, mandar } = require("../controladores/index.controlador")

rutas.get("/", mostrar)
rutas.post("/", mandar)
module.exports = rutas