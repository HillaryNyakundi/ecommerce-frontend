import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from Better Auth session
    // For client-side, we'll get token from cookies/localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
              method: 'POST',
              headers: {
                'refresh-token': refreshToken,
              },
            });

            if (response.ok) {
              const newToken = await response.text();
              localStorage.setItem('auth_token', newToken);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/auth/signin';
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token, redirect to login
          window.location.href = '/auth/signin';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
