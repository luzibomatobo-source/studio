import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

const Logo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="h-8 w-8 text-primary"
      fill="currentColor"
    >
      <g>
        <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))" stroke="white" strokeWidth="4" />
        <path d="M6,35 C25,65 75,65 94,35" fill="white" />
        <path d="M45,34 C45,34 40,20 50,15 C60,20 55,34 55,34" fill="hsl(var(--primary))" />
        <path d="M19.3,80.7c0,0,14.6-6.4,20-17.1c0,0-2.4-7.5-6.1-9.3c-4-2-9.3,2.4-9.3,2.4l-4.2,1.3c0,0-5.7,1.8-8.2,7.2C10.1,68.9,13.8,80.4,19.3,80.7z M20.3,55.9c0,0-1.8,2.7-1.8,5.9c0,2.3,1.3,2.7,1.3,2.7" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M78.6,66.8c0,0-3.3-13.1-13.1-12.8c-10.3,0.3-12.2,7.9-12.2,7.9l-11.2,3.3c0,0-4,1.2-5.7,5c-2.1,4.7,0.2,10.2,5.2,11.5c4.7,1.2,9-1.2,11.5-5.2l1.6-2.6l10.8-3.3l1.8-0.9C73.4,69.1,76.5,69.5,78.6,66.8z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M51,70 l-2,5.5 c-0.5,1.5,0.5,3,2,3.5s3-0.5,3.5-2l1-3.5" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
      </g>
    </svg>
  );

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Logo />
          <span className="font-bold inline-block font-headline">Shepherd Header</span>
        </Link>
        <nav className="flex items-center space-x-4 flex-1">
          <Button variant="ghost" asChild>
            <Link href="/boxes">
              <Package className="mr-2 h-4 w-4" />
              Our Boxes
            </Link>
          </Button>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
