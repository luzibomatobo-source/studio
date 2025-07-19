
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <header className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
              src="https://images.pexels.com/photos/161963/chilis-pepperoni-peppers-spicy-161963.jpeg"
              data-ai-hint="chili basket"
              alt="A person's hand picking a fresh red chili from a woven basket on the grass."
              fill
              className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 px-4">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl">
            Your Voice, Your Veggies – How You Shape Shepherd Header
          </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <div className="text-lg text-muted-foreground space-y-6">
              <p>
              At Shepherd Header, we believe food should connect us – to the land, to the people who grow it, and to each other. That’s why we’re building more than just a veggie delivery service. We’re building a movement, and you are at the heart of it.
              </p>
              <p>
              Every box we pack reflects your needs, your tastes, and your suggestions. Whether it’s asking for more leafy greens, sharing your love for fresh herbs, or suggesting a new product, we listen – and act. Our mission is to co-create this with you, from the ground up.
              </p>
              <p>
              This isn’t a one-size-fits-all box. It’s a box shaped by community. Your feedback helps us choose what to grow with our farmers, what to include week-to-week, and even what ideas we explore next. Want fresh juice? Dried herbs? A fruit add-on? Say the word.
              </p>
              <p>
              We’re committed to working with small and medium-scale farmers around Bulawayo to bring you honest, chemical-free produce – but the real magic happens when we work hand-in-hand with our customers.
              </p>
              <p>
              So keep the ideas coming! Drop us a message on our website, send us a DM, or chat to us when we deliver. Your voice matters here.
              </p>
              <p className="font-bold">Let’s grow this together.</p>
              <p>
              With gratitude,
              <br />
              The Shepherd Header Team
              </p>

              <div className="text-center pt-6">
                  <Button asChild size="lg" className="font-bold">
                      <Link href="/order">
                      🌱 Give us your feedback here
                      </Link>
                  </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground pt-4">
              #BulawayoFresh #YourVegYourVoice #ShepherdHeader #GrowTogether
              </p>
          </div>
        </article>
      </div>
    </>
  );
}
