export const BASE_URL = 'https://localhost:8000/api/v1';

const API = {
    auth: {
        obtainToken: '/auth/token/obtain/',
        destroyToken: '/auth/token/destroy/',
        refreshToken: '/auth/token/refresh/',
        whoami: '/auth/whoami/',
        register: '/auth/register/'
    },
    blog: {
        articles: '/blog/articles/',
        article: '/blog/article/{articleId}/'
    }

};
export default API;
