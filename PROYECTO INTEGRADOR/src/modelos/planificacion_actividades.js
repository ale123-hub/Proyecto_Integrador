const planificacion_actividades = (sequelize, type) => {
    return sequelize.define ("planificacion_actividades", {
        id_planificacion_actividades:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        resultado_actividad: type.STRING,
        fecha_evento: type.STRING,
        creacion_usuario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacion_usuario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,
    })
}
module.exports=planificacion_actividades