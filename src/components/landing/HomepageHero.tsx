import { Link } from "react-router-dom";

export function HomepageHero() {
  return (
    <section className="bg-[#0a0a0f] px-5 py-20 md:px-10 md:py-[120px]">
      <div className="max-w-[800px] mx-auto text-center">
        <h1
          className="font-bold leading-[1.2] text-[#F1F5F9]"
          style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
        >
          What 500+ Studies Actually Say About Peptides — Matched to Your Goal
        </h1>

        <p className="mt-4 text-[16px] md:text-[20px] text-[#94A3B8] max-w-[600px] mx-auto leading-[1.6]">
          You've spent weeks down the peptide rabbit hole and you're more confused than when you started. Get a research-backed protocol matched to your specific goal — not generic Reddit advice.
        </p>

        <Link to="/checkout" className="inline-block mt-6">
          <button className="bg-[#06D6A0] hover:bg-[#05C493] text-[#0a0a0f] font-bold text-[18px] px-8 py-4 rounded-xl min-h-[56px] w-full max-w-[400px] md:w-auto md:min-w-[280px] transition-colors">
            Get Your Protocol — $67
          </button>
        </Link>

        <p className="mt-3 text-[14px] text-[#64748B]">
          No subscription. No upsells. Just answers. 30-day guarantee.
        </p>
      </div>
    </section>
  );
}
