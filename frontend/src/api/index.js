import axios from 'axios';


// 配置公共URL
// axios.defaults.baseURL = 'http://localhost:8080/api/v2';
axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

// axios 请求拦截器
axios.interceptors.request.use((req) => {

    try {
        /* 由于在请求后端API接口时，都要用到token，如果有每个请求中都去获取后再在headers中传token这样很繁琐，
         * 所以在这里（请求拦截器 所有的请求都会经过这里）设置后就所有的请求都有了。
         */
        let user = JSON.parse(localStorage.getItem('user-info'));
        if (user.token) {
            req.headers.common['mupiao-token'] = user.token;  // 注：mupiao-token 是根据后端接收时自定义设置的key名(一般写在配置文件中)
        }
    } catch (err) {

    }
    return req;
})

// axios 响应拦截器
axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    // console.dir(err.response);

    const { message, errorDetails = '' } = err.response.data;
    console.error(message + errorDetails);

    throw err; // 抛出错误
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

// 获取单条新闻
export const getOneNews = (data) => {
    return axios({
        url: '/news/' + data.id,
    });
};

// 获取所有新闻
export const getAllNews = () => {
    return axios({
        method: 'GET',
        url: '/news'
    });
};

// 获取所有新闻
export const getNewsType = () => {
    return axios({
        method: 'GET',
        url: '/newsType'
    });
};

// 新增所有新闻
export const addNews = (data) => {
    return axios({
        method: 'POST',
        url: '/news/add',
        data
    });
};