const features = [
  {
    title: "Performance",
    desc: "Fast load times and responsive tools built for real workflows.",
  },
  {
    title: "Free to use",
    desc: "No paywalls for the essentials — jump in and get work done.",
  },
  {
    title: "Privacy first",
    desc: "Designed to minimize data exposure; many tools run locally.",
  },
  {
    title: "Modern design",
    desc: "Clean UI with consistent spacing, typography, and motion.",
  },
];

export function WhyUse() {
  return (
    <section className="py-12 lg:py-16">
      <div className="ds-container">
        <div className="overflow-hidden rounded-3xl border border-ds-border bg-ds-text px-6 py-12 shadow-xl md:px-10 lg:py-14">
          <div className="text-center">
            <h2 className="font-heading text-lg font-bold text-white md:text-xl">
              Why ToolzBanana?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Built for speed, simplicity, and privacy.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
              >
                <div className="text-sm font-bold text-white">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
