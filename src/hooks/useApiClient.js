// ./hooks/useApiClient.js

import axios from 'axios';
import { refreshToken } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { useAuthenticationState } from '../context/AuthenticationState';

export const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return apiClient;
}

const useApiClient = (apiClient) => {
  const { handleFailedAuthentication } = useAuthenticationState();
  
  // define a function to set the token to the headers
  const setTokenToHeaders = () => {
    const token = localStorage.getItem('access');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  };

  apiClient.interceptors.response.use(
    response => response,
    async function(error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized" &&
        error.config.url !== '/api/token/refresh/' &&
        error.config.url !== '/api/token/' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const access_token = await refreshToken(apiClient);
        
        if (access_token !== null) {
          localStorage.setItem("access", access_token);
          originalRequest.headers.Authorization = 'Bearer ' + access_token;
          return apiClient(originalRequest);
        } else {
          handleFailedAuthentication();
        }
      }
      return Promise.reject(error);
    }
  );

  setTokenToHeaders();

  return apiClient;
};

export default useApiClient;
