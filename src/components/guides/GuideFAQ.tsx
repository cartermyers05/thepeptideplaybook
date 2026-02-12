import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideFAQProps {
  items: FAQItem[];
}

export function GuideFAQ({ items }: GuideFAQProps) {
  return (
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card-subtle px-6 border-none"
            >
              <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
  );
}
