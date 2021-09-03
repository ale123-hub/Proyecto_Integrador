const seguimiento = (sequelize, type) => {
    return sequelize.define ("seguimientos", {
        id_seguimiento:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_seguimiento: type.STRING,
        descripcion: type.STRING(700),
        creacion_seguimiento:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacion_seguimiento:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'), 
            allowNull: false
        }
    },{
        timestamps: false,
    })
}
module.exports=seguimiento