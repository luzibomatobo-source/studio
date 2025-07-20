
import OrderForm from "./order-form";
import Image from "next/image";

export default function OrderPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          Place Your Order
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You're just a few steps away from delicious, farm-fresh vegetables.
          <span className="block font-semibold mt-2">Please note: Delivery is currently only available in Bulawayo.</span>
        </p>
      </div>
      <OrderForm />
    </div>
  );
}
