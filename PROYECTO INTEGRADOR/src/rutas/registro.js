const express = require('express');
const rutas = express.Router();

const { mostrarLogin, mostrarRegistro, Registro, Login, cierreSesion, mostrarCambioContraseña, mostrarRecuperarContraseña,enviarUsuario,cambiarContraseña } = require('../Controladores/registro_controlador');


rutas.get('/registro', mostrarRegistro);
rutas.post('/registro', Registro);

rutas.get('/recuperar_contrasena',mostrarRecuperarContraseña)
rutas.get('/cambio_contrasena/:id',mostrarCambioContraseña)

rutas.post('/recuperar_contrasena',enviarUsuario)
rutas.post('/cambio_contrasena',cambiarContraseña)

rutas.get('/login', mostrarLogin);
rutas.post('/login', Login); 

rutas.get('/cerrarSesion', cierreSesion);

module.exports = rutas;