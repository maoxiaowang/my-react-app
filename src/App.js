import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ArticleList from "./pages/blog/ArticleList";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Backdrop, CircularProgress, CssBaseline, Slide, Snackbar} from "@mui/material";
import ROUTES from "./config/route"
import {AuthProvider, useAuth} from "./context/useAuth";
import NotFound from "./pages/shared/NotFound";
import ArticleCreate from "./pages/blog/ArticleCreate";
import Alert from "@mui/material/Alert";
import useSnackbar from "./hooks/useSnackBar";
import {axiosInstance, baseAxiosInstance} from "./services/axios";
import useBackdrop from "./hooks/useBackdrop";
import Typography from "@mui/material/Typography";
import ArticleDetail from "./pages/blog/ArticleDetail";


const App = () => {
    const theme = createTheme({
        spacing: 8,  // default
    });
    const {backdropOpen, backdropMessage, openBackdrop, closeBackdrop} = useBackdrop();

    const ProtectedRoute = ({element}) => {
        const {isAuthenticated} = useAuth();
        console.log('ProtectedRoute isAuthenticated', isAuthenticated)
        // Render the protected route or redirect to login page based on isAuthenticated
        return isAuthenticated ? element : <Navigate to={ROUTES.auth.loginPage} replace={true}/>;
    };

    // const LoginRoute = ({element}) => {
    //     const {isAuthenticated} = useAuth();
    //     console.log('LoginRoute isAuthenticated', isAuthenticated)
    //     return isAuthenticated ? <Navigate to={ROUTES.homePage}/> : element;
    // }

    const {
        snackbarOpen, snackbarMessage, snackbarSeverity,
        openSnackbar, closeSnackbar
    } = useSnackbar();

    // 请求拦截器
    axiosInstance.interceptors.request.use(
        (config) => {
            openBackdrop();
            return config;
        },
        (error) => {
            closeBackdrop();
            return Promise.reject(error);
        }
    );
    // 响应拦截器
    axiosInstance.interceptors.response.use(
        (response) => {
            closeBackdrop();
            // 对响应数据做点什么
            return response;
        },
        (error) => {
            closeBackdrop();
            // 对响应错误做点什么
            if (error.response) {
                if (error.response.status === 400) {
                    const errData = error.response.data;
                    Object.keys(errData).forEach((fieldName) => {
                        const messages = errData[fieldName];
                        const combinedMessage = messages.join(', ');
                        openSnackbar(`${fieldName}: ${combinedMessage}`, 'error');
                    });
                    return Promise.reject(error)
                }
                if (error.response.status === 401) {
                    // 如果响应状态码是 401，执行重定向到登录页面的操作
                    openSnackbar('请登录');
                    return Promise.reject(error);
                } else {
                    openSnackbar(error.response.data.detail, 'error')
                }

                // window.location.href = ROUTES.auth.loginPage; // 使用 React Router 的 navigate 函数重定向
                return Promise.reject(error); // 返回一个被拒绝的 Promise，以便在调用方处理
            }
            // 处理其他响应错误
            return Promise.reject(error);
        }
    );
    baseAxiosInstance.interceptors.request.use(
        (config) => {
            openBackdrop();
            return config;
        },
        (error) => {
            closeBackdrop();
            return Promise.reject(error);
        }
    );
    baseAxiosInstance.interceptors.response.use(
        (response) => {
            closeBackdrop();
            return response;
        },
        (error) => {
            closeBackdrop();
            return Promise.reject(error);
        }
    );

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {/* 路由 */}
                <Routes>
                    <Route path={ROUTES.homePage} element={<Home/>}/>
                    <Route path={ROUTES.auth.loginPage} element={<Login/>}/>
                    <Route path={ROUTES.auth.registerPage} element={<Register/>}/>
                    <Route path={ROUTES.blog.articleListPage} element={<ArticleList/>}/>
                    <Route path={ROUTES.blog.articleCreatePage}
                           element={<ProtectedRoute element={<ArticleCreate/>}/>}></Route>
                    <Route path={`${ROUTES.blog.articleDetailPage}/:articleId`} element={<ArticleDetail/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
                {/* 弹出提示 */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={closeSnackbar}
                    TransitionComponent={Slide}
                >
                    <Alert onClose={closeSnackbar} severity={snackbarSeverity} variant="filled">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                {/* 遮罩层 */}
                <Backdrop open={backdropOpen} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress sx={{color: "#fff"}}/>
                    {backdropMessage && <Typography sx={{ color: '#fff', marginLeft: 2 }}>{backdropMessage}</Typography>}
                </Backdrop>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;