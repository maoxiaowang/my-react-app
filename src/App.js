import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Article from "./blog/Article";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import ROUTES from "./base/config/route"
import {AuthProvider, useAuth} from "./base/context/useAuth";
import axiosInstance from "./base/axios";
import API from "./base/config/api";


const App = () => {
    const theme = createTheme();

    const ProtectedRoute = ({element}) => {
        const {isAuthenticated, setIsAuthenticated, setUsername, setUserId} = useAuth();
        // const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            // Add your logic to check authentication status, possibly by making an API request
            const checkAuthentication = async () => {
                try {
                    const response = await axiosInstance.get(API.auth.whoami, {withCredentials: true});
                    const user = response.data.user;
                    const isAuthenticatedFromServer = user.id !== null;
                    console.log('user', user);
                    setIsAuthenticated(isAuthenticatedFromServer);
                    console.log('isAuthenticatedFromServer', isAuthenticatedFromServer)
                    setUsername(user.username);
                    setUserId(user.id);
                } catch (error) {
                    console.error('Error checking authentication status:', error);
                }
            };

            checkAuthentication().then(r => {
            });
        }, [setIsAuthenticated, setUsername, setUserId]);

        // if (loading) {
        //     console.log('1111111loading')
        //     // Render a loading state if still waiting for authentication check
        //     return <div>Loading...</div>;
        // }

        console.log('isAuthenticated', isAuthenticated)
        // Render the protected route or redirect to login page based on isAuthenticated
        return isAuthenticated ? element : <Navigate to={ROUTES.auth.loginPage}/>;
    };

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route path={ROUTES.homePage} element={<Home/>}/>
                    <Route path={ROUTES.auth.loginPage} element={<Login/>}/>
                    <Route path={ROUTES.auth.registerPage} element={<Register/>}/>
                    <Route path={ROUTES.blog.articlePage} element={<ProtectedRoute element={<Article/>}/>}/>
                </Routes>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;