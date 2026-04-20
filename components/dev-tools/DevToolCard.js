"use client";

import Link from "next/link";

export default function DevToolCard({ slug, title, badge, description }) {
  return (
    <article className="ds-card group flex h-full flex-col justify-between p-4">
      <header className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ds-text-muted">
          <span className="rounded-full bg-ds-bg-subtle px-2.5 py-0.5 text-[9px] font-semibold text-ds-text-secondary">
            Dev Tool
          </span>
          {badge && (
            <span className="rounded-full bg-ds-primary-soft px-2 py-0.5 text-[9px] font-medium text-ds-primary-hover">
              {badge}
            </span>
          )}
        </div>
        <h3 className="font-heading text-base font-bold text-ds-text">{title}</h3>
        <p className="text-xs leading-relaxed text-ds-text-muted">{description}</p>
      </header>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/tools/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-ds-primary/35 bg-ds-primary-soft px-3 py-1.5 text-[11px] font-bold text-ds-primary-hover transition hover:bg-ds-primary hover:text-ds-primary-foreground"
        >
          Use Tool
          <span aria-hidden className="text-[10px]">
            →
          </span>
        </Link>
        <span className="text-[10px] text-ds-text-muted">
          /tools/{slug}
        </span>
      </div>
    </article>
  );
}

