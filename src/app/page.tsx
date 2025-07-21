
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Sun, Truck } from 'lucide-react';
import TrackingForm from './track-delivery/tracking-form';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGalleryStore } from '@/lib/gallery-store';
import React from 'react';

const features = [
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Honest Food",
    description: "No harmful chemicals – just honest, lovingly grown food.",
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Free Delivery",
    description: "Delivery is on us – no extra charges for our standard delivery areas.",
  },
  {
    icon: <Sun className="h-6 w-6 text-primary" />,
    title: "Seasonal Mix",
    description: "The mix changes with the season – always something fresh to discover.",
  },
];

export default function Home() {
  const { images } = useGalleryStore();
  
  // This is needed to ensure the component re-renders with the correct state from localStorage on the client
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
      // You can return a loading state or null
      return null;
  }
  
  return (
    <>
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1752028935873-fd59622f71d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8aW1hZ2UlMjBvZiUyMHZlZ2V0YWJsZXMlMjBqdXN0JTIwYmVmb3JlJTIwY29va2luZyUyMGFuZCUyMGNob3BwaW5nJTIwfGVufDB8fHx8MTc1MzAxNjY2NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="A vibrant spread of fresh vegetables on a wooden cutting board, ready for chopping."
            data-ai-hint="chopped vegetables"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container px-4">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
            Fresh, Local, Delivered.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 sm:text-xl">
            Discover the best seasonal vegetables, straight from our farm to your table. Healthy eating has never been easier or more delicious.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/order">
                Order Your Box Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" className="font-bold text-lg w-full sm:w-auto bg-black/30 text-white border border-white/50 backdrop-blur-sm hover:bg-black/50 hover:border-white">
                <Link href="/boxes">
                See Our Boxes
                </Link>
            </Button>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center font-headline text-primary">What Makes Us Different</h2>
          </div>
          <Tabs defaultValue={features[0].title} orientation="vertical" className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
            <TabsList className="w-full h-auto flex-col bg-transparent p-0">
              {features.map((feature) => (
                <TabsTrigger key={feature.title} value={feature.title} className="w-full justify-start p-4 text-lg data-[state=active]:bg-primary/10 data-[state=active]:shadow-none data-[state=active]:border-l-4 border-primary">
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <span className="font-headline">{feature.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="md:col-span-3">
              {features.map((feature) => (
                <TabsContent key={feature.title} value={feature.title} className="mt-0">
                  <Card className="shadow-lg">
                    <CardContent className="p-10">
                      <p className="text-lg text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </section>

        <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-center font-headline text-primary">
                From Our Farms
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A glimpse into where your food comes from. Fresh, natural, and grown with care.
              </p>
            </div>
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
                >
                <CarouselContent>
                    {images.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0 flex items-center justify-center">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    data-ai-hint={image.aiHint}
                                    width={800}
                                    height={600}
                                    className="aspect-[4/3] w-full h-auto object-cover"
                                />
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
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
