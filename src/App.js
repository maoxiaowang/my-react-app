import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ArticleList from "./pages/blog/ArticleList";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import ROUTES from "./config/route"
import {AuthProvider, useAuth} from "./context/useAuth";
import NotFound from "./pages/shared/NotFound";
import ArticleCreate from "./pages/blog/ArticleCreate";


const App = () => {
    const theme = createTheme();

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

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route path={ROUTES.homePage} element={<Home/>}/>
                    <Route path={ROUTES.auth.loginPage} element={<Login/>}/>
                    <Route path={ROUTES.auth.registerPage} element={<Register/>}/>
                    <Route path={ROUTES.blog.articleListPage} element={<ProtectedRoute element={<ArticleList/>}/>}/>
                    <Route path={ROUTES.blog.articleCreatePage} element={<ProtectedRoute element={<ArticleCreate/>}/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;