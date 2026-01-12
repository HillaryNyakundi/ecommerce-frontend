import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductCreateInput,
  ProductUpdateInput,
  ProductQueryParams,
} from '@/types/api';

export const productsApi = {
  /**
   * Get all products with optional pagination and search
   */
  getAll: async (params?: ProductQueryParams) => {
    const { data } = await apiClient.get<PaginatedResponse<Product>>('/products/', {
      params,
    });
    return data;
  },

  /**
   * Get a single product by ID
   */
  getById: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return data;
  },

  /**
   * Create a new product (admin only)
   */
  create: async (input: ProductCreateInput) => {
    const { data } = await apiClient.post<ApiResponse<Product>>('/products/', input);
    return data;
  },

  /**
   * Update an existing product (admin only)
   */
  update: async (id: number, input: ProductUpdateInput) => {
    const { data } = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, input);
    return data;
  },

  /**
   * Delete a product (admin only)
   */
  delete: async (id: number) => {
    const { data } = await apiClient.delete<ApiResponse<Product>>(`/products/${id}`);
    return data;
  },
};
