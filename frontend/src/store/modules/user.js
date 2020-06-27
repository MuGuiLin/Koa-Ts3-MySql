import { register, login, getUserInfo } from "@/api";

export default {
    namespaced: true, //防止命名冲突，让各个模块之间互不干扰

    state: {
        userinfo: null,  // 没登录之前的用户信息
        logout: 666
    },

    mutations: {
        // 从本地存储中获取用户信息
        selectUserInfo: (state, user) => {
            try {
                // 如果没有获取到， JSON.parse()方法会报错的！注：这里的逻辑改写到plugins插件中的
                // let user = JSON.parse(localStorage.getItem('user-info'));

                state.userinfo = user;
            } catch (error) {
                throw '没有在本地存储中获取到用户信息！'
            }
        },

        // 用户登录后更新 并 持久化用户信息
        updateUserInfo: (state, data) => {
            state.userinfo = data;

            // 为了在用户已登录的情况下，刷新页面后还能获取到用户信息，注：这里的逻辑改写到plugins插件中的
            // localStorage.setItem('user-info', JSON.stringify(data));
        }
    },

    actions: {
        async login({ commit }, data) {
            try {
                const res = await login(data);

                commit('updateUserInfo', {
                    id: res.data.id,
                    name: res.data.username,
                    token: res.headers.token,
                    headers: res.headers
                });

                return res
            } catch (error) {

                throw error;
            }
        },

        async register({ }, data) {

            // 调用api中的register接口
            // return await register(data);

            // 或用Promise返回
            return new Promise((resolve, reject) => {
                try {
                    let res = register(data);
                    console.log('------------', res);
                    resolve(res);
                } catch (err) {
                    console.error('------------', err);
                    reject(err);
                }
            });
        },

        userinfo: ({ }, data) => {

            return getUserInfo(data);
        }

    }
};