
"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  email: z.string().email(),
  reason: z.string(),
  contactMethod: z.string(),
  message: z.string(),
});

export async function handleContactFormSubmission(formData: z.infer<typeof formSchema>) {
    const validatedFields = formSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Invalid form data.",
        };
    }
    
    const { name, surname, email, phone, reason, contactMethod, message } = validatedFields.data;
    
    console.log("New Contact Form Submission:");
    console.log("Name:", `${name} ${surname}`);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Reason:", reason);
    console.log("Preferred Contact:", contactMethod);
    console.log("Message:", message);

    // This is where you would integrate with an email sending service
    // like Nodemailer, Resend, or SendGrid.
    // For now, we'll just simulate a success response.
    try {
        // e.g., await sendEmail({ to: "info@shepherdheader.co.zw", ... });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            message: "Email sent successfully (simulated).",
        };

    } catch (error) {
        console.error("Failed to send email:", error);
        return {
            success: false,
            message: "Could not send your message due to a server error.",
        };
    }
}
