import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Carrot, ShoppingBasket } from 'lucide-react';

const boxOptions = [
  {
    id: 'essentials',
    name: 'Essentials Box',
    price: '250',
    description: 'A curated selection of seasonal essentials, perfect for singles or couples. A great way to eat healthy and local.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'vegetable box',
    icon: <ShoppingBasket className="h-8 w-8 text-primary" />
  },
  {
    id: 'family',
    name: 'Family Value Box',
    price: '450',
    description: 'A generous assortment of fresh, seasonal vegetables to feed the whole family. The best value for your money.',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'fresh vegetables',
    icon: <Carrot className="h-8 w-8 text-primary" />
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
        <div className="mt-8">
          <Button asChild size="lg" className="font-bold text-lg bg-accent hover:bg-accent/90">
            <Link href="/order">
              Order Your Box Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline text-primary">Our Veggie Boxes</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
          {boxOptions.map((box) => (
            <Card key={box.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex-row items-center gap-4 p-6">
                {box.icon}
                <div>
                  <CardTitle className="text-2xl font-bold font-headline">{box.name}</CardTitle>
                  <CardDescription>Starting from R{box.price} per box</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
                  <Image
                    src={box.imageUrl}
                    alt={box.name}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-video mb-4"
                    data-ai-hint={box.hint}
                  />
                  <p className="text-muted-foreground">{box.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild className="w-full font-bold">
                    <Link href={`/order?box=${box.id}`}>
                      Choose the {box.name}
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
