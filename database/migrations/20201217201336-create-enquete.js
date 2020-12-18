'use strict';

const sequelize = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('enquete', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('NOW()'),
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('NOW()'),
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('enquete')
  }
};
