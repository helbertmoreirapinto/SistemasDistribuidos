'use strict';

const { Model, DataTypes } = require('sequelize');

class Voto extends Model {
  static init(sequelize) {
    super.init({
      opcao_id: {
        type: DataTypes.INTEGER,
        name: "opcaoId"
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
        name: 'usuarioId'
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
  }
}

module.exports = Voto