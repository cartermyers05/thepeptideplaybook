import { Link } from "react-router-dom";

export function MidPageCTA() {
  return (
    <section className="bg-[#111827] px-5 py-10 md:px-10 md:py-[60px] text-center">
      <h2 className="font-bold text-[22px] md:text-[28px] text-[#F1F5F9]">
        Ready to stop guessing?
      </h2>
      <Link to="/checkout" className="inline-block mt-4">
        <button className="bg-[#06D6A0] hover:bg-[#05C493] text-[#0a0a0f] font-bold text-[18px] px-8 py-4 rounded-xl min-h-[56px] w-full max-w-[400px] md:w-auto md:min-w-[280px] transition-colors">
          Get Your Protocol — $67
        </button>
      </Link>
      <p className="mt-3 text-[14px] text-[#64748B]">
        One-time purchase. Instant access. 30-day guarantee.
      </p>
    </section>
  );
}
