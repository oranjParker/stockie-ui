// ./context/AuthContext.js
import React, { useState, useEffect, useContext } from "react";
import { login, register, logout } from '../services/authService';
import { useAuthenticationState } from './AuthenticationState';
import useApiClient, { createApiClient } from '../hooks/useApiClient';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const apiClient = createApiClient();
  useApiClient(apiClient);

  const {
    isLoggedIn, setIsLoggedIn,
    username, setUsername,
    errorMessage, setErrorMessage,
    handleFailedAuthentication
  } = useAuthenticationState();

  const [csrfToken, setCsrfToken] = useState("");

  const handleAuth = async (authFunction, ...params) => {
    try {
      const response = await authFunction(apiClient, ...params);
      if (response.data) {
        setIsLoggedIn(true);
        setUsername(params[0]);
        setErrorMessage("");
      }
    } catch (error) {
      const message = error.response ? error.response.data.detail : "An error occurred.";
      setErrorMessage(message);
    };
  };

  const handleLogin = async (username, password) => {
    handleAuth(login, username, password);
  };

  const handleRegister = async (username, password, email, isCreator) => {
    handleAuth(register, username, password, email, isCreator);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    apiClient.defaults.headers['Authorization'] = null;
  };

  useEffect(() => {
      const checkAuthentication = async () => {
          try {
              const response = await apiClient.get('/api/check-authentication/');
              if (response.data.authenticated) {
                  setIsLoggedIn(true);
                  setUsername(response.data.username);
              } else {
                  setIsLoggedIn(false);
                  handleFailedAuthentication(apiClient);
              }
          } catch (error) {
            handleFailedAuthentication();
          }
      };

      checkAuthentication();
  }, []); // the empty array means this runs once on mount


  const authContextValue = {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
    handleRegister,
    errorMessage,
    setErrorMessage,
    handleFailedAuthentication,
  };

  console.log({ authContextValue });

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
