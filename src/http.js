import axios from 'axios'

//axios默认发送http请求时是不会在头信息中附带cookie
axios.defaults.withCredentials = true 

var instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
   // withCredentials: true
});

// http request 拦截器
// instance.interceptors.request.use(
//     config => {
//             if (sessionStorage.getItem('token') != "") {
//               config.headers.Authorization = sessionStorage.getItem('token');
//             }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
// });


export default instance;
