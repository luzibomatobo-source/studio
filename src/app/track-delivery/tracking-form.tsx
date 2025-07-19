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
import { CheckCircle, Truck, Package, XCircle, PauseCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();

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
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockStatuses: DeliveryStatus[] = ['confirmed', 'out_for_delivery', 'delivered', 'not_found'];
        const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
        setStatus(randomStatus);

        setIsLoading(false);
    };

    const handlePauseDelivery = async () => {
        // Simulate API call to pause delivery
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
            title: "Delivery Paused",
            description: "Your next delivery has been successfully paused. We'll resume on the next cycle.",
        });
    }

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
                        <div className="flex items-start gap-4">
                           {statusInfo[status].icon}
                            <div className='flex-1'>
                                <AlertTitle className="text-lg font-bold">{statusInfo[status].title}</AlertTitle>
                                <AlertDescription>
                                    {statusInfo[status].description}
                                </AlertDescription>
                                {status !== 'not_found' && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="mt-4">
                                                <PauseCircle className="mr-2 h-4 w-4" />
                                                Pause Next Delivery
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to pause?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will skip your next scheduled delivery. Your subscription will resume automatically on the following delivery date.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handlePauseDelivery}>Confirm Pause</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </div>
                        </div>
                    </Alert>
                </CardContent>
            )}

        </Card>
    );
}
