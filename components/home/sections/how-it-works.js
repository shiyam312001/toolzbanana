export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-slate-900">How It Works</h2>
          <p className="mt-1 text-[12px] text-slate-500">
            Three steps. No friction.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <span className="text-lg">🔎</span>
            </div>
            <div className="mt-3 text-[13px] font-semibold text-slate-900">
              Find a Tool
            </div>
            <p className="mt-1 text-[12px] leading-6 text-slate-600">
              Search or browse categories to find exactly what you need.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <span className="text-lg">⚡</span>
            </div>
            <div className="mt-3 text-[13px] font-semibold text-slate-900">
              Upload / Paste
            </div>
            <p className="mt-1 text-[12px] leading-6 text-slate-600">
              Drop files or paste text. Everything runs in your browser when possible.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <span className="text-lg">⬇️</span>
            </div>
            <div className="mt-3 text-[13px] font-semibold text-slate-900">
              Download Result
            </div>
            <p className="mt-1 text-[12px] leading-6 text-slate-600">
              Get the output instantly with clean formatting and smart defaults.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

