'use strict';
const { Model, DataTypes } = require('sequelize');

class Opcao extends Model {
  static init(sequelize) {
    super.init({
      mensagem: DataTypes.STRING
    }, {
      sequelize,
      paranoid: true,
      underscored: true,
      tableName: 'opcao'
    })
  }

  static associate(models) {
    this.belongsTo(models.Enquete, {
      foreignKey: {
        field: 'enquete_id',
        name: 'enqueteId'
      },
      as: 'enquete'
    })
  }
}

module.exports = Opcao