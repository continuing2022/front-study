import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

baseUrl.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
} , error => {
  // 对请求错误做些什么
  return Promise.reject(error);
} );  

baseUrl.interceptors.response.use(response => {   
  // 对响应数据做些什么
  return response;
}, error => {
  // 对响应错误做些什么
  return Promise.reject(error);
});
export default baseUrl;