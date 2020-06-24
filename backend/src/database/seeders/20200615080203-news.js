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
    return queryInterface.bulkInsert('News', [''].map((name, index) => {
      return {
        id: index + 1,
        userId: 2,
        typeId: parseInt((Math.random() + 0.5) * 25),
        title: '欧洲富裕小国，闷声发大财的典范，国民收入重要来源你肯定想不到',
        author: '沐枫',
        content: `<p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963594005/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        被意大利包围的“国中国”
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        在意大利半岛东部，有一个国家，叫做圣马力诺。圣马力诺国家不大，它是欧洲第三小国、世界第五小国。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺总面积不过60.7平方公里，人口也只有3万多，还没有中国一些村落大。不过别看这个国家不起眼，但却非常的有钱，是欧洲最富裕的国家之一。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        更有趣的是，这个国家不仅富得流油，而且是世界上为数不多的“国中国”，周边全都是意大利的领土，位于意大利罗马涅区和马尔凯区之间，距亚德里亚海仅23公里。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963594766/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        “闷声发大财”的典范
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺国家虽然算是老牌的欧洲国家，但是并没有像样的工业，你一定想不到，除了旅游业，邮票、集邮册、圣马力诺硬币得发行是圣马力诺共和国GDP的重要来源。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺的邮票设计和印刷水准都很高，山水、动物、历史遗迹等等皆融其中。邮政业务已经陪伴了这座古老的国家130多个春秋，如今仍为圣马力诺共和国的发展发挥着不可替代的作用。下图即是圣马力诺1986年发行秦始皇兵马俑邮票。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963595082/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        每一个欧洲小国，如果它被大国环绕，如果它很富有，但是却没有什么出名的工业，像圣马力诺摆在明面上的东西就只有旅游和邮票。那么，几乎可以断定，这是一个金融中心。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        摆在台面上的话：离岸金融中心；老百姓的俗称：偷税漏税中心。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺就是这样一个存在，中国古话“闷声发大财”的典范，圣马力诺的基础就在于圣马力诺银行。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        每一个欧洲富有小国的背后，都是这样的银行体系，这是他们的财富中心和动力源泉。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963595628/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        景点推荐
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        ▼圣马力诺大教堂
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺大教堂位于Titano山上，是一座新古典主义风格的天主教堂。与很多天主教堂不同，这座教堂无论是外墙还是内部都没有过分的华丽装饰。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        外墙是淡黄的大理石，内部则是纯白的雕刻，整座教堂显得十分庄重、典雅。若是在西欧看精美繁复的大教堂看得审美疲劳，圣马力诺大教堂绝对能让你眼前一亮。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963596460/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        ▼汉庭顿公园
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        该花园始建于1919年，原来是汉庭顿家属的私人花园，其后人将该园捐给了州政府，现为加州的州立公园。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        里面有藏品极为丰富的图书馆，艺术馆，植物园，及各国风情的花园，其中不乏许多中国园林特色。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963597813/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        ▼蒂塔诺山
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        在太阳就要落山时，逆光处，猛然发现在绿野茫茫的丘陵地带，突然一峰突起，它突兀直立，巨石纵横壁垒森严。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        加上山顶古堡城墙的剪影，异常狰狞险峻，形成了一夫当关、万夫莫开，固若金汤一样的防御支撑阵地。这就是圣马力诺神奇的蒂塔诺山。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963598364/1000"/>
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        如何前往
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        圣马力诺无飞机、铁路、和港口，公路总长220公里，不通飞机和火车，公路上甚至没有一个红绿灯。圣马力诺有一条1.5公里的索道连接圣马力诺市马焦雷镇至较高处的泰塔山。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        通往亚德里亚海及机场可由公路，经意大利里米尼抵达，该城亦有意大利国铁车站，固定接驳车往来圣马力诺市及里米尼两地，广受旅游者使用。
    </p>
    <p class="one-p" style="margin-top: 0px; margin-bottom: 2em; padding: 0px; line-height: 2.2; overflow-wrap: break-word; font-family: &quot;Microsoft Yahei&quot;, Avenir, &quot;Segoe UI&quot;, &quot;Hiragino Sans GB&quot;, STHeiti, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-size: 18px; white-space: normal;">
        <img class="content-picture" src="https://inews.gtimg.com/newsapp_bt/0/11963598938/1000"/>
    </p>
    <p>
        <br/>
    </p>
        `,
        cover: coverArr[parseInt((Math.random() + 0.5) * 5)],
        summary: '',
        keyword: '',
        link: '//new.qq.com/rain/a/20200621A075FF00',
        readSum: parseInt((Math.random() + 0.5) * 1000),
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
    return queryInterface.bulkDelete('News', null, {});
  }
};
