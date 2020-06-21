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

    let typeArr = ['军事', '政务', '国际', '历史', '教育', '文化', '体育', '财经', '科技', '数码', '生活', '公益', '情感', '健康', '美食', '旅游', '娱乐', '百态', '房产', '汽车', '时尚', '星座', '图片', '游戏']

    // 批量插入数据
    return queryInterface.bulkInsert('newsType', typeArr.map((name, index) => {
      return {
        id: index + 1,
        type: '未分类',
        name,
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
    return queryInterface.bulkDelete('newsType', null, {});
  }
};
