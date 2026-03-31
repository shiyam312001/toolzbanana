"use client";

import Link from "next/link";

export default function DevToolCard({ slug, title, badge, description }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
      <header className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[9px] font-semibold text-slate-50">
            Dev Tool
          </span>
          {badge && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-600">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{description}</p>
      </header>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/tools/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Open tool
          <span aria-hidden className="text-[10px]">
            ↗
          </span>
        </Link>
        <span className="text-[10px] text-slate-400">
          /tools/{slug}
        </span>
      </div>
    </article>
  );
}

