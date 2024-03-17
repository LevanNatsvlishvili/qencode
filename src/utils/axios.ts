import axios from 'axios';
import { getAccessToken, getRefreshToken, removeAuthTokens, setAuthTokens } from '@/utils/authTokens';
import { refreshToken } from '@/services/Auth';

const axiosRemote = axios.create({
  baseURL: 'https://auth-qa.qencode.com/v1',
});

// Function to refresh the access token using the refresh token
const refreshAccessToken = async () => {
  const refresh_token = getRefreshToken();
  console.log(refresh_token, 'refresh_token');
  if (refresh_token) {
    try {
      const response = await refreshToken(refresh_token);
      console.log('refreshTokens,', response);
      setAuthTokens(response.data.access_token, response.data.refresh_token);
      return response.data.accessToken;
    } catch (error) {
      // Refresh token is invalid, remove tokens and redirect to login
      removeAuthTokens();
      window.location.href = '/login';
      throw error;
    }
  } else {
    // No refresh token, redirect to login
    removeAuthTokens();
    window.location.href = '/login';
    throw new Error('No refresh token available');
  }
};

// Request interceptor to attach the access token to every request
axiosRemote.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle 401 responses and refresh the access token
axiosRemote.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error.response.status);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log(originalRequest.headers.Authorization);
        return axiosRemote(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.log(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosRemote;
