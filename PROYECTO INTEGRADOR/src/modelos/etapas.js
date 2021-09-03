const etapas = (sequelize, type) => {
    return sequelize.define ("etapas", {
        id_etapas:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_etapa: type.STRING,
        descripcion: type.STRING(700),
        observaciones: type.STRING(700),
        estado: type.BOOLEAN,
        creacion_etapas:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacion_etapas:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,
    })
}
module.exports=etapas