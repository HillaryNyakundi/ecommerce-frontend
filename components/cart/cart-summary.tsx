import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  onCheckout?: () => void;
  isLoading?: boolean;
}

export function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  onCheckout,
  isLoading,
}: CartSummaryProps) {
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-muted/40">
      <h2 className="text-lg font-semibold uppercase tracking-wider">
        Order Summary
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
        )}

        {shipping === 0 && subtotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {onCheckout && (
        <Button
          size="lg"
          className="w-full"
          onClick={onCheckout}
          disabled={isLoading || subtotal === 0}
        >
          Proceed to Checkout
        </Button>
      )}

      <p className="text-xs text-center text-muted-foreground">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
}
