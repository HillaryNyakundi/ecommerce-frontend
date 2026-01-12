import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  UserCreateInput,
  UserUpdateInput,
  UserQueryParams,
  AccountInfo,
  AccountUpdateInput,
} from '@/types/api';

export const usersApi = {
  /**
   * Get all users (admin only)
   */
  getAll: async (params?: UserQueryParams) => {
    const { data } = await apiClient.get<PaginatedResponse<User>>('/users/', {
      params,
    });
    return data;
  },

  /**
   * Get a single user by ID (admin only)
   */
  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return data;
  },

  /**
   * Create a new user (admin only)
   */
  create: async (input: UserCreateInput) => {
    const { data } = await apiClient.post<ApiResponse<User>>('/users/', input);
    return data;
  },

  /**
   * Update an existing user (admin only)
   */
  update: async (id: number, input: UserUpdateInput) => {
    const { data } = await apiClient.put<ApiResponse<User>>(`/users/${id}`, input);
    return data;
  },

  /**
   * Delete a user (admin only)
   */
  delete: async (id: number) => {
    const { data } = await apiClient.delete<ApiResponse<User>>(`/users/${id}`);
    return data;
  },
};

export const accountApi = {
  /**
   * Get current user's account info
   */
  getMe: async () => {
    const { data } = await apiClient.get<ApiResponse<AccountInfo>>('/me/');
    return data;
  },

  /**
   * Update current user's account info
   */
  updateMe: async (input: AccountUpdateInput) => {
    const { data } = await apiClient.put<ApiResponse<AccountInfo>>('/me/', input);
    return data;
  },

  /**
   * Delete current user's account
   */
  deleteMe: async () => {
    const { data } = await apiClient.delete<ApiResponse<AccountInfo>>('/me/');
    return data;
  },
};
