import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Cart,
  CartCreateInput,
  CartUpdateInput,
  CartQueryParams,
} from '@/types/api';

export const cartApi = {
  /**
   * Get all carts (admin only)
   */
  getAll: async (params?: CartQueryParams) => {
    const { data } = await apiClient.get<PaginatedResponse<Cart>>('/carts/', {
      params,
    });
    return data;
  },

  /**
   * Get a single cart by ID
   */
  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<Cart>>(`/carts/${id}`);
    return data;
  },

  /**
   * Create a new cart
   */
  create: async (input: CartCreateInput) => {
    const { data } = await apiClient.post<ApiResponse<Cart>>('/carts/', input);
    return data;
  },

  /**
   * Update an existing cart
   */
  update: async (id: number, input: CartUpdateInput) => {
    const { data } = await apiClient.put<ApiResponse<Cart>>(`/carts/${id}`, input);
    return data;
  },

  /**
   * Delete a cart
   */
  delete: async (id: number) => {
    const { data } = await apiClient.delete<ApiResponse<Cart>>(`/carts/${id}`);
    return data;
  },
};
