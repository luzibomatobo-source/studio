import TrackingForm from "./tracking-form";

export default function TrackDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          Track Your Delivery
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your phone number and suburb to see the status of your delivery.
        </p>
      </div>
      <TrackingForm />
    </div>
  );
}
