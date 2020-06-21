'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NewsType',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,          // 值自增
          primaryKey: true,             // 主键
        },

        type: {
          type: Sequelize.STRING(60),
          allowNull: true
        },

        name: {
          type: Sequelize.STRING(60),
          allowNull: false
        },

        createdAt: {
          type: Sequelize.DATE,       //日期类型
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
    return queryInterface.dropTable('NewsType');
  }
};
