import { categoryCards } from "../home-data";

export function ToolCategories() {
  return (
    <section id="categories" className="py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-slate-900">Tool Categories</h2>
          <p className="mt-1 text-[12px] text-slate-500">
            Explore tools by category.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {categoryCards.map((c) => (
            <div
              key={c.title}
              className={`${c.bg} rounded-2xl border border-black/5 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]`}
            >
              <div className={`text-[14px] font-semibold ${c.accent}`}>{c.title}</div>
              <p className="mt-2 max-w-md text-[12px] leading-6 text-slate-600">
                {c.subtitle}
              </p>
              <div className="mt-5 h-9 w-9 rounded-xl bg-white/70 ring-1 ring-black/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

