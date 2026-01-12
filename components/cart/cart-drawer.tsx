'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from './cart-item';
import { CartEmpty } from './cart-empty';
import Link from 'next/link';
import type { Cart } from '@/types/api';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart?: Cart;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  isUpdating?: boolean;
}

export function CartDrawer({
  open,
  onOpenChange,
  cart,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: CartDrawerProps) {
  const items = cart?.cart_items || [];
  const isEmpty = items.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex items-center">
            <CartEmpty />
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <div className="space-y-2">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                    isUpdating={isUpdating}
                  />
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${cart?.total_amount.toFixed(2) || '0.00'}</span>
              </div>

              <div className="space-y-2">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/cart" onClick={() => onOpenChange(false)}>
                    View Cart
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href="/checkout" onClick={() => onOpenChange(false)}>
                    Checkout
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
