export function WhyUse() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="overflow-hidden rounded-3xl bg-[#0B0F19] px-6 py-12 shadow-[0_30px_80px_rgba(15,23,42,0.30)] ring-1 ring-white/5 md:px-10">
          <div className="text-center">
            <h2 className="text-[20px] font-semibold text-white">
              Why Use BananaToolz?
            </h2>
            <p className="mt-2 text-[12px] text-white/70">
              Built for speed, simplicity, and privacy.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              { title: "Performance", desc: "Fast load times and responsive tools." },
              { title: "Free to Use", desc: "No paywalls for the essentials." },
              { title: "Privacy First", desc: "Designed to minimize data exposure." },
              { title: "Modern Design", desc: "Clean UI with a great user experience." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"
              >
                <div className="text-[13px] font-semibold text-white">{f.title}</div>
                <p className="mt-2 text-[12px] leading-6 text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

