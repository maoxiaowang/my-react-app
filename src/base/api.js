import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  // 其他配置...
});

export const LOGIN_URL = '/auth/login/'
export const WHO_AM_I_URL = '/auth/whoami/'

export default axiosInstance;