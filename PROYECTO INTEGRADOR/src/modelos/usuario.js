const usuario = (sequelize, type) => {
    return sequelize.define("usuarios", {
        id_usuario:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: type.STRING,
        username: type.STRING(99),
        password: type.STRING,
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
module.exports=usuario