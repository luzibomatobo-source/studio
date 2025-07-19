import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "Can I choose what veggies I get?",
        answer: (
            <p>
                Not yet. A veggie selection option will be made available later in the year. We’re a small business and want to grow with our customer base in a way that benefits and aligns with you.
            </p>
        ),
    },
    {
        question: "Can I order more than one box?",
        answer: (
            <p>
                Yes. You can adjust the number of boxes when filling out the <Link href="/order" className="text-primary underline hover:text-primary/80">order form</Link>.
            </p>
        ),
    },
    {
        question: "How often can I order?",
        answer: (
            <p>
                We currently offer a bi-weekly delivery option (every 14 days).
            </p>
        ),
    },
    {
        question: "Is there a subscription option?",
        answer: (
            <p>
                Yes. Your order is for a one-month subscription, which includes two deliveries. Long-term subscription options will be available before the end of the year.
            </p>
        ),
    },
    {
        question: "How do I know my order is confirmed?",
        answer: (
            <p>
                You will receive a confirmation pop-up on our site once your order is placed. An email confirmation system will be implemented soon.
            </p>
        ),
    },
    {
        question: "Do you deliver everywhere in the city?",
        answer: (
            <p>
                We deliver to most areas in Bulawayo. If there’s an issue with your location, our sales team will contact you to arrange an alternative delivery address.
            </p>
        ),
    },
    {
        question: "Is delivery included in the price?",
        answer: (
            <p>
                Yes. The listed prices include delivery.
            </p>
        ),
    },
    {
        question: "Can I pay on delivery?",
        answer: (
            <p>
                We accept cash on delivery, however we limit your quantities for that option. Should you choose it, please try to have the exact amount due as reflected on your order information.
            </p>
        ),
    },
    {
        question: "Can I gift a box to someone else?",
        answer: (
            <p>
                Yes. Fill in the recipient’s name, phone number and delivery address in the <Link href="/order" className="text-primary underline hover:text-primary/80">order form</Link>.
            </p>
        ),
    },
    {
        question: "What is the surprise veg in the Family Value box?",
        answer: (
            <p>
                It changes weekly based on what’s in season, ensuring you always get the freshest produce available.
            </p>
        ),
    },
    {
        question: "Do you sell to businesses or organisations?",
        answer: (
            <p>
                Yes. Organisations wanting bulk orders should fill in the <Link href="/contact" className="text-primary underline hover:text-primary/80">contact form</Link> and our team will get in touch.
            </p>
        ),
    },
    {
        question: "Are the veggies organic?",
        answer: (
            <p>
                We use natural methods and are working on becoming certified organic. We work closely with small and medium-scale farmers to make this possible.
            </p>
        ),
    },
    {
        question: "Can I pause my subscription?",
        answer: (
            <p>
                Yes. You can pause your subscription by using the option on the <Link href="/#tracking" className="text-primary underline hover:text-primary/80">order tracking system on the homepage</Link>.
            </p>
        ),
    },
    {
        question: "Can I cancel my order?",
        answer: (
            <p>
                You can pause or skip your next order by notifying us at least 24 hours in advance via the <Link href="/contact" className="text-primary underline hover:text-primary/80">contact form</Link>.
            </p>
        ),
    },
    {
        question: "Do you sell any other food items?",
        answer: (
            <p>
                Not at this time. We’re focusing on fresh vegetables.
            </p>
        ),
    },
    {
        question: "How long do the veggies stay fresh?",
        answer: (
            <p>
                They are packed fresh and should last up to a week when stored properly.
            </p>
        ),
    },
    {
        question: "How do I contact customer support?",
        answer: (
            <p>
                Use the <Link href="/contact" className="text-primary underline hover:text-primary/80">contact form</Link>, we promise we will treat your request as an urgent matter.
            </p>
        ),
    },
];


export default function FAQPage() {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg font-headline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        <div className="text-center mt-12">
            <h2 className="text-2xl font-bold font-headline">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">Our team is here to help. Get in touch with us.</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="font-bold" size="lg">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
                <p>Or reach us directly:</p>
                <p>
                    <a href="mailto:info@shepherdheader.co.za" className="font-medium text-primary hover:underline">info@shepherdheader.co.za</a>
                    <span className="mx-2">|</span>
                    <a href="https://wa.me/27821234567" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">WhatsApp</a>
                </p>
            </div>
        </div>
      </div>
    );
  }