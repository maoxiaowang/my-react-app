import axios from 'axios';
import {BASE_URL} from "./config/api";
import { useNavigate } from 'react-router-dom';
import ROUTES from "./config/route";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // 其他配置...
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    const navigate = useNavigate();
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      // 如果响应状态码是 401，执行重定向到登录页面的操作
      navigate(ROUTES.auth.loginPage); // 使用 React Router 的 navigate 函数重定向
      return Promise.reject(error); // 返回一个被拒绝的 Promise，以便在调用方处理
    }
    // 处理其他响应错误
    return Promise.reject(error);
  }
);

export default axiosInstance;