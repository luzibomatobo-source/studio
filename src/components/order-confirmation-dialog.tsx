"use client";

import { useState, useEffect, type FC } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from './ui/badge';
import type { OrderDetails } from '@/app/order/order-form';

function calculateDeliveryDates() {
    // Note: CAT is UTC+2. We'll work in UTC to avoid timezone issues with server/client.
    // 8:00 AM CAT is 6:00 AM UTC.
    const now = new Date();

    // The reference start date for all delivery calculations (Thursday)
    const cycleStartDate = new Date(Date.UTC(2025, 6, 31, 0, 0, 0)); // July is month 6 (0-indexed)

    // Calculate the milliseconds for a 2-week cycle
    const twoWeeksInMillis = 14 * 24 * 60 * 60 * 1000;

    // Find the number of full 2-week cycles that have passed since the start date
    const elapsedMillis = now.getTime() - cycleStartDate.getTime();
    let cyclesPassed = Math.ceil(elapsedMillis / twoWeeksInMillis);
    if (cyclesPassed < 0) cyclesPassed = 0;


    // Determine the next upcoming delivery date based on the current date
    let nextDeliveryDate = new Date(cycleStartDate.getTime() + cyclesPassed * twoWeeksInMillis);
    
    // The cut-off is the day before the delivery date at 8:00 AM CAT (6:00 AM UTC)
    const cutOffDate = new Date(nextDeliveryDate.getTime());
    cutOffDate.setUTCDate(cutOffDate.getUTCDate() - 1);
    cutOffDate.setUTCHours(6, 0, 0, 0);

    let firstDeliveryDate: Date;

    // If the current time is after the cut-off for the 'nextDeliveryDate',
    // the first delivery will be in the *following* cycle.
    if (now.getTime() > cutOffDate.getTime()) {
        firstDeliveryDate = new Date(nextDeliveryDate.getTime() + twoWeeksInMillis);
    } else {
        firstDeliveryDate = nextDeliveryDate;
    }

    // The second delivery is always 2 weeks after the first.
    const secondDeliveryDate = new Date(firstDeliveryDate.getTime() + twoWeeksInMillis);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

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
              <span>${orderDetails.totalCost.toFixed(2)}</span>
            </div>
             <p className="text-xs text-muted-foreground pt-1">Total cost is for a 1-month subscription (two deliveries).</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg font-headline">Delivery Details</h3>
            <p className="text-muted-foreground text-sm">Your veggie boxes will be delivered to:</p>
            <p className="font-medium text-sm">{orderDetails.address}, {orderDetails.suburb}</p>
            <p className="text-muted-foreground text-sm font-semibold">Delivery is only available in Bulawayo.</p>
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
