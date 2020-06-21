'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('Review',
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,          // 值自增
          primaryKey: true,             // 主键
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        newsId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING(11),
          allowNull: true
        },
        name: {
          type: Sequelize.STRING(120), //字符串类型
          unique: true,                // 值唯一（不能重复）
          allowNull: false             // 不能为空
        },
        content: {
          type: Sequelize.TEXT,       //文本类型
          allowNull: false
        },
        likeSum: {
          type: Sequelize.INTEGER,    //整数类型
          defaultValue: 0             //默认值
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

    return queryInterface.dropTable('Review');
  }
};
