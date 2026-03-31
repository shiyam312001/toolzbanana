import Link from "next/link";
import { trending } from "../home-data";

export function TrendingTools() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-slate-900">Trending Tools</h2>
          <p className="mt-1 text-[12px] text-slate-500">
            Fast picks people use right now.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {trending.map((t) => (
            <Link
              key={t}
              href="/tools"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

