'use strict';

const users = require("../models/users");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }, allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      albumID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  }
};