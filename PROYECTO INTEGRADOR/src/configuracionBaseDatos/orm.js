const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "ecuarefillsseguimiento";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})

const usuarioModelo = require("../modelos/usuario")
const seguimientoModelo = require("../modelos/seguimiento")
const planificacion_actividadesModelo = require("../modelos/planificacion_actividades")
const etapasModelo = require("../modelos/etapas")
const etapa_personaModelo = require("../modelos/etapa_persona")
const actividadesModelo = require("../modelos/actividades") 
const personaModelo = require("../modelos/persona")
const responsableModelo = require("../modelos/responsable")

const sequelize = new Sequelize(
  'ecuarefillsseguimiento', 
  'root', 
  '', 
  {
  host: 'localhost',
  dialect: 'mysql',
  pool:{
    max:5,
    min:0,
    require:30000,
    idle: 10000
   }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

  sequelize.sync({ force: false})
  .then(() =>{
    console.log("Tablas sincronizadas")
  })

const usuario = usuarioModelo(sequelize, Sequelize)
const seguimiento = seguimientoModelo(sequelize, Sequelize)
const planificacion_actividades = planificacion_actividadesModelo(sequelize, Sequelize)
const etapas = etapasModelo(sequelize, Sequelize)
const etapa_persona = etapa_personaModelo(sequelize, Sequelize)
const actividades = actividadesModelo(sequelize, Sequelize)
const persona = personaModelo (sequelize, Sequelize)
const responsable = responsableModelo (sequelize, Sequelize)

etapas.hasMany(etapa_persona)
etapa_persona.belongsTo(etapas)

seguimiento.hasMany(etapa_persona)
etapa_persona.belongsTo(seguimiento)

persona.hasMany(etapa_persona)
etapa_persona.belongsTo(persona) 

responsable.hasMany(etapa_persona)
etapa_persona.belongsTo(responsable)

actividades.hasMany(planificacion_actividades)
planificacion_actividades.belongsTo(actividades)

etapa_persona.hasMany(planificacion_actividades)
planificacion_actividades.belongsTo(etapa_persona)

usuario.hasMany(seguimiento)
seguimiento.belongsTo(usuario)

module.exports = {
  usuario, 
  seguimiento,
  planificacion_actividades,
  etapas,
  etapa_persona,
  actividades,
  responsable,
  persona
}