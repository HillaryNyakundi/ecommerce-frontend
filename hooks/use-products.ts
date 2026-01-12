'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/lib/api';
import type {
  ProductQueryParams,
  ProductCreateInput,
  ProductUpdateInput,
} from '@/types/api';

/**
 * Get all products with optional filters
 */
export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get a single product by ID
 */
export const useProduct = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Create a new product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductCreateInput) => productsApi.create(input),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

/**
 * Update an existing product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductUpdateInput }) =>
      productsApi.update(id, input),
    onSuccess: (data, variables) => {
      // Invalidate the specific product and the products list
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

/**
 * Delete a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
