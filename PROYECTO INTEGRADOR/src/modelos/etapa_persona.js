const etapa_persona = (sequelize, type) => {
    return sequelize.define ("etapa_personas", {
        id_etapa_persona:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        observaciones: type.STRING(700),
        estado: type.BOOLEAN,
        creacion_etapa_persona:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacion_etapa_persona:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,
    })
}
module.exports=etapa_persona