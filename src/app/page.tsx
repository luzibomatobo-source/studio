
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Sun, Truck } from 'lucide-react';
import TrackingForm from './track-delivery/tracking-form';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const features = [
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Honest Food",
    description: "No harmful chemicals – just honest, lovingly grown food.",
    value: "honest"
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Free Delivery",
    description: "Delivery is on us – no extra charges for our standard delivery areas.",
    value: "delivery"
  },
  {
    icon: <Sun className="h-6 w-6 text-primary" />,
    title: "Seasonal Mix",
    description: "The mix changes with the season – always something fresh to discover.",
    value: "seasonal"
  },
];

const galleryImages = [
    {
        src: "https://images.pexels.com/photos/54340/sun-rose-teanature-flower-54340.jpeg",
        alt: "A golden sunrise over young plants seen through a protective net.",
        aiHint: "farm sunrise"
    },
    {
        src: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg",
        alt: "A close-up of water droplets on vibrant green leaves.",
        aiHint: "fresh leaves"
    },
    {
        src: "https://images.pexels.com/photos/4197483/pexels-photo-4197483.jpeg",
        alt: "A farmer holding a wooden crate filled with fresh, colorful vegetables.",
        aiHint: "farmer holding vegetables"
    },
    {
        src: "https://images.pexels.com/photos/161963/chilis-pepperoni-peppers-spicy-161963.jpeg",
        alt: "A person's hand picking a fresh red chili from a woven basket on the grass.",
        aiHint: "chili basket"
    },
    {
        src: "https://images.pexels.com/photos/235656/pexels-photo-235656.jpeg",
        alt: "Rows of lush green lettuce growing in a field.",
        aiHint: "lettuce field"
    },
    {
        src: "https://images.unsplash.com/photo-1594056501292-c419c968846f",
        alt: "Hands gently holding a freshly opened pomegranate, revealing its vibrant red seeds.",
        aiHint: "pomegranate hands"
    }
];

export default function Home() {
  return (
    <>
      <section className="w-full py-20 md:py-32 flex items-center justify-center text-center bg-background">
        <div className="container px-4">
            <h1 className="text-4xl font-extrabold tracking-tight font-headline text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
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
            <Tabs defaultValue="honest" className="mt-8 max-w-3xl mx-auto md:grid md:grid-cols-4 md:gap-12">
                <TabsList className="flex-col h-auto bg-transparent p-0 space-y-2 mb-8 md:mb-0 md:border-r md:pr-4">
                    {features.map((feature) => (
                        <TabsTrigger key={feature.value} value={feature.value} className="w-full justify-start text-lg h-auto p-4 data-[state=active]:bg-muted data-[state=active]:shadow-none">
                            <div className="flex items-center gap-4">
                                {feature.icon}
                                <span className="font-headline">{feature.title}</span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="md:col-span-3">
                    {features.map((feature) => (
                        <TabsContent key={feature.value} value={feature.value} className="mt-0">
                           <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-4 font-headline text-2xl">
                                        {feature.icon} {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
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
