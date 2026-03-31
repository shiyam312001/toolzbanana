import { articles } from "../home-data";

export function LatestArticles() {
  return (
    <section id="articles" className="py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold text-slate-900">Latest Articles</h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Updates, tips, and quick guides.
            </p>
          </div>
          <a
            href="#"
            className="text-[12px] font-semibold text-slate-700 hover:text-slate-950"
          >
            View all
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.title}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="h-36 bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="p-5">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  {a.tag}
                </div>
                <h3 className="mt-3 text-[13px] font-semibold text-slate-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-[12px] leading-6 text-slate-600">
                  {a.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

