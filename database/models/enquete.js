'use strict';
const { Model, DataTypes } = require('sequelize');

class Enquete extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
    }, {
      sequelize,
      paranoid: true,
      underscored: true,
      tableName: 'enquete',
    });
  }
  static associate() {
  }
}

module.exports = Enquete
