'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('News',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,          // 值自增
          primaryKey: true,             // 主键
        },

        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        title: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },

        author: {
          type: Sequelize.CHAR(60),
          allowNull: true
        },

        content: {
          type: Sequelize.TEXT,
          allowNull: true
        },

        cover: {
          type: Sequelize.STRING,
          allowNull: true
        },

        summary: {
          type: Sequelize.STRING,
          allowNull: true
        },

        keyword: {
          type: Sequelize.STRING,
          allowNull: true
        },

        link: {
          type: Sequelize.STRING,
          allowNull: true
        },

        readSum: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        likeSum: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        charset: 'utf8mb4'
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('News');
  }
};
