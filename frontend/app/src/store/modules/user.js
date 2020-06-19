import { register, login, getUserInfo } from "@/api";

export default {
    namespaced: true, //防止命名冲突，让各个模块之间互不干扰

    state: {
        userinfo: null  // 没登录之前的用户信息
    },

    mutations: {
        updateUserInfo: (state, data) => {
            state.userinfo = data
        }
    },

    actions: {
        login: async ({ commit }, data) => {
            try {
                const res = await login(data);

                commit('updateUserInfo', {
                    id: res.data.id,
                    name: res.data.username,
                    headers: res.headers
                })

                return res
            } catch (error) {

                throw error
            }
        },

        register: ({ }, data) => {

            // 调用api中的register接口
            return register(data)
        },

        userinfo: ({}, data) => {

            return getUserInfo(data);
        }

    }
};