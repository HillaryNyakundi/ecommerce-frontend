'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import type { SignUpInput, SignInInput } from '@/types/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * Sign up mutation
 */
export const useSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignUpInput) => authApi.signUp(input),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Account created successfully! Please sign in.');
      router.push('/auth/signin');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || error.message || 'Sign up failed';
      toast.error(message);
    },
  });
};

/**
 * Sign in mutation
 */
export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignInInput) => authApi.signIn(input),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Signed in successfully!');
      router.push('/products');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || error.message || 'Sign in failed';
      toast.error(message);
    },
  });
};

/**
 * Sign out mutation
 */
export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authApi.signOut();
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success('Signed out successfully');
      router.push('/');
    },
  });
};