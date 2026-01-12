'use client';

import { Container } from '@/components/layout/container';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { CartEmpty } from '@/components/cart/cart-empty';
import { useCart, useUpdateCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  // For now, we'll use a hardcoded cart ID
  // In a real app, you'd get this from the user's session
  const cartId = 1;
  const { data, isLoading } = useCart(cartId);
  const updateCart = useUpdateCart();
  const router = useRouter();

  const cart = data?.data;
  const items = cart?.cart_items || [];
  const isEmpty = items.length === 0;

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (!cart) return;

    const updatedItems = items.map((item) =>
      item.product_id === productId
        ? { product_id: item.product_id, quantity }
        : { product_id: item.product_id, quantity: item.quantity }
    );

    updateCart.mutate({
      id: cartId,
      input: { cart_items: updatedItems },
    });
  };

  const handleRemoveItem = (productId: number) => {
    if (!cart) return;

    const updatedItems = items
      .filter((item) => item.product_id !== productId)
      .map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

    updateCart.mutate({
      id: cartId,
      input: { cart_items: updatedItems },
    });
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
              <div>
                <Skeleton className="h-64" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-spacing">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em] mb-2">
                SHOPPING CART
              </h1>
              {!isEmpty && (
                <p className="text-muted-foreground">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
              )}
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          {isEmpty ? (
            <CartEmpty />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border rounded-lg p-6">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      isUpdating={updateCart.isPending}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <CartSummary
                    subtotal={cart?.total_amount || 0}
                    onCheckout={handleCheckout}
                    isLoading={updateCart.isPending}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
