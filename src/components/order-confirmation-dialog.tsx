"use client";

import { useState, useEffect, type FC } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from './ui/badge';
import type { OrderDetails } from '@/app/order/order-form';

function calculateDeliveryDates() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let firstDeliveryDate: Date;
    let secondDeliveryDate: Date;

    const firstDayOfMonth = new Date(year, month, 1);
    const fifteenthDayOfMonth = new Date(year, month, 15);
    const firstDayOfNextMonth = new Date(year, month + 1, 1);
    const fifteenthDayOfNextMonth = new Date(year, month + 1, 15);

    if (now.getTime() <= firstDayOfMonth.getTime()) {
        firstDeliveryDate = firstDayOfMonth;
        secondDeliveryDate = fifteenthDayOfMonth;
    } else if (now.getTime() > firstDayOfMonth.getTime() && now.getTime() <= fifteenthDayOfMonth.getTime()) {
        firstDeliveryDate = fifteenthDayOfMonth;
        secondDeliveryDate = firstDayOfNextMonth;
    } else {
        firstDeliveryDate = firstDayOfNextMonth;
        secondDeliveryDate = fifteenthDayOfNextMonth;
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return {
        first: firstDeliveryDate.toLocaleDateString('en-ZA', options),
        second: secondDeliveryDate.toLocaleDateString('en-ZA', options),
    };
}

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  orderDetails: OrderDetails | null;
}

const OrderConfirmationDialog: FC<OrderConfirmationDialogProps> = ({ isOpen, onOpenChange, orderDetails }) => {
  const [deliveryDates, setDeliveryDates] = useState<{ first: string; second: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDeliveryDates(calculateDeliveryDates());
    }
  }, [isOpen]);

  if (!orderDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline text-2xl">Order Confirmed!</DialogTitle>
          <DialogDescription>
            Thank you for your order. Get ready for some farm-fresh goodness!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg font-headline">Order Summary</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Box Type:</span>
              <span className="font-medium">{orderDetails.boxName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">{orderDetails.quantity}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Payment Method:</span>
              <Badge variant={orderDetails.paymentMethod === 'card' ? 'default' : 'secondary'} className="capitalize">{orderDetails.paymentMethod}</Badge>
            </div>
            <div className="flex justify-between items-center text-xl font-bold pt-2 border-t mt-2">
              <span className="text-primary">Monthly Total:</span>
              <span>R{orderDetails.totalCost.toFixed(2)}</span>
            </div>
             <p className="text-xs text-muted-foreground pt-1">Total cost is for two deliveries per month.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg font-headline">Delivery Details</h3>
            <p className="text-muted-foreground text-sm">Your veggie boxes will be delivered to:</p>
            <p className="font-medium text-sm">{orderDetails.address}, {orderDetails.suburb}</p>
            <p className="text-muted-foreground mt-2 text-sm">Your upcoming delivery dates are:</p>
            {deliveryDates && (
              <ul className="list-disc list-inside space-y-1 font-medium text-primary text-sm">
                <li>{deliveryDates.first}</li>
                <li>{deliveryDates.second}</li>
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-accent hover:bg-accent/90">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationDialog;
