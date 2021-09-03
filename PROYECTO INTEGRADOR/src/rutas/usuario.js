const express = require('express');
const rutas = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile } = require('../Controladores/usuario_controlador');

rutas.get('/Seguimiento', isLoggedIn, renderUserProfile);

module.exports = rutas; 