// ./context/AuthenticationState.js
import { useState } from 'react';
import { logout } from '../services/auth';

export const useAuthenticationState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFailedAuthentication = (apiClient) => {
    setIsLoggedIn(false);
    setUsername("");
    setErrorMessage("Session expired. Please log in again.");
    logout(apiClient);
  };

  return {
    isLoggedIn, setIsLoggedIn,
    username, setUsername,
    errorMessage, setErrorMessage,
    handleFailedAuthentication
  };
}
