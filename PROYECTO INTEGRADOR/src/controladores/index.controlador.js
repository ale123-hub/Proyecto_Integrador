const index = {}

const sql = require ("../configuracionBaseDatos/sql")

index.mostrar = (req, res) => {
    res.render("index")
} 

index.mandar = async (req, res) => {
    const persona = await sql.query ('SELECT * FROM personas')
    if (persona.length == 0){
        const personas = persona[0]
        if (personas === undefined){
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (1,"Adrián")')
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (2,"Cinthia")')
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (3,"Bryan")')
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (4,"Miguel")')
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (5,"Karolina")')
            await sql.query ('INSERT INTO personas (id_persona,nombre_persona) VALUES (6,"Alejandro")') 
            await sql.query ('CREATE VIEW vista_etapa_personas AS SELECT ep.*,e.nombre_etapa, p.nombre_persona, r.nombre_responsable FROM etapa_personas ep JOIN etapas e ON ep.etapaIdEtapas = e.id_etapas JOIN personas p ON ep.personaIdPersona = p.id_persona JOIN responsables r ON ep.responsableIdResponsable = r.id_responsable;')
            await sql.query ('CREATE VIEW planificacion_actividades_vista AS SELECT a.nombre_actividades,p.*,ep.id_etapa_persona,ps.nombre_persona FROM actividades a JOIN planificacion_actividades p ON p.actividadeIdActividades = a.id_actividades JOIN etapa_personas ep ON p.etapaPersonaIdEtapaPersona = ep.id_etapa_persona JOIN personas ps ON ep.personaIdPersona = ps.id_persona;')
        }
    }

    const etapa = await sql.query ('SELECT * FROM etapas')
    if(etapa.length == 0){
        const etapas = etapa[0]
        if(etapas === undefined){
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (1,"Monitoreo quejas")')
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (2,"Monitoreo de consejo")')
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (3,"Monitoreo de comentarios")')
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (4,"Mantener contacto")')
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (5,"Ataque preventivo")')
            await sql.query ('INSERT INTO etapas (id_etapas,nombre_etapa) VALUES (6,"Enfoque despues de la venta")')
        }
    }

    
    const actividad = await sql.query ('SELECT * FROM actividades')
    if(actividad.length == 0){
        const actividades = actividad[0]
        if(actividades === undefined){
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (1,"Llamandas")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (2,"Envio de correo")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (3,"Envio de enlaces")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (4,"Sitio web")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (5,"Redes sociales")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (6,"Codigo qr")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (7,"Registro de comentarios")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (8,"Registro de quejas")')
            await sql.query ('INSERT INTO actividades (id_actividades,nombre_actividades) VALUES (9,"registro de sugerencias")')
        }
    }
    
    const responsable = await sql.query ('SELECT * FROM responsables')
    if (responsable.length == 0){ 
        const responsables = responsable[0]
        if (responsables === undefined){
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (1,"Jorge")')
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (2,"Manuel")')
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (3,"Carlos")')
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (4,"Dario")')
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (5,"Germán")')
            await sql.query ('INSERT INTO responsables (id_responsable,nombre_responsable) VALUES (6,"Mateo")')  
        }
    }
    res.redirect('/login')
}

module.exports = index 