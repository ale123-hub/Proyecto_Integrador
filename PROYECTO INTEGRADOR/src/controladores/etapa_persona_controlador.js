const etapa_persona = {}

const sql = require('../configuracionBaseDatos/sql')
const orm = require('../configuracionBaseDatos/orm')

etapa_persona.mostrar = async(req, res) => {
    const id = req.params.id
    const seguimiento = await sql.query("SELECT * FROM seguimientos WHERE id_seguimiento = ?",[id])
    const listaPersonas = await sql.query("SELECT * FROM personas ")
    const listaResponsable = await sql.query("SELECT * FROM responsables")
    const listaEtapa = await sql.query("SELECT * FROM etapas") 
    res.render("Etapa_persona/agregar",{listaPersonas, listaResponsable, listaEtapa,seguimiento})
}

etapa_persona.agregar = async(req, res) => { 
    const id = req.user.id_usuario
    const {seguimiento,nombrePersona,etapa,responsable,fecha_creacion,observaciones,estado} = req.body 
    const nuevaEtapaPersona= {
        seguimientoIdSeguimiento: seguimiento,
        personaIdPersona: nombrePersona,
        etapaIdEtapas: etapa,
        responsableIdResponsable: responsable,
        fecha_creacion,
        observaciones,
        estado
    }
    await orm.etapa_persona.create(nuevaEtapaPersona)
    req.flash("success","Exito al guardar") 
    res.redirect("/Etapa_persona/listar/"+id)
}

etapa_persona.listar = async(req, res) => {
    const listaEtapa_persona = await sql.query("SELECT v.*,s.nombre_seguimiento FROM vista_etapa_personas v JOIN seguimientos s ON v.seguimientoIdSeguimiento = s.id_seguimiento")
    res.render("Etapa_persona/listar",{listaEtapa_persona})
}

etapa_persona.editar = async(req, res) => {
    const id = req.params.id
    const editarEtapaPersonas = await sql.query("SELECT * FROM etapa_personas WHERE id_etapa_persona = ? ",[id])
    res.render("Etapa_persona/editar",{editarEtapaPersonas})
}

etapa_persona.eliminar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    await orm.etapa_persona.destroy({where:{id_etapa_persona:id}})   
    req.flash("success","Exito al eliminar")
    res.redirect("/Etapa_persona/listar/"+ids)
}

etapa_persona.actualizarEtapaPersonas = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    const {observaciones,estado} = req.body 
    const nuevaEtapaPersona = {
        observaciones,
        estado
    }
    await sql.query("UPDATE etapa_personas SET ?",[nuevaEtapaPersona, id]) 
    req.flash("success","Exito al guardar")
    res.redirect("/Etapa_persona/listar/"+ids)
}

module.exports = etapa_persona