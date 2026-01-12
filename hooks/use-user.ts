'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, accountApi } from '@/lib/api';
import type {
  UserQueryParams,
  UserCreateInput,
  UserUpdateInput,
  AccountUpdateInput,
} from '@/types/api';
import { toast } from 'sonner';

/**
 * Get all users (admin only)
 */
export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getAll(params),
  });
};

/**
 * Get a single user by ID (admin only)
 */
export const useUser = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.getById(id),
    enabled: enabled && !!id,
  });
};

/**
 * Create a new user (admin only)
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UserCreateInput) => usersApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

/**
 * Update an existing user (admin only)
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UserUpdateInput }) =>
      usersApi.update(id, input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });
};

/**
 * Delete a user (admin only)
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });
};

// ====== Account (current user) hooks ======

/**
 * Get current user's account info
 */
export const useAccount = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: () => accountApi.getMe(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if unauthorized
  });
};

/**
 * Update current user's account info
 */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AccountUpdateInput) => accountApi.updateMe(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
      toast.success('Account updated successfully');
    },
    onError: () => {
      toast.error('Failed to update account');
    },
  });
};

/**
 * Delete current user's account
 */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => accountApi.deleteMe(),
    onSuccess: () => {
      queryClient.clear(); // Clear all queries
      toast.success('Account deleted successfully');
      // Redirect to home or login page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    },
    onError: () => {
      toast.error('Failed to delete account');
    },
  });
};
