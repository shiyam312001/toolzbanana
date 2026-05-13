"use client";

import { getToolEditorial } from "./tool-editorial";

export function ToolEditorialSection({
  slug,
  variant = "legacy",
}: {
  slug: string;
  variant?: "legacy" | "omni";
}) {
  const doc = getToolEditorial(slug);
  if (!doc) return null;

  if (variant === "omni") {
    return (
      <article
        className="mt-10 rounded-2xl border border-outline-variant/25 bg-surface-container-low/80 p-6 sm:p-8 text-on-surface"
        aria-labelledby="tool-editorial-heading"
      >
        <h2
          id="tool-editorial-heading"
          className="text-lg sm:text-xl font-extrabold tracking-tight font-headline text-on-surface mb-6"
        >
          {doc.pageTitle}
        </h2>
        <div className="space-y-8">
          {doc.sections.map((sec) => (
            <section key={sec.h2}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary mb-3">
                {sec.h2}
              </h3>
              <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-on-surface-variant">
                {sec.paragraphs.map((p, i) => (
                  <p key={`${sec.h2}-${i}`}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article
      className="mt-10 rounded-2xl border border-[#e8e3da] bg-[#fdfcfa] p-6 sm:p-8 shadow-sm"
      style={{
        fontFamily: "var(--font-instrument), sans-serif",
        color: "#4a453e",
      }}
      aria-labelledby="tool-editorial-heading-legacy"
    >
      <h2
        id="tool-editorial-heading-legacy"
        className="text-xl font-bold text-[#1a1714] mb-6"
        style={{ fontFamily: "var(--font-head), sans-serif" }}
      >
        {doc.pageTitle}
      </h2>
      <div className="space-y-8">
        {doc.sections.map((sec) => (
          <section key={sec.h2}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#c43e0e] mb-3">
              {sec.h2}
            </h3>
            <div className="space-y-3 text-[15px] leading-relaxed">
              {sec.paragraphs.map((p, i) => (
                <p key={`${sec.h2}-${i}`}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
