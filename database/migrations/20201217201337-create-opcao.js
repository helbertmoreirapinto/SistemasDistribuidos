'use strict';

const sequelize = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('opcao', {
      enquete_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'enquete',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      mensagem: {
        type: Sequelize.STRING,
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
    }).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE "opcao" ADD CONSTRAINT "opcao_pkey" PRIMARY KEY ("enquete_id", "id")');
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('opcao')
  }
};
