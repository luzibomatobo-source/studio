
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Truck, Heart, Box, Sun } from 'lucide-react';
import TrackingForm from './track-delivery/tracking-form';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useGalleryStore } from '@/lib/gallery-store';

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
  const { images: galleryImages } = useGalleryStore();

  return (
    <>
      <section className="w-full py-20 md:py-32 flex items-center justify-center text-center">
        <div className="container px-4">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
            Fresh, Local, Delivered.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Discover the best seasonal vegetables, straight from our farm to your table. Healthy eating has never been easier or more delicious.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg w-full sm:w-auto">
                <Link href="/order">
                Order Your Box Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-lg w-full sm:w-auto">
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

        <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-center font-headline text-primary">
                From Our Farm
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
                    {galleryImages.map((image, index) => (
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
