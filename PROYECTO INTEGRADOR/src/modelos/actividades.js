const actividades = (sequelize, type) => {
    return sequelize.define ("actividades", {
        id_actividades:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_actividades: type.STRING,
        descripcion_actividad: type.STRING(700),
        estado: type.BOOLEAN,
        creacion_actividades:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        },
        actualizacion_actividades:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,  
    })
}
module.exports=actividades 