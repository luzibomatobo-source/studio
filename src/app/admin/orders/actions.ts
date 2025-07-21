
"use server";

import { sendStatusUpdateEmail } from "@/lib/email";
import { z } from "zod";

const statusUpdateSchema = z.object({
    customerName: z.string(),
    customerEmail: z.string().email(),
    orderId: z.string(),
    newStatus: z.string(),
});

export async function handleStatusUpdate(data: z.infer<typeof statusUpdateSchema>) {
    const validation = statusUpdateSchema.safeParse(data);
    if (!validation.success) {
        return { success: false, message: "Invalid data provided." };
    }

    const { customerName, customerEmail, orderId, newStatus } = validation.data;
    
    // Here you would typically update your database with the new status.
    // For now, we'll just log it and send the email.
    console.log(`Updating order ${orderId} to status: ${newStatus}`);

    const emailResult = await sendStatusUpdateEmail(customerName, customerEmail, orderId, newStatus);

    return emailResult;
}
