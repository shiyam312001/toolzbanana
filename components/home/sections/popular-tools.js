import Link from "next/link";
import { popularTools } from "../home-data";

export function PopularTools() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-slate-900">Popular Tools</h2>
          <p className="mt-1 text-[12px] text-slate-500">
            The most used utilities this week.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="group rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-[18px]">{t.icon}</span>
                <div>
                  <div className="text-[13px] font-semibold text-slate-900">
                    {t.name}
                  </div>
                  <div className="mt-0.5 text-[12px] text-slate-500">
                    Open tool →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

