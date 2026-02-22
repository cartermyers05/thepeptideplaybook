const steps = [
  {
    num: "1",
    filled: false,
    title: "Get instant access",
    desc: "One payment. No account creation hoops. You're inside in under 60 seconds.",
  },
  {
    num: "2",
    filled: false,
    title: "Ask the AI anything",
    desc: "Type any peptide question. Get cited answers with honest evidence ratings — strong, moderate, or preliminary. No hype. No bro-science.",
  },
  {
    num: "3",
    filled: true,
    title: "Talk to your doctor with confidence",
    desc: "Use the doctor conversation scripts to bring research — not Reddit screenshots — to your next appointment.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 md:py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground">
        How it works
      </h2>
      <p className="text-muted-foreground text-base text-center mt-2 mb-10">
        From confused to confident in three steps.
      </p>

      <div className="max-w-[700px] mx-auto">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="flex items-start gap-5">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${
                  step.filled
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-primary text-primary bg-transparent"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {step.num}
              </div>
              <div>
                <p className="font-bold text-[17px] text-foreground">{step.title}</p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="w-px h-8 border-l border-border ml-6" />
            )}
          </div>
        ))}
      </div>

      <p className="text-muted-foreground/60 text-sm italic text-center mt-8">
        No learning curve. No confusing interface. Just answers.
      </p>
    </section>
  );
}
