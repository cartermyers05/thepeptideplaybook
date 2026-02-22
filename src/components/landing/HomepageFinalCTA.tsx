import { Link } from "react-router-dom";

export function HomepageFinalCTA() {
  return (
    <section className="bg-[#111827] px-5 py-[60px] md:px-10 md:py-20 text-center">
      <div className="max-w-[600px] mx-auto">
        <h2 className="font-bold text-[22px] md:text-[28px] text-[#F1F5F9]">
          Here's what happens next:
        </h2>
        <p className="mt-3 text-[16px] md:text-[18px] text-[#94A3B8] leading-[1.7]">
          You click the button. You answer a few questions. In 5 minutes, you have a personalized blueprint based on 500+ studies — not Reddit guesses.
        </p>
        <p className="mt-3 text-[16px] md:text-[18px] text-[#94A3B8] leading-[1.7]">
          No subscription. No upsell. No "but wait there's more." Just clarity. Finally.
        </p>

        <Link to="/checkout" className="inline-block mt-6">
          <button className="bg-[#06D6A0] hover:bg-[#05C493] text-[#0a0a0f] font-bold text-[18px] px-8 py-4 rounded-xl min-h-[56px] w-full max-w-[400px] md:w-auto md:min-w-[280px] transition-colors">
            Get Your Protocol — $67
          </button>
        </Link>
        <p className="mt-3 text-[14px] text-[#64748B]">
          30-day money-back guarantee. If it's not for you, we'll refund you. No questions.
        </p>
      </div>
    </section>
  );
}
