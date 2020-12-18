const dbconfig = require('../database/config/config')
const Sequelize = require('sequelize')

const Enquete = require('../database/models/enquete')
const Usuario = require('../database/models/usuario')
const Voto = require('../database/models/voto')
const Opcao = require('../database/models/opcao')

const connection = new Sequelize(dbconfig)

Enquete.init(connection)
Usuario.init(connection)
Voto.init(connection)
Opcao.init(connection)

Enquete.associate(connection.models)
Usuario.associate(connection.models)
Voto.associate(connection.models)
Opcao.associate(connection.models)

module.exports = connection
