import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/';

export const register = data => {
    return axios({
        method: 'post',
        url: '/user/12345',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }
    });
}