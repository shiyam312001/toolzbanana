"use client";

import Link from "next/link";
import { TOOL_META } from "../tools/tool-meta";

const hubCopy = {
  "Code & Data": {
    title: "Code & data tools",
    subtitle:
      "Format, encode, debug, and transform text and structured data in your browser.",
  },
  Image: {
    title: "Image tools",
    subtitle: "Compress, convert, remove backgrounds, and resize — locally when possible.",
  },
  PDF: {
    title: "PDF tools",
    subtitle: "Merge, split, convert, and manage PDFs without uploading to a server.",
  },
};

/**
 * @param {{ category: keyof typeof hubCopy }} props
 */
export function ToolHub({ category }) {
  const copy = hubCopy[category] ?? hubCopy["Code & Data"];
  const entries = Object.entries(TOOL_META).filter(
    ([, m]) => m.category === category,
  );

  return (
    <div className="max-w-4xl w-full mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-primary font-bold mb-2">
          <span className="material-symbols-outlined text-sm">widgets</span>
          <span className="text-[0.75rem] tracking-[0.2em] uppercase font-label">
            ToolzBanana
          </span>
        </div>
        <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold tracking-tight font-headline text-on-surface leading-tight">
          {copy.title}
        </h1>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
          {copy.subtitle}
        </p>
        <p className="text-sm text-on-surface-variant/80 mt-3">
          Choose a tool below. Each card opens its dedicated workspace.
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([slug, meta]) => (
          <li key={slug}>
            <Link
              href={`/tools/${slug}`}
              className="group flex flex-col h-full rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors ring-1 ring-outline-variant/15 hover:ring-primary/25 p-5 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-lg border border-outline-variant/10 group-hover:border-primary/20">
                  {meta.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                    {meta.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1.5 line-clamp-3">
                    {meta.description}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary shrink-0 text-xl">
                  arrow_forward
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
