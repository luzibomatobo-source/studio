
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carrot, ShoppingBasket } from 'lucide-react';
import { generateBoxImage } from '@/ai/flows/generate-box-image-flow';
import { useEffect, useState } from 'react';

const boxOptions = [
  {
    id: 'essentials',
    name: 'Essentials Box',
    price: '8',
    description: 'A curated selection of seasonal essentials, perfect for singles or couples. A great way to eat healthy and local.',
    icon: <ShoppingBasket className="h-8 w-8 text-primary" />,
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'farm sunset'
  },
  {
    id: 'family',
    name: 'Family Value Box',
    price: '15',
    description: 'A generous assortment of fresh, seasonal vegetables to feed the whole family. The best value for your money.',
    icon: <Carrot className="h-8 w-8 text-primary" />,
    imageUrl: null,
    aiHint: null
  },
];

function BoxCard({ box }: { box: typeof boxOptions[0] }) {
  const [imageUrl, setImageUrl] = useState<string | null>(box.imageUrl);

  useEffect(() => {
    async function generateImage() {
        // Only generate image if one isn't provided
        if (!box.imageUrl) {
            try {
                const result = await generateBoxImage({ boxName: box.name, description: box.description });
                setImageUrl(result.imageUrl);
            } catch (error) {
                console.error("Failed to generate image:", error);
                // Fallback to a placeholder if generation fails
                setImageUrl('https://placehold.co/600x400.png');
            }
        }
    }
    generateImage();
  }, [box.imageUrl, box.name, box.description]);
  

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-row items-center gap-4 p-6">
        {box.icon}
        <div>
          <CardTitle className="text-2xl font-bold font-headline">{box.name}</CardTitle>
          <CardDescription>Starting from ${box.price} per month</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6 pt-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={box.name}
            data-ai-hint={box.aiHint || 'veggie box'}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full aspect-video mb-4"
          />
        ) : (
          <div className="rounded-lg bg-muted w-full aspect-video mb-4 flex items-center justify-center">
            <p className="text-muted-foreground">Generating image...</p>
          </div>
        )}
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
  );
}

export default function BoxesPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl md:text-6xl">
          Our Veggie Boxes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          Choose the perfect box of seasonal vegetables, straight from our farm to your table.
          <span className="block font-semibold mt-2">Please note: Delivery is currently only available in Bulawayo.</span>
        </p>
      </section>

      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {boxOptions.map((box) => (
            <BoxCard key={box.id} box={box} />
          ))}
        </div>
      </section>
    </div>
  );
}
