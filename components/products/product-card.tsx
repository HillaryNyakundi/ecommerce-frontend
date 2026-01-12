import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice =
    product.price - (product.price * product.discount_percentage) / 100;
  const hasDiscount = product.discount_percentage > 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {hasDiscount && (
              <Badge variant="destructive">-{product.discount_percentage}%</Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="secondary">Low Stock</Badge>
            )}
            {product.stock === 0 && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
            </div>

            {product.brand && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
            )}

            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">
                ${hasDiscount ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
              </p>
              {hasDiscount && (
                <p className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic will be implemented
            console.log('Add to cart:', product.id);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
