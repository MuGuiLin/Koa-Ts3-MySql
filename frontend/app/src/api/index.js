import axios from 'axios';


// 配置公共URL
// axios.defaults.baseURL = 'http://localhost:8080/api/v2';
axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

// axios拦截器
axios.interceptors.response.use((success) => {
    return success;
}, (error) => {
    console.dir(error.response);
    throw error; // 抛出错误
});

// 用户注册API
export const register = (data) => {
    return axios({
        method: 'POST',
        url: '/user/regist',
        data
    });
};


// 用户登录API
export const login = (data) => {
    return axios({
        method: 'POST',
        url: '/user/login',
        data
    });
};

// 获取用户信息API
export const getUserInfo = (data) => {
    return axios({
        method: 'GET',
        url: '/user/info',
        params: data
    });
};