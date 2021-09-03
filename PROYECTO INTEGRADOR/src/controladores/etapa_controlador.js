const etapa = {}
 
const sql = require('../configuracionBaseDatos/sql')
const orm = require('../configuracionBaseDatos/orm')

etapa.mostrar = async(req, res) => {
    const id = req.params.id
    const seguimiento = await sql.query("SELECT * FROM seguimientos WHERE id_seguimiento =?",[id])
    res.render("Etapas/agregar",{seguimiento})
}

etapa.agregar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario
    console.log(id)
    const {nombre_etapa,descripcion,observaciones,estado,seguimiento} = req.body 
    const nuevaEtapa = {
        nombre_etapa,
        descripcion,
        observaciones,
        estado,
        seguimientoIdSeguimiento: seguimiento,
        usuarioIdUsuario: ids
    }
    await orm.etapas.create(nuevaEtapa)
    req.flash("success","Exito al guardar")
    res.redirect("/Etapas/listar/"+ids)
}

etapa.listar = async(req, res) => {
    const ids = req.user.id_usuario
    const listaEtapa = await sql.query("SELECT e.*,s.nombre_seguimiento FROM etapas e JOIN seguimientos s ON e.seguimientoIdSeguimiento = s.id_seguimiento WHERE e.usuarioIdUsuario = ? ",[ids])
    res.render("Etapas/listar",{listaEtapa})
}

etapa.editar = async(req, res) => {
    const id = req.params.id
    const editarEtapa = await sql.query("SELECT * FROM etapas WHERE id_etapas = ? ",[id])
    res.render("Etapas/editar",{editarEtapa})
}

etapa.eliminar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    await orm.etapas.destroy({where:{id_etapas:id}})   
    req.flash("success","Exito al eliminar")
    res.redirect("/Etapas/listar/"+ids)
}

etapa.actualizarEtapa = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    const {nombre_etapa,descripcion,observaciones,estado} = req.body 
    const nuevaEtapa = {
        nombre_etapa,
        descripcion,
        observaciones,
        estado
    }
    await sql.query("UPDATE etapas SET ?",[nuevaEtapa, id]) 
    req.flash("success","Exito al guardar")
    res.redirect("/Etapas/listar/"+ids)
}

module.exports = etapa