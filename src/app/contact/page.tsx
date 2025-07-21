
import ContactForm from "./contact-form";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          We’d Love to Hear from You!
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Got feedback, questions or want to suggest new veggies for the box? Drop us a message below.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                    src="https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg"
                    data-ai-hint="veggie box"
                    alt="A vibrant assortment of fresh vegetables in a wooden crate."
                    fill
                    className="object-cover"
                />
            </div>
             <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="bulawayo map"
                    alt="A map of Bulawayo showing the delivery area."
                    fill
                    className="object-cover"
                />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg text-center shadow-xl">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-bold text-foreground">Delivery available in Bulawayo only – for now!</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
