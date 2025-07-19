import Link from 'next/link';
import { Leaf, Package } from 'lucide-react';
import { Button } from './ui/button';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline">Shepherd Herder</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/boxes">
              <Package className="mr-2 h-4 w-4" />
              Our Boxes
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
