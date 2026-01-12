import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-light tracking-wider mb-2">
        YOUR CART IS EMPTY
      </h2>
      <p className="text-muted-foreground mb-6">
        Add some products to get started
      </p>
      <Button size="lg" asChild>
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
