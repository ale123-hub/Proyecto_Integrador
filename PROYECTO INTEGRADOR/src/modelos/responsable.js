const responsable = (sequelize, type) => {
    return sequelize.define("responsables", {
        id_responsable:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_responsable: type. STRING,
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
module.exports = responsable