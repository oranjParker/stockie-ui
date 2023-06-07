// ./services/authService.js
export const refreshToken = async (apiClient) => {
  try {
    const response = await apiClient.post('/api/token/refresh/');
    if (response.data && response.data.access) {
      return response.data.access;
    }
  } catch (error) {
    return Promise.reject('Token refresh failed.');
  }
};


export const register = async (apiClient, username, password, email, is_creator) => {
  try {
    const registerResponse = await apiClient.post('/api/register/', {
      username,
      password,
      email,
      is_creator,
    });
    if (registerResponse.status === 201) {
      const loginResponse = await login(username, password);
      return loginResponse;
    }
    return registerResponse;
  } catch (error) {
    return Promise.reject('Registration failed.');
  }
};

export const login = async (apiClient, username, password) => {
  try {
    const response = await apiClient.post('/api/token/', {
      username,
      password,
    });
    return response;
  } catch (error) {
    return Promise.reject('Login failed.');
  }
};

export const logout = () => {
  // Logging out will now be handled server-side
};
