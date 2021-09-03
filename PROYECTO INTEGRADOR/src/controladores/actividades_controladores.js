const actividades = {}

const sql = require('../configuracionBaseDatos/sql')
const orm = require('../configuracionBaseDatos/orm')

actividades.mostrar = (req, res) => {
    res.render("Actividades/agregar")
}
 
actividades.agregar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario
    const {nombre_actividades,descripcion_actividad,estado} = req.body 
    const nuevaActividad = {
        nombre_actividades,
        descripcion_actividad,
        estado,
        usuarioIdUsuario: ids
    }
    await orm.actividades.create(nuevaActividad)
    req.flash("success","Exito al guardar")
    res.redirect("/Actividades/listar/"+ids)
}

actividades.listar = async(req, res) => {
    const ids = req.user.id_usuario
    const listaActividades = await sql.query("SELECT * FROM actividades WHERE usuarioIdUsuario = ? ",[ids])
    res.render("Actividades/listar",{listaActividades})
}

actividades.editar = async(req, res) => {
    const id = req.params.id
    const editarActividades = await sql.query("SELECT * FROM actividades WHERE id_actividades = ? ",[id])
    res.render("Actividades/editar",{editarActividades})
}

actividades.eliminar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    await orm.actividades.destroy({where:{id_actividades:id}})   
    req.flash("success","Exito al eliminar")
    res.redirect("/Actividades/listar/"+ids)
}

actividades.actualizarActividades = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    const {nombre_actividades,descripcion_actividad,estado} = req.body 
    const nuevaActividad = {
        nombre_actividades,
        descripcion_actividad,
        estado
    }
    await sql.query("UPDATE actividades SET ?",[nuevaActividad, id]) 
    req.flash("success","Exito al guardar")
    res.redirect("/Actividades/listar/"+ids)
}

module.exports = actividades