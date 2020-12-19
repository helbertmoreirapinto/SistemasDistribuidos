'use strict'
const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
  static init (sequelize) {
    super.init({
      nome: DataTypes.STRING,
      login: DataTypes.STRING,
      senha: DataTypes.STRING,
      token: DataTypes.STRING,
      administrador: DataTypes.BOOLEAN
    }, {
      sequelize,
      paranoid: true,
      underscored: true,
      tableName: 'usuario'
    })
  }

  static associate () {
  }
}

module.exports = Usuario
