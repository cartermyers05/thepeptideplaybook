import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What do I actually get for $67?",
    a: "Everything. Personalized protocol. AI coach that answers any question. Doctor script. Legal guide. Vendor vetting guide. Diet tips. Tracker. Timeline. Lifetime updates. No upsells. No \"premium tier.\" This is the whole thing.",
  },
  {
    q: "Is this medical advice?",
    a: "No — and anyone who says their peptide product IS medical advice is lying to you. This is an educational tool based on published research. Always talk to your doctor before putting anything in your body.",
  },
  {
    q: "Why should I pay when Reddit is free?",
    a: "Because you've already tried Reddit. You're still here. Reddit gives you 47 opinions from 47 anonymous strangers who all contradict each other. We give you one clear answer, cited from peer-reviewed research, personalized to your situation.",
  },
  {
    q: "Is this a subscription?",
    a: "No. One payment. $67. Done. You get lifetime access and every update we ever make. No renewal. No \"your access is expiring\" emails.",
  },
  {
    q: "What's the refund policy?",
    a: "30 days. No questions. If you don't love it, email us and it's done.",
  },
  {
    q: "I don't have a science background. Can I still use this?",
    a: "That's exactly who we built it for. If you can read a recipe, you can use this. And if anything's unclear, just ask the AI — it explains things like a patient friend, not a professor.",
  },
];

export function HomepageFAQ() {
  return (
    <section className="bg-[#0a0a0f] px-5 py-[60px] md:px-10 md:py-20">
      <h2 className="text-center font-bold text-[24px] md:text-[36px] text-[#F1F5F9] mb-8">
        Still have questions?
      </h2>
      <div className="max-w-[680px] mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#1E293B]"
            >
              <AccordionTrigger className="text-left font-bold text-[16px] text-[#F1F5F9] py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-[#94A3B8] leading-[1.7] pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
