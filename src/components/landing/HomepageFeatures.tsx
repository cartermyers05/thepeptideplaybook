const features = [
  {
    title: "🎯 A Protocol Built for YOU — Not for 'Most People'",
    body: "You have a specific goal. A specific body. A specific situation. Our AI reads your answers and builds a blueprint matched to YOUR goal — fat loss, recovery, skin, longevity, whatever. Exact compounds. Exact doses. Exact schedule. All based on what 500+ studies actually say.",
  },
  {
    title: "💬 Ask Anything. Get a Real Answer. In Seconds.",
    body: "\"Is BPC-157 safe with my thyroid meds?\" \"What's the difference between TB-500 and BPC-157?\" \"How long until I see results?\" Our AI coach has read the research you don't have time for. Ask it anything, anytime. Get a cited answer — not a guess.",
  },
  {
    title: "🩺 What to Tell Your Doctor (Without Sounding Sketchy)",
    body: "You want to bring this up at your next appointment. But you don't want to sound like you've been on weird forums. We wrote the script for you. Exact words. Exact framing. Walk in confident, not cringing.",
  },
  {
    title: "⚖️ Is This Even Legal? (Updated for 2026)",
    body: "The FDA changed the rules. Some peptides got harder to get. Some are in a gray area. Some are completely fine. Before you spend money, know where your peptide stands — and what's coming next.",
  },
  {
    title: "🔍 How to Spot Fake Peptides (And Not Get Scammed)",
    body: "A lot of peptides sold online are underdosed, contaminated, or completely fake. We teach you how to read a Certificate of Analysis, what to look for in a vendor, and how to verify what you're actually getting. We don't sell peptides, so we have zero reason to steer you toward anyone.",
  },
  {
    title: "🍽️ What to Eat and Do While You're Taking This",
    body: "Peptides don't work in a vacuum. What you eat, when you train, and how you sleep all affect your results. Get personalized guidance that fits YOUR protocol — not generic advice from a fitness influencer.",
  },
  {
    title: "📊 Track It. Don't Guess It.",
    body: "Check off your daily doses. Log how you're feeling. See your streak. Simple tracker, zero friction.",
  },
  {
    title: "📅 Know What's Coming — Week by Week",
    body: "\"Week 1: You might not feel anything yet.\" \"Week 3: Energy and recovery should be noticeably better.\" \"Week 6: This is when most people see visible changes.\" No more wondering \"is this working?\" You'll know exactly what to expect — and when.",
  },
  {
    title: "♾️ Buy Once. Stay Current Forever.",
    body: "New research comes out every month. We update your blueprint automatically. No subscription. No renewal. One payment, lifetime access, always up to date.",
  },
];

export function HomepageFeatures() {
  return (
    <section className="bg-[#0a0a0f] px-5 py-[60px] md:px-10 md:py-20">
      <h2 className="text-center font-bold text-[24px] md:text-[36px] text-[#F1F5F9] mb-10">
        Here's what's inside
      </h2>
      <div className="max-w-[680px] mx-auto space-y-8">
        {features.map((f, i) => (
          <div key={i}>
            <h3 className="font-bold text-[18px] md:text-[22px] text-[#F1F5F9]">
              {f.title}
            </h3>
            <p className="mt-2 text-[16px] text-[#94A3B8] leading-[1.7]">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
