import  * as api  from "@/api";

export default {

    namespaced: true,

    state: {
        newsArr: null, //按理说这理应该是一个数组[]，但为了便为判断是否是空数据所以先赋值为null
        newsType: null
    },

    getters: {
        
    },

    mutations: {
        updateNews: (state, data) => {
            state.newsArr = data;
        },

        addNews: (state, data) => {
            if(null === state.newsArr) {
                state.newsArr = []
            }
            state.newsArr = [...state.newsArr, data];
        },

        updateNewsType: (state, data) => {
            state.newsType = data;
        },
    },

    actions: {
        addNews: async ({ }, data) => {
            return await api.addNews(data);
        },

        getOne: async ({ }, data) => {
            return api.getOneNews(data);
        },

        getAll: async ({ commit }) => {
            try {
                let res = await api.getAllNews();
                commit('updateNews', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        },

        getType: async ({ commit }) => {
            try {
                let res = await api.getNewsType();
                commit('updateNewsType', res.data);
                return res;
            } catch (error) {
                throw error;
            }
        }

    }
};
