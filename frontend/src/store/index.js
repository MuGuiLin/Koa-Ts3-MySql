import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userInfo from "./plugins/userInfo";
import user from "./modules/user"
import news from "./modules/news";

export default new Vuex.Store({
  state: {
    // 配置后端域名
    server: {
      staticHost: process.env.VUE_APP_SERVER_STATIC_HOST
    }
  },
  plugins: [userInfo],
  mutations: {

  },
  actions: {

  },
  // 拆分模块
  modules: {

    // 用户模块
    user,

    // 新闻模块
    news
  }

});
