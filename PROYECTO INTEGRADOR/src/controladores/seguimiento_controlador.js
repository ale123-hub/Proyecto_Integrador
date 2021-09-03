const seguimiento = {}

const sql = require('../configuracionBaseDatos/sql')
const orm = require('../configuracionBaseDatos/orm')

seguimiento.mostrar = (req, res) => {
    res.render("Seguimiento/agregar")
}

seguimiento.agregar = async(req, res) => {
    const ids = req.user.id_usuario
    const {nombre_seguimiento,descripcion} = req.body 
    const nuevoSeguimiento = {
        nombre_seguimiento,
        descripcion,
        usuarioIdUsuario: ids
    } 
    await orm.seguimiento.create(nuevoSeguimiento)
    req.flash("success","Exito al guardar")
    res.redirect("/Seguimiento/listar/"+ids)
}

seguimiento.listar = async(req, res) => {
    const ids = req.user.id_usuario
    const listaSeguimiento = await sql.query("SELECT * FROM seguimientos WHERE usuarioIdUsuario = ? ",[ids])
    res.render("Seguimiento/listar",{listaSeguimiento})
}

seguimiento.editar = async(req, res) => {
    const id = req.params.id
    const editarSeguimiento = await sql.query("SELECT * FROM seguimientos WHERE id_seguimiento = ? ",[id])
    res.render("Seguimiento/editar",{editarSeguimiento})
}

seguimiento.actualizarSeguimiento = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    const {nombre_seguimiento,descripcion} = req.body 
    const nuevoSeguimiento = {
        nombre_seguimiento,
        descripcion
    }
    await sql.query("UPDATE seguimientos SET ?",[nuevoSeguimiento, id]) 
    req.flash("success","Exito al guardar")
    res.redirect("/Seguimiento/listar/"+ids)
}

module.exports = seguimiento