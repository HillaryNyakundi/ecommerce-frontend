import { apiClient } from './client';
import type {
  ApiResponse,
  SignUpInput,
  SignInInput,
  User,
} from '@/types/api';

export const authApi = {
  /**
   * Sign up a new user
   */
  signUp: async (input: SignUpInput) => {
    const { data } = await apiClient.post<ApiResponse<User>>('/auth/signup', input);
    return data;
  },

  /**
   * Sign in with username and password
   */
  signIn: async (input: SignInInput) => {
    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('password', input.password);

    const { data } = await apiClient.post<string>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data);
    }

    return data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string) => {
    const { data } = await apiClient.post<string>('/auth/refresh', null, {
      headers: {
        'refresh-token': refreshToken,
      },
    });

    // Update token in storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data);
    }

    return data;
  },

  /**
   * Sign out (clear local tokens)
   */
  signOut: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
  },
};
