
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { QuantityInput } from "@/components/quantity-input";
import OrderConfirmationDialog from "@/components/order-confirmation-dialog";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const boxOptions = [
  { id: 'essentials', name: 'Essentials Box', price: 8 },
  { id: 'family', name: 'Family Value Box', price: 15 },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  surname: z.string().min(2, "Surname must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(5, "Please enter a valid street address."),
  suburb: z.string().min(2, "Please enter a valid suburb."),
  deliveryNotes: z.string().optional(),
  boxSelection: z.enum(["essentials", "family"], { required_error: "You need to select a box type." }),
  quantity: z.coerce.number().min(1).max(10, "Maximum of 10 boxes per order."),
  paymentMethod: z.enum(["card", "cash"], { required_error: "You need to select a payment method." }),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'cash' && data.quantity > 5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "For cash on delivery, the maximum quantity is 5 boxes.",
      path: ["quantity"],
    });
  }
});

export type OrderDetails = z.infer<typeof formSchema> & {
    orderNumber: string;
    totalCost: number;
    boxName: string;
};

export default function OrderForm() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [orderNumber, setOrderNumber] = useState("");
    const [totalCost, setTotalCost] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [confirmedOrderDetails, setConfirmedOrderDetails] = useState<OrderDetails | null>(null);
    
    const preselectedBox = searchParams.get('box');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            address: "",
            suburb: "",
            deliveryNotes: "",
            boxSelection: preselectedBox === 'family' ? 'family' : (preselectedBox === 'essentials' ? 'essentials' : undefined),
            quantity: 1,
            paymentMethod: undefined,
        },
    });

    const { watch, setValue } = form;
    const boxSelection = watch("boxSelection");
    const quantity = watch("quantity");
    const paymentMethod = watch("paymentMethod");

    useEffect(() => {
        // Generate a unique order number on component mount
        setOrderNumber(`SH-${Date.now().toString().slice(-6)}`);
    }, []);

    useEffect(() => {
        if (boxSelection && quantity) {
            const selectedBox = boxOptions.find(box => box.id === boxSelection);
            if (selectedBox) {
                // Total cost is for a one month subscription (twice per month delivery)
                const cost = selectedBox.price * quantity * 2;
                setTotalCost(cost);
            }
        } else {
            setTotalCost(0);
        }
    }, [boxSelection, quantity]);

    // Reset quantity if it violates cash on delivery rule
    useEffect(() => {
        if (paymentMethod === 'cash' && quantity > 5) {
            setValue('quantity', 5);
            toast({
                title: "Quantity Adjusted",
                description: "Max 5 boxes for cash on delivery. We've adjusted the quantity for you.",
                variant: "default",
            });
        }
    }, [paymentMethod, quantity, setValue, toast]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        const selectedBox = boxOptions.find(box => box.id === values.boxSelection);
        const orderDetails: OrderDetails = {
            ...values,
            orderNumber,
            totalCost,
            boxName: selectedBox?.name || "Veggie Box"
        };
        
        setConfirmedOrderDetails(orderDetails);

        if (values.paymentMethod === 'card') {
            window.open('https://payf.st/4oz80', '_blank');
        }
        
        setIsDialogOpen(true);
        form.reset();
        setOrderNumber(`SH-${Date.now().toString().slice(-6)}`);
    }

    return (
        <>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex justify-between items-baseline">
                        <span className="font-headline">Your Details</span>
                        <span className="text-sm font-medium text-muted-foreground">Order #: {orderNumber}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="First Name" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="surname" render={({ field }) => (
                                    <FormItem><FormLabel>Surname</FormLabel><FormControl><Input placeholder="Last Name" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="082 123 4567" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="address" render={({ field }) => (
                                    <FormItem className="md:col-span-2"><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Green Leaf Ave" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="suburb" render={({ field }) => (
                                    <FormItem className="md:col-span-2"><FormLabel>Suburb</FormLabel><FormControl><Input placeholder="e.g., Parkhurst" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                 <FormField
                                    control={form.control}
                                    name="deliveryNotes"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                        <FormLabel>Delivery Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="e.g., Leave with reception, call upon arrival..."
                                            className="resize-none"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Add any special instructions for the delivery driver.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                            </div>

                            <FormField control={form.control} name="boxSelection" render={({ field }) => (
                                <FormItem className="space-y-3"><FormLabel className="text-lg font-headline">1. Choose Your Box</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid md:grid-cols-2 gap-4">
                                        {boxOptions.map(option => (
                                        <FormItem key={option.id}>
                                            <FormControl>
                                                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                            </FormControl>
                                            <FormLabel htmlFor={option.id} className={cn(
                                                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                field.value === option.id && "border-primary"
                                            )}>
                                                <span className="font-bold text-xl">{option.name}</span>
                                                <span className="text-lg">${option.price} / box</span>
                                            </FormLabel>
                                        </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl><FormMessage /></FormItem>
                            )} />

                            <FormField control={form.control} name="quantity" render={({ field }) => (
                                <FormItem><FormLabel className="text-lg font-headline">2. Select Quantity</FormLabel>
                                <FormControl><QuantityInput value={field.value} onChange={field.onChange} /></FormControl>
                                <FormDescription>How many box subscriptions you'd like. Each subscription includes two deliveries per month.</FormDescription><FormMessage /></FormItem>
                            )} />

                             <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                <FormItem className="space-y-3"><FormLabel className="text-lg font-headline">3. Choose Payment Method</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="card" /></FormControl>
                                        <FormLabel className="font-normal">Card Payment (via Payfast)</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="cash" /></FormControl>
                                        <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl><FormMessage /></FormItem>
                            )} />

                            <div className="text-center bg-muted/50 rounded-lg p-6 space-y-2">
                                <p className="text-lg font-headline">Total Monthly Cost</p>
                                <p className="text-4xl font-extrabold text-primary">${totalCost.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">Your 1-month subscription includes two deliveries. You can cancel anytime.</p>
                            </div>

                            <Button type="submit" size="lg" className="w-full text-lg font-bold bg-accent hover:bg-accent/90">Complete Order</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <OrderConfirmationDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                orderDetails={confirmedOrderDetails}
            />
        </>
    );
}
