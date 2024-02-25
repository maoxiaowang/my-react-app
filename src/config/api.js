export const BASE_URL = 'https://localhost/api/v1';

const API = {
    auth: {
        obtainToken: '/auth/token/obtain/',
        destroyToken: '/auth/token/destroy/',
        refreshToken: '/auth/token/refresh/',
        whoami: '/auth/whoami/'
    },
    blog: {
        articles: '/blog/articles/',
        article: '/blog/article/'
    }

};
export default API;
