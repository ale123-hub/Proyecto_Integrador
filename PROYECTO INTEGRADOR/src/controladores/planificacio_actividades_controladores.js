const planificaion_actividad = {}

const sql = require('../configuracionBaseDatos/sql')
const orm = require('../configuracionBaseDatos/orm')

planificaion_actividad.mostrar = async(req, res) => {
    const id = req.params.id 
    const etapaPersona = await sql.query("SELECT * FROM vista_etapa_personas WHERE responsableIdResponsable = ?",[id])
    const responsable = await sql.query("SELECT * FROM responsables WHERE id_responsable = ?",[id])
    const listaActividades = await sql.query("SELECT * FROM actividades") 
    res.render("Planificacion_actividades/agregar",{responsable, listaActividades,etapaPersona})
}
 
planificaion_actividad.agregar = async(req, res) => {
    const id = req.user.id_usuario
    const {etapaPersona,actividadeIdActividades,fecha_evento,resultado_actividad} = req.body 
    const nuevaPlanificacionActividad= {
        etapaPersonaIdEtapaPersona: etapaPersona,
        actividadeIdActividades: actividadeIdActividades,
        fecha_evento, 
        resultado_actividad
    }
    await orm.planificacion_actividades.create(nuevaPlanificacionActividad)
    req.flash("success","Exito al guardar") 
    res.redirect("/Planificacion_actividades/listar/"+id)
}

planificaion_actividad.listar = async(req, res) => {
    const listaplanificaion_actividad = await sql.query("SELECT * FROM planificacion_actividades_vista")
    res.render("Planificacion_actividades/listar",{listaplanificaion_actividad})
}

planificaion_actividad.editar = async(req, res) => {
    const id = req.params.id
    const editarPlanificacionActividades = await sql.query("SELECT * FROM planificacion_actividades WHERE id_planificacion_actividades = ? ",[id])
    res.render("Planificacion_actividades/editar",{editarPlanificacionActividades})
}

planificaion_actividad.eliminar = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    await orm.planificacion_actividades.destroy({where:{id_planificacion_actividades:id}})   
    req.flash("success","Exito al eliminar")
    res.redirect("/Planificacion_actividades/listar/"+ids)
}

planificaion_actividad.actualizarPlanificacionActividades = async(req, res) => {
    const id = req.params.id
    const ids = req.user.id_usuario 
    const {fecha_evento,resultado_actividad} = req.body  
    const nuevaPlanificacionActividad = {
        fecha_evento,
        resultado_actividad
    }
    await sql.query("UPDATE planificacion_actividades SET ?",[nuevaPlanificacionActividad, id]) 
    req.flash("success","Exito al guardar")
    res.redirect("/Planificacion_actividades/listar/"+ids)
}

module.exports = planificaion_actividad 