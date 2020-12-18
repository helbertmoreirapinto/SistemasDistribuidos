'use strict';

const { Model, DataTypes } = require('sequelize');

class Voto extends Model {
  static init(sequelize) {
    super.init({
      opcaoId: {
        type: DataTypes.INTEGER,
        field: "opcao_id"
      }
    }, {
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
      primaryKey: true,
      as: 'usuario'
    })

    this.belongsTo(models.Enquete, {
      foreignKey: {
        field: 'enquete_id',
        name: 'enqueteId'
      },
      primaryKey: true,
      as: 'enquete'
    })
  }
}

module.exports = Voto