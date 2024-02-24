import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Article from "./blog/Article";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import axios, {WHO_AM_I_URL} from "./base/api";

const App = () => {
    const theme = createTheme();

    const ProtectedRoute = ({element}) => {
        // const response = axios.get(WHO_AM_I_URL, {withCredentials: true});
        const isAuthenticated = true;
        // console.log('Login successful', response.data);

        return isAuthenticated ? element : <Navigate to="/login"/>;
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Home/>} name={'home'}/>
                <Route path="/auth/login" element={<Login/>} name={'login'}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/blog/articles" element={<ProtectedRoute element={<Article/>}/>}/>
            </Routes>
        </ThemeProvider>

    );
};

export default App;