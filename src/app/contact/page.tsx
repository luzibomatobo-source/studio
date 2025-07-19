import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or a suggestion? We'd love to hear from you.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
