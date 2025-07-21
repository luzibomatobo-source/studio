
import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          We’d Love to Hear from You!
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Got feedback, questions or want to suggest new veggies for the box? Drop us a message below.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
