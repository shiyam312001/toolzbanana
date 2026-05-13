"use client";

import { TOOL_META } from "../tools/tool-meta";
import { AdBanner } from "../components/common";

/**
 * Right rail for tool pages — matches screenshot: ad blocks + "How to Use" + "Features".
 *
 * @param {{
 *   activeToolSlug: string | null,
 *   activeHubKey: "code" | "image" | "pdf" | null,
 *   header?: "code" | "pdf",
 * }} props
 */
export function OmniSidebar({
  activeToolSlug,
  activeHubKey,
  header: _header = "code",
}) {
  void _header;
  void activeHubKey;

  const tool = activeToolSlug && activeToolSlug in TOOL_META ? TOOL_META[activeToolSlug] : null;

  const howTo = getHowToUse(activeToolSlug, tool?.title);
  const features = getFeatures(activeToolSlug);

  return (
    <aside className="w-full lg:w-[360px] xl:w-[380px] min-w-0">
      <div className="lg:sticky lg:top-5 space-y-4">
        

        <div className="rounded-2xl border border-amber-200/60 bg-white  dark:border-amber-400/20 shadow-sm p-3">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 font-bold px-1 mb-2">
            Advertisement
          </p>
          <AdBanner size="300x600" />
        </div>

        <section className="rounded-2xl border border-amber-200/60 bg-white  dark:border-amber-400/20 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-amber-200/60 dark:border-amber-400/15 bg-amber-50/40 dark:bg-amber-500/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-600 dark:text-amber-300">
                info
              </span>
              <h3 className="text-[13px] font-extrabold tracking-tight text-black-700dark:text-slate-100">
                How to Use
              </h3>
            </div>
            {tool?.title ? (
              <p className="mt-1 text-[11.5px] text-slate-500 dark:text-slate-400">
                Quick steps for <span className="font-semibold">{tool.title}</span>.
              </p>
            ) : null}
          </div>
          <ol className="px-4 py-3 space-y-2 text-[12px] text-slate-600 dark:text-black-700 leading-relaxed">
            {howTo.map((step, idx) => (
              <li key={`${idx}-${step}`} className="flex gap-2.5">
                <span className="mt-[2px] w-5 h-5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 flex items-center justify-center text-[11px] font-bold shrink-0">
                  {String(idx + 1)}
                </span>
                <span className="min-w-0">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-amber-200/60 bg-white  dark:border-amber-400/20 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-amber-200/60 dark:border-amber-400/15 bg-amber-50/40 dark:bg-amber-500/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-amber-600 dark:text-amber-300">
                bolt
              </span>
              <h3 className="text-[13px] font-extrabold tracking-tight text-black-700dark:text-slate-100">
                Features
              </h3>
            </div>
          </div>
          <ul className="px-4 py-3 space-y-2 text-[12px] text-slate-600 dark:text-black-700 leading-relaxed">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600 dark:text-amber-300 shrink-0">
                  check_circle
                </span>
                <span className="min-w-0">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

function getHowToUse(slug, toolTitle) {
  const title = toolTitle || "this tool";
  if (!slug) {
    return [
      "Pick a tool from the Tools page.",
      "Add your input (text or files).",
      "Run the tool and copy or download the result.",
    ];
  }

  if (slug === "json-formatter") {
    return [
      "Paste your JSON into the input box.",
      "Click Format to validate and pretty‑print.",
      "Copy the formatted output or download it.",
    ];
  }

  if (slug === "jwt-decoder") {
    return [
      "Paste your JWT token.",
      "View decoded header + payload instantly.",
      "Copy fields you need for debugging.",
    ];
  }

  if (slug === "merge-pdf") {
    return [
      "Upload multiple PDF files.",
      "Arrange the order if needed.",
      "Click Merge and download the combined PDF.",
    ];
  }

  return [
    `Add your input for ${title}.`,
    "Click Run Tool to process.",
    "Copy or download the result.",
  ];
}

function getFeatures(slug) {
  const base = [
    "Fast, clean UI with mobile-friendly layout.",
    "No sign-in required to use the tools.",
    "Copy/download actions built-in.",
  ];

  if (slug === "json-formatter") {
    return [
      "Pretty‑print JSON with consistent indentation.",
      "Helpful validation errors when JSON is invalid.",
      "One‑click copy for formatted output.",
      ...base,
    ];
  }

  if (slug === "jwt-decoder") {
    return [
      "Decode header and payload in your browser.",
      "Inspect expiry and standard claims quickly.",
      "Copy decoded JSON for debugging.",
      ...base,
    ];
  }

  if (slug === "merge-pdf") {
    return [
      "Combine multiple PDFs into one file.",
      "Keeps pages in the selected order.",
      "Download the merged PDF instantly.",
      ...base,
    ];
  }

  return base;
}
