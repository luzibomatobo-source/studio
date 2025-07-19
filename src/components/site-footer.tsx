
import Link from 'next/link';
import { LogIn, Leaf } from 'lucide-react';
import { Button } from './ui/button';

const Logo = () => (
    <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg font-headline">Shepherd Header</span>
    </div>
);

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Shepherd Header. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/admin/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Staff Login
                </Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}
