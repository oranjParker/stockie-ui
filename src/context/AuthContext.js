// ./context/AuthContext.js
import React, { useState, useEffect, useContext } from "react";
import { login, register, logout } from '../services/auth';
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

  const handleAuth = async (authFunction, ...params) => {
    try {
      const response = await authFunction(apiClient, ...params);
      if (response.data) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('username', params[0]);
        setIsLoggedIn(true);
        setUsername(params[0]);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleLogin = async (username, password) => {
    handleAuth(login, username, password);
  };

  const handleRegister = async (username, password, email, isCreator) => {
    handleAuth(register, username, password, email, isCreator);
  };

  const handleLogout = () => {
    logout(apiClient);
    setIsLoggedIn(false);
    setUsername("");
  };

    useEffect(() => {
      const token = localStorage.getItem('access');
      const user = localStorage.getItem('username');
      
      // if token exists in localstorage, user is assumed to be authenticated
      if (token) {
        setIsLoggedIn(true);
        setUsername(user);
      }
    }, []);  // the empty array means this runs once on mount

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
