"use client";

import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Truck, Package, XCircle } from "lucide-react";

const formSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number."),
  suburb: z.string().min(2, "Please enter a valid suburb."),
});

type DeliveryStatus = 'confirmed' | 'out_for_delivery' | 'delivered' | 'not_found';

const statusInfo = {
    confirmed: {
        icon: <Package className="h-6 w-6 text-primary" />,
        title: "Order Confirmed",
        description: "Your order is confirmed and is being prepared for the next delivery day."
    },
    out_for_delivery: {
        icon: <Truck className="h-6 w-6 text-blue-500" />,
        title: "Out for Delivery",
        description: "Your veggie box is on its way to you! Expect it today."
    },
    delivered: {
        icon: <CheckCircle className="h-6 w-6 text-green-500" />,
        title: "Delivered",
        description: "Your veggie box has been delivered. Enjoy the fresh produce!"
    },
    not_found: {
        icon: <XCircle className="h-6 w-6 text-destructive" />,
        title: "Order Not Found",
        description: "We couldn't find an order with these details. Please check your phone number and suburb and try again."
    }
}

export default function TrackingForm() {
    const [status, setStatus] = useState<DeliveryStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            suburb: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setStatus(null);
        // Simulate an API call to a backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // --- Mock Logic ---
        // In a real app, you would make an API call here to your backend
        // to fetch the real delivery status.
        // For now, we'll return a random status to simulate the functionality.
        const mockStatuses: DeliveryStatus[] = ['confirmed', 'out_for_delivery', 'delivered', 'not_found'];
        const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
        setStatus(randomStatus);
        // --- End Mock Logic ---

        setIsLoading(false);
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Check Status</CardTitle>
                <CardDescription>
                    Please enter the details you used when placing your order.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="082 123 4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="suburb"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Suburb</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Parkhurst" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex-col items-stretch">
                         <Button type="submit" size="lg" className="w-full font-bold" disabled={isLoading}>
                            {isLoading ? 'Checking...' : 'Check Delivery Status'}
                        </Button>
                         <p className="mt-4 text-xs text-center text-muted-foreground">
                            This is for demonstration purposes. Real-time tracking will be enabled soon.
                        </p>
                    </CardFooter>
                </form>
            </Form>

            {status && (
                 <CardContent>
                    <Alert>
                        <div className="flex items-center gap-4">
                           {statusInfo[status].icon}
                            <div>
                                <AlertTitle className="text-lg font-bold">{statusInfo[status].title}</AlertTitle>
                                <AlertDescription>
                                    {statusInfo[status].description}
                                </AlertDescription>
                            </div>
                        </div>
                    </Alert>
                </CardContent>
            )}

        </Card>
    );
}
