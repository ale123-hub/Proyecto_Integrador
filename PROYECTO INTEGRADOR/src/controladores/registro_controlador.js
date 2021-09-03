const registro = {};

const orm = require('../configuracionBaseDatos/orm')
const sql = require('../configuracionBaseDatos/sql')
const helpers = require('../lib/helpers')

const passport = require('passport');

registro.mostrarRegistro = (req, res) => {
    res.render('Login/registro'); 
};

registro.Registro = passport.authenticate('local.signup', {
    successRedirect: '/cerrarSesion',
    failureRedirect: '/Registro',
    failureFlash: true
}); 
 
registro.mostrarLogin = (req, res, next) => {
    res.render('Login/login');
};

registro.mostrarCambioContraseña = async(req, res, next) => {
    const id = req.params.id
    const verUsuario = await sql.query('SELECT username FROM usuarios WHERE id_usuario = ?',[id])
    res.render('Login/cambio_comtraseña',{verUsuario}); 
};

registro.mostrarRecuperarContraseña = (req, res, next) => {
    res.render('Login/recuperar_contraseña');
};

registro.enviarUsuario = async(req, res) => {
    const{username} = req.body
    const verificacion = await orm.usuario.findOne({ where:{ username: username}})
    if (verificacion){
        const usuario = verificacion
        if (usuario.username==username){
            res.redirect("/cambio_contrasena/"+usuario.id_usuario)
        }
        else{
            res.flash("message","El usuario no se encuentra registrado")
        }
    }
};

registro.cambiarContraseña = async(req, res) => {
    const id = req.params.id
    const {password} = req.body 
    const nuevoActualizacion = {
        password
    }
    nuevoActualizacion.password = await helpers.encryptPassword(password);
    await sql.query('UPDATE usuarios SET ? ', [nuevoActualizacion, id])
    req.flash('message','Cambio exitoso')
    res.redirect('/login')
}

registro.Login = passport.authenticate('local.signin', {
    successRedirect: '/Seguimiento',
    failureRedirect: '/Login',
    failureFlash: true
}); 

registro.cierreSesion = (req, res, next) => {
    req.logOut();
    res.redirect('/');
};

module.exports = registro;