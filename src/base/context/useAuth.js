import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [userId, setUserId] = React.useState(null);


  const value = {
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
    userId,
    setUserId
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};