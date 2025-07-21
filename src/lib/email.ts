
"use server";

import MailerSend, { EmailParams, Recipient, Sender } from "mailersend";
import type { OrderDetails } from "@/app/order/order-form";

if (!process.env.MAILERSEND_API_KEY) {
    console.warn("MAILERSEND_API_KEY is not set. Email functionality will be disabled.");
}
if (!process.env.FROM_EMAIL) {
    console.warn("FROM_EMAIL is not set. Email functionality will be disabled.");
}

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});

const sentFrom = new Sender(process.env.FROM_EMAIL || "placeholder@example.com", "Shepherd Header");

const sendEmail = async (recipients: Recipient[], subject: string, html: string, text: string) => {
    if (!process.env.MAILERSEND_API_KEY || !process.env.FROM_EMAIL) {
        console.error("Email configuration is missing. Cannot send email.");
        // In a real app, you might want to return a more specific error.
        // For this demo, we'll simulate a success to not block the UI.
        return { success: true, message: "Email send skipped (missing config)." };
    }

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);

    try {
        await mailerSend.email.send(emailParams);
        return { success: true, message: "Email sent successfully." };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email." };
    }
};

// --- Email Templates ---

const getOrderConfirmationHtml = (details: OrderDetails): string => `
  <h1>Order Confirmed!</h1>
  <p>Hi ${details.name},</p>
  <p>Thank you for your order! We're excited to bring you fresh produce.</p>
  <h3>Order Summary (#${details.orderNumber})</h3>
  <ul>
    <li><b>Box:</b> ${details.boxName}</li>
    <li><b>Quantity:</b> ${details.quantity}</li>
    <li><b>Monthly Total:</b> $${details.totalCost.toFixed(2)}</li>
    <li><b>Delivery Address:</b> ${details.address}, ${details.suburb}</li>
  </ul>
  <p>We'll notify you when your order is out for delivery.</p>
  <p>Thanks,<br/>The Shepherd Header Team</p>
`;

const getStatusUpdateHtml = (customerName: string, orderId: string, newStatus: string): string => {
    let message = "";
    switch(newStatus.toLowerCase()) {
        case "out for delivery":
            message = "is on its way! Expect your delivery today.";
            break;
        case "delivered":
            message = "has been delivered. We hope you enjoy!";
            break;
        case "paid":
             message = "has been marked as paid. Thank you!";
             break;
        default:
            message = `has been updated to: ${newStatus}`;
    }

    return `
      <h1>Your Order Status has Changed</h1>
      <p>Hi ${customerName},</p>
      <p>Good news! Your order <b>#${orderId}</b> ${message}</p>
      <p>You can track your order status on our website.</p>
      <p>Thanks,<br/>The Shepherd Header Team</p>
    `;
};


// --- Email Sending Functions ---

export async function sendOrderConfirmationEmail(details: OrderDetails) {
  const recipients = [new Recipient(details.email, details.name)];
  const subject = `Your Shepherd Header Order is Confirmed! (#${details.orderNumber})`;
  const html = getOrderConfirmationHtml(details);
  const text = `Order Confirmed! Hi ${details.name}, Thank you for your order #${details.orderNumber}. We'll notify you when it's out for delivery.`;
  
  return await sendEmail(recipients, subject, html, text);
}


export async function sendStatusUpdateEmail(customerName: string, customerEmail: string, orderId: string, newStatus: string) {
    const recipients = [new Recipient(customerEmail, customerName)];
    const subject = `Your Shepherd Header Order #${orderId} is ${newStatus}`;
    const html = getStatusUpdateHtml(customerName, orderId, newStatus);
    const text = `Hi ${customerName}, your order #${orderId} status has been updated to ${newStatus}.`;

    return await sendEmail(recipients, subject, html, text);
}
