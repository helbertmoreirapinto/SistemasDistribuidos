'use strict';

const sequelize = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('voto', {
      usuario_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },

      enquete_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'enquete',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      opcao_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('voto')
  }
};
