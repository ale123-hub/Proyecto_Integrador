const persona = (sequelize, type) => {
    return sequelize.define("personas", {
        id_persona:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_persona: type. STRING,
        creacion_persona:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacion_persona:{
            type: 'TIMESTAMP', 
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,
    })
}
module.exports = persona