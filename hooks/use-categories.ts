'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';
import type {
  CategoryQueryParams,
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@/types/api';

/**
 * Get all categories with optional filters
 */
export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoriesApi.getAll(params),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories change less frequently
  });
};

/**
 * Get a single category by ID
 */
export const useCategory = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Create a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CategoryCreateInput) => categoriesApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * Update an existing category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: CategoryUpdateInput }) =>
      categoriesApi.update(id, input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

/**
 * Delete a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
