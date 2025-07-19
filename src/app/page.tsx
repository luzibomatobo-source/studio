import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Carrot, ShoppingBasket, Leaf, Truck } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Farm-Fresh Quality",
    description: "We deliver the freshest, seasonal vegetables straight from our fields to your doorstep.",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Convenient Delivery",
    description: "Get healthy, local produce delivered to your home twice a month. It's never been easier to eat well.",
  },
];


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl md:text-6xl lg:text-7xl">
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
          <Button asChild size="lg" variant="outline" className="font-bold text-lg bg-transparent w-full sm:w-auto">
            <Link href="/boxes">
              See Our Boxes
            </Link>
          </Button>
        </div>
      </section>
      
      <section className="mt-20">
         <h2 className="text-3xl font-bold text-center font-headline text-primary">Why Choose Us?</h2>
         <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
           {features.map((feature) => (
             <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
               <CardHeader className="flex-row items-center gap-4 p-6">
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
    </div>
  );
}
