'use strict';

const { Model } = require('sequelize');

class Voto extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      paranoid: true,
      underscored: true,
      tableName: 'voto'
    })
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: {
        field: 'usuario_id',
        name: 'usuarioId',
      },
      as: 'usuario'
    })

    this.belongsTo(models.Enquete, {
      foreignKey: {
        field: 'enquete_id',
        name: 'enqueteId'
      },
      as: 'enquete'
    })

    this.hasMany(models.Opcao, {
      foreignKey: {
        field: 'opcao_id',
        name: 'opcaoId'
      },
      as: 'opcao'
    })
  }
}

module.exports = Voto