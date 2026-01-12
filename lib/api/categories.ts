import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
  CategoryQueryParams,
} from '@/types/api';

export const categoriesApi = {
  /**
   * Get all categories with optional pagination and search
   */
  getAll: async (params?: CategoryQueryParams) => {
    const { data } = await apiClient.get<PaginatedResponse<Category>>('/categories/', {
      params,
    });
    return data;
  },

  /**
   * Get a single category by ID
   */
  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return data;
  },

  /**
   * Create a new category (admin only)
   */
  create: async (input: CategoryCreateInput) => {
    const { data } = await apiClient.post<ApiResponse<Category>>('/categories/', input);
    return data;
  },

  /**
   * Update an existing category (admin only)
   */
  update: async (id: number, input: CategoryUpdateInput) => {
    const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, input);
    return data;
  },

  /**
   * Delete a category (admin only)
   */
  delete: async (id: number) => {
    const { data } = await apiClient.delete<ApiResponse<Category>>(`/categories/${id}`);
    return data;
  },
};
