
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Truck, Heart, Box, Sun } from 'lucide-react';
import TrackingForm from './track-delivery/tracking-form';

const features = [
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Honest Food",
    description: "No harmful chemicals – just honest, lovingly grown food.",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Free Delivery",
    description: "Delivery is on us – no extra charges for our standard delivery areas.",
  },
  {
    icon: <Sun className="h-8 w-8 text-primary" />,
    title: "Seasonal Mix",
    description: "The mix changes with the season – always something fresh to discover.",
  },
];


export default function Home() {
  return (
    <>
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image
                src="https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg"
                data-ai-hint="vegetables harvest"
                alt="A beautiful harvest of fresh vegetables including carrots, broccoli, and peppers."
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 px-4">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
            Fresh, Local, Delivered.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 sm:text-xl">
            Discover the best seasonal vegetables, straight from our farm to your table. Healthy eating has never been easier or more delicious.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg w-full sm:w-auto">
                <Link href="/order">
                Order Your Box Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold text-lg bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto">
                <Link href="/boxes">
                See Our Boxes
                </Link>
            </Button>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <section>
           <h2 className="text-3xl font-bold text-center font-headline text-primary">What Makes Us Different</h2>
           <div className="mt-8 grid gap-8 md:grid-cols-3 lg:gap-12">
             {features.map((feature) => (
               <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                 <CardHeader className="flex-col items-center gap-4 p-6">
                   {feature.icon}
                   <CardTitle className="text-2xl font-bold font-headline">{feature.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 pt-0">
                   <p className="text-muted-foreground">{feature.description}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
        </section>

        <section id="tracking" className="mt-20 max-w-2xl mx-auto scroll-mt-20">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-center font-headline text-primary">
              Track Your Delivery
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
              Enter your phone number and suburb to see the status of your delivery.
              </p>
          </div>
          <TrackingForm />
        </section>
      </div>
    </>
  );
}
