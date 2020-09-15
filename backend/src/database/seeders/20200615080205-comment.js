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

    let coverArr = ['https://inews.gtimg.com/newsapp_bt/0/11962689583/1000', 'https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0', 'https://inews.gtimg.com/newsapp_bt/0/11960038460/1000', 'https://inews.gtimg.com/newsapp_bt/0/11963594005/1000']

    // 批量插入数据
    return queryInterface.bulkInsert('Comment', [''].map((name, index) => {
      return {
        id: index + 1,
        newsId: parseInt((Math.random() + 0.5) * 25),
        cover: coverArr[parseInt((Math.random() + 0.5) * 5)],
        score: parseInt((Math.random() + 1) * 5),
        name: '沐枫',
        content: `很好，真不错哦 `,
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
    return queryInterface.bulkDelete('Comment', null, {});
  }
};
