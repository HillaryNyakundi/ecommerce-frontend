'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/api';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  isUpdating?: boolean;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: CartItemProps) {
  const { product, quantity, subtotal } = item;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
      >
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
            No Image
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.id}`}
            className="font-medium hover:text-primary transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          {product.brand && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {product.brand}
            </p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || isUpdating}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock || isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onRemove(product.id)}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold">${subtotal.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">
          ${product.price.toFixed(2)} each
        </p>
      </div>
    </div>
  );
}
