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

const hubGuide = {
  "Code & Data": {
    title: "How we approach code and data utilities",
    blocks: [
      {
        h2: "Built for everyday engineering tasks",
        ps: [
          "Developers spend a surprising amount of time on small transformations: validating JSON from a flaky integration, decoding a JWT to confirm expiry, or turning a blob into Base64 for a repro case. These jobs rarely deserve a heavyweight desktop suite, but they still deserve predictable behavior and clear error messages.",
          "This hub groups text-first utilities that run in your browser whenever practical. That keeps feedback loops short while you stay inside your normal security habits—staging hosts, synthetic tokens, and careful handling of production secrets.",
        ],
      },
      {
        h2: "What to read before you paste sensitive data",
        ps: [
          "Each tool page includes a longer editorial section that explains typical pitfalls, privacy expectations, and how the UI maps to common workflows. If you are unsure whether an input is safe to share with any website, treat it as unsafe until your security team agrees otherwise.",
          "When you need reproducible results for a ticket, copy both the input shape (redacted) and the settings you used so reviewers can follow the same steps without guessing.",
        ],
      },
      {
        h2: "Growing the toolkit responsibly",
        ps: [
          "We add utilities when we see repeated patterns across support threads and community feedback. Requests that include example inputs (sanitized), expected output, and the environment you use help us prioritize work that benefits many readers—not just a single edge case.",
          "If a workflow still belongs in your CI pipeline or local CLI, we will say so. Browser tools complement your professional stack; they do not replace code review, tests, or secrets management.",
        ],
      },
    ],
  },
  Image: {
    title: "Image utilities with realistic expectations",
    blocks: [
      {
        h2: "Quality, size, and format trade-offs",
        ps: [
          "Images are rarely one-size-fits-all: social cards, hero banners, and documentation screenshots each have different resolution and compression needs. Compression reduces bytes but can soften fine detail; conversion changes transparency behavior; resizing cannot invent detail that was not in the source file.",
          "Preview outputs at the zoom level your audience will use. A thumbnail that looks crisp at 200 pixels wide may fall apart when stretched into a full-width marketing banner.",
        ],
      },
      {
        h2: "Local processing when it matters",
        ps: [
          "Several of our image flows are designed to keep bytes on your device for common cases, which reduces unnecessary uploads and speeds up iteration when you are iterating on a creative concept.",
          "When a tool must touch a server for performance reasons, the dedicated page calls that out explicitly so you can choose the right environment for confidential assets.",
        ],
      },
      {
        h2: "Accessibility and inclusive design",
        ps: [
          "Alt text, contrast, and readable typography still matter after technical processing. Automated tools save time on mechanical steps, but humans should validate the final experience in context.",
          "For portraits or sensitive subjects, follow your organization's consent policies and platform rules before publishing edits or background removals.",
        ],
      },
    ],
  },
  PDF: {
    title: "PDF workflows that stay understandable",
    blocks: [
      {
        h2: "Packets people can actually open",
        ps: [
          "Merged PDFs are a common way to deliver evidence packs, onboarding documents, or design approvals. The failure mode is almost never the merge itself—it is page order, missing signatures, or attachments that exceed a recipient's upload cap.",
          "After every merge or split, open the result in the same viewer your recipient will use. Acrobat, browser viewers, and mobile apps occasionally disagree on annotations or form fields.",
        ],
      },
      {
        h2: "Archives versus working copies",
        ps: [
          "Keep authoritative originals alongside derived exports. Converting PDF pages to images is great for previews but discards selectable text unless you add OCR separately.",
          "When regulations require immutable records, document who generated a file, when, and from which sources so audits stay straightforward.",
        ],
      },
      {
        h2: "Performance and large files",
        ps: [
          "PDF operations can be memory-intensive in the browser. For very large archives, split work into batches and close unused tabs so the engine has predictable resources.",
          "If a job is mission-critical, keep a desktop backup plan for the same transformation so you are not blocked by a single environment.",
        ],
      },
    ],
  },
};

/**
 * @param {{ category: keyof typeof hubCopy }} props
 */
export function ToolHub({ category }) {
  const copy = hubCopy[category] ?? hubCopy["Code & Data"];
  const guide = hubGuide[category] ?? hubGuide["Code & Data"];
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

      <article
        className="mt-12 rounded-2xl border border-outline-variant/25 bg-surface-container-low/70 p-6 sm:p-8 text-on-surface"
        aria-labelledby="hub-guide-title"
      >
        <h2
          id="hub-guide-title"
          className="text-lg sm:text-xl font-extrabold tracking-tight font-headline mb-6"
        >
          {guide.title}
        </h2>
        <div className="space-y-8">
          {guide.blocks.map((block) => (
            <section key={block.h2}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary mb-3">
                {block.h2}
              </h3>
              <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-on-surface-variant">
                {block.ps.map((para, i) => (
                  <p key={`${block.h2}-${i}`}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
