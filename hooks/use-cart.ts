'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/lib/api';
import type {
  CartQueryParams,
  CartCreateInput,
  CartUpdateInput,
} from '@/types/api';
import { toast } from 'sonner';

/**
 * Get all carts (admin only)
 */
export const useCarts = (params?: CartQueryParams) => {
  return useQuery({
    queryKey: ['carts', params],
    queryFn: () => cartApi.getAll(params),
  });
};

/**
 * Get a single cart by ID
 */
export const useCart = (id: number, enabled = true) => {
  return useQuery({
    queryKey: ['carts', id],
    queryFn: () => cartApi.getById(id),
    enabled: enabled && !!id,
  });
};

/**
 * Create a new cart
 */
export const useCreateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CartCreateInput) => cartApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      toast.success('Cart created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create cart');
    },
  });
};

/**
 * Update an existing cart with optimistic updates
 */
export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: CartUpdateInput }) =>
      cartApi.update(id, input),
    // Optimistic update
    onMutate: async ({ id, input }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['carts', id] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(['carts', id]);

      // Optimistically update the cart
      queryClient.setQueryData(['carts', id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            cart_items: input.cart_items,
          },
        };
      });

      return { previousCart };
    },
    // If the mutation fails, roll back
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['carts', variables.id], context.previousCart);
      }
      toast.error('Failed to update cart');
    },
    // Always refetch after error or success
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['carts', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    onSuccess: () => {
      toast.success('Cart updated successfully');
    },
  });
};

/**
 * Delete a cart
 */
export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cartApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      toast.success('Cart deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete cart');
    },
  });
};

/**
 * Add item to cart - convenience hook for updating cart
 */
export const useAddToCart = (cartId: number) => {
  const updateCart = useUpdateCart();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      // Get current cart to merge items
      const currentCart = await cartApi.getById(cartId);
      const existingItems = currentCart.data.cart_items || [];

      // Check if item already exists
      const existingItemIndex = existingItems.findIndex(
        (item) => item.product_id === productId
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = existingItems.map((item, index) =>
          index === existingItemIndex
            ? { product_id: item.product_id, quantity: item.quantity + quantity }
            : { product_id: item.product_id, quantity: item.quantity }
        );
      } else {
        // Add new item
        updatedItems = [
          ...existingItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })),
          { product_id: productId, quantity },
        ];
      }

      return updateCart.mutateAsync({
        id: cartId,
        input: { cart_items: updatedItems },
      });
    },
    onSuccess: () => {
      toast.success('Item added to cart');
    },
  });
};
