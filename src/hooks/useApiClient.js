// ./hooks/useApiClient.js

import axios from 'axios';
import { refreshToken } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useAuthenticationState } from '../context/AuthenticationState';

const getCsrfToken = () => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const csrfCookie = cookies.find((cookie) => cookie.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
  };

export const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': getCsrfToken(), // Include the CSRF token in the request headers
    },
  });

  return apiClient;
}

const useApiClient = (apiClient) => {
  const { handleFailedAuthentication } = useAuthenticationState();
  
  apiClient.interceptors.response.use(
    response => response,
    async function(error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshToken(apiClient);
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          return apiClient(originalRequest);
        } catch (refreshError) {
          handleFailedAuthentication();
        }
      } else if (error.response.status === 429) {
        handleFailedAuthentication();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default useApiClient;