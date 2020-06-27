import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userInfo from "./plugins/userInfo";
import user from "./modules/user"
import news from "./modules/news";

export default new Vuex.Store({
  state: {
    server: {
      staticHost: process.env.VUE_APP_SERVER_STATIC_HOST
    }
  },
  plugins: [userInfo],
  mutations: {

  },
  actions: {

  },
  modules: {

    // 拆分模块
    user,

    // 新闻模块
    news
  }

});
