import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from './ui/button';

const Logo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-primary"
    >
      <path d="M12 22V12" />
      <path d="M16 4H8a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h1" />
      <path d="M12 12a5 5 0 0 1-5-5c0-4 4-4 4-4" />
      <path d="M17 12a5 5 0 0 0 5-5c0-4-4-4-4-4" />
    </svg>
  );

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Logo />
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
