'use strict'

const sequelize = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('voto', {
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      enquete_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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

    }).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE "voto" ADD CONSTRAINT "voto_pkey" PRIMARY KEY ("usuario_id", "enquete_id")')
    }).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE "voto" ADD CONSTRAINT "voto_usuario_fkey" FOREIGN KEY ("usuario_id") REFERENCES usuario("id") ON DELETE NO ACTION ON UPDATE CASCADE')
    }).then(() => {
      return queryInterface.sequelize.query('ALTER TABLE "voto" ADD CONSTRAINT "voto_opcao_fkey" FOREIGN KEY ("enquete_id","opcao_id") REFERENCES opcao("enquete_id","id") ON DELETE CASCADE ON UPDATE CASCADE')
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('voto')
  }
}
