import {createContext, useContext, useEffect, useState} from 'react';
import {axiosInstance, baseAxiosInstance} from "../services/axios";
import API from "../config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    console.log('AuthProvider')

    // Get user server state
    useEffect(() => {
        // Get user local state
        console.log('AuthProvider init')
        axiosInstance.get(API.auth.whoami) // Identification check
            .then(response => {
                const user = response.data;
                setIsAuthenticated(!!user.id);
                setUsername(user.username);
                setUserId(user.id);
            })
            .catch(error => {
                setIsAuthenticated(false);
                setUsername('');
                setUserId(null);
            });
    }, []);

    // Function to handle login and store tokens in cookies
    const login = (username, password) => {
        return baseAxiosInstance.post(
            API.auth.obtainToken, {
                username: username,
                password: password,
            })
            .then(
                response => {
                    console.debug('login successfully')
                    setIsAuthenticated(true);
                    const data = response.data;
                    setUsername(data.user.username); // Set username if available
                    setUserId(data.user.id); // Set userId if available
                    setToken(data.access);
                }
            )
            .catch(error => {
                console.error('Login failed:', error);
                return Promise.reject(error);
            });
    };

    // Function to handle logout and clear cookies
    const logout = () => {
        return axiosInstance.delete(API.auth.destroyToken).then(response => {
            console.debug('logout successfully')
            setIsAuthenticated(false)
            setUsername('')
            setUserId(null)
            setToken(null)
        })
    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        userId,
        setUserId,
        token,
        setToken,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
