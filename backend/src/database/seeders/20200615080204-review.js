'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    let date = new Date();

    // 批量插入数据
    return queryInterface.bulkInsert('Review', [''].map((name, index) => {
      return {
        id: index + 1,
        userId: 2,
        newsId: 1,
        phone: '',
        name: '穆飘',
        content: '内容很好 666 ~',
        likeSum: parseInt((Math.random() + 0.5) * 1000),
        createdAt: date,
        updatedAt: date
      }
    }));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    // 清除表中所有数据
    return queryInterface.bulkDelete('Review', null, {});
  }
};
