
import Link from 'next/link';
import { Package, Newspaper, LogIn, HelpCircle, Contact, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import NextDeliveryBanner from './next-delivery-banner';

const Logo = () => (
    <Leaf className="h-8 w-8 text-primary" />
);

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NextDeliveryBanner />
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Logo />
          <span className="font-bold inline-block font-headline">Shepherd Header</span>
        </Link>
        <nav className="flex items-center space-x-1 flex-1">
          <Button variant="ghost" asChild>
            <Link href="/boxes">
              <Package className="mr-2 h-4 w-4" />
              Our Boxes
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <Newspaper className="mr-2 h-4 w-4" />
              Blog
            </Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/contact">
              <Contact className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </nav>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/admin/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Staff Login
                </Link>
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
