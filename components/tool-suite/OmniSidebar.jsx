"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { TOOL_META, TOOL_PAGE_CATEGORIES } from "../tools/tool-meta";

/**
 * Curator sidebar — matches reference: pale canvas, pill hub nav, Help / Logout / Upgrade Pro.
 *
 * @param {{
 *   activeToolSlug: string | null,
 *   activeHubKey: "code" | "image" | "pdf" | null,
 *   header?: "code" | "pdf",
 *   mobileOpen?: boolean,
 *   onMobileClose?: () => void,
 * }} props
 */
export function OmniSidebar({
  activeToolSlug,
  activeHubKey,
  header: _header = "code",
  mobileOpen = false,
  onMobileClose,
}) {
  void _header;
  const pathname = usePathname();
  const entries = Object.entries(TOOL_META);
  const pathEffectOnce = useRef(true);

  useEffect(() => {
    if (pathEffectOnce.current) {
      pathEffectOnce.current = false;
      return;
    }
    onMobileClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const hubLinkBase =
    "flex items-center gap-2.5 sm:gap-3 w-full min-h-[48px] px-3 py-2.5 sm:px-4 sm:py-3 rounded-full text-[0.875rem] sm:text-[0.9375rem] font-medium transition-all duration-200 font-['Inter'] touch-manipulation";

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close tools menu"
          className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={() => onMobileClose?.()}
        />
      ) : null}

      <aside
        className={[
          "flex flex-col min-h-0 overscroll-contain",
          /* Mobile: fixed drawer, full viewport height, width fits small phones */
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-[60] max-md:h-[100dvh] max-md:max-h-[100dvh] max-md:shadow-2xl",
          "w-[min(17rem,calc(100vw-0.75rem))] sm:w-[272px] sm:min-w-[272px] min-w-0",
          "bg-[#F8F9FB] dark:bg-slate-900/95",
          "border-r border-slate-200/90 dark:border-slate-700/80",
          "shadow-[4px_0_24px_-12px_rgba(44,47,48,0.08)] dark:shadow-none",
          "font-['Inter'] text-[0.875rem] leading-relaxed text-slate-700 dark:text-slate-300 antialiased",
          "md:relative md:static md:h-full md:min-h-0 md:max-h-screen md:sticky md:top-0 md:self-stretch md:z-auto md:shadow-[4px_0_24px_-12px_rgba(44,47,48,0.08)]",
          "transition-transform duration-200 ease-out will-change-transform",
          "pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3 sm:px-4",
          mobileOpen
            ? "max-md:translate-x-0 max-md:pointer-events-auto"
            : "max-md:-translate-x-full max-md:pointer-events-none",
          "md:translate-x-0 md:pointer-events-auto",
        ].join(" ")}
      >
        {/* Header — circular blue logo + Curator */}
        <div className="flex items-start justify-between gap-2 shrink-0 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 shrink-0 rounded-full primary-gradient flex items-center justify-center text-white shadow-md shadow-[#4647d3]/25">
              <span className="material-symbols-outlined text-[22px] text-white">
                auto_awesome
              </span>
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-bold text-[#2c2f30] dark:text-slate-100 font-headline leading-tight text-[1.05rem] tracking-tight">
                ToolzBanana
              </p>
              <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Multi-Tool Suite
              </p>
            </div>
          </div>
          <button
            type="button"
            className="md:hidden p-2 -mr-1 -mt-1 rounded-full text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 shrink-0"
            aria-label="Close tools menu"
            onClick={() => onMobileClose?.()}
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Primary hub nav — pill active state */}
        <nav
          className="flex flex-col gap-1.5 shrink-0"
          aria-label="Tool hubs"
        >
          <Link
            href="/tools/image"
            className={`${hubLinkBase} ${
              activeHubKey === "image"
                ? "bg-[#E8EAEF] dark:bg-slate-700/70 text-[#4647d3] dark:text-[#a5b4fc] shadow-sm"
                : "text-slate-700 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/80"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px] shrink-0"
              style={
                activeHubKey === "image"
                  ? { fontVariationSettings: "'FILL' 1, 'wght' 500" }
                  : undefined
              }
            >
              image
            </span>
            <span>Images</span>
          </Link>
          <Link
            href="/tools/code"
            className={`${hubLinkBase} ${
              activeHubKey === "code"
                ? "bg-[#E8EAEF] dark:bg-slate-700/70 text-[#4647d3] dark:text-[#a5b4fc] shadow-sm"
                : "text-slate-700 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/80"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px] shrink-0"
              style={
                activeHubKey === "code"
                  ? { fontVariationSettings: "'FILL' 1, 'wght' 500" }
                  : undefined
              }
            >
              code
            </span>
            <span>Code</span>
          </Link>
          <Link
            href="/tools/pdf"
            className={`${hubLinkBase} ${
              activeHubKey === "pdf"
                ? "bg-[#E8EAEF] dark:bg-slate-700/70 text-[#4647d3] dark:text-[#a5b4fc] shadow-sm"
                : "text-slate-700 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/80"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px] shrink-0"
              style={
                activeHubKey === "pdf"
                  ? { fontVariationSettings: "'FILL' 1, 'wght' 500" }
                  : undefined
              }
            >
              picture_as_pdf
            </span>
            <span>PDF</span>
          </Link>
        </nav>

        {/* All tools — scrollable, secondary hierarchy */}
        <div className="invisible flex-1 min-h-0 flex flex-col mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-700/60">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 font-bold px-1 mb-2.5">
            All tools
          </p>
          <div
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-0.5 space-y-4 editor-scroll"
            aria-label="Tools by category"
          >
            {TOOL_PAGE_CATEGORIES.map((category) => {
              const tools = entries.filter(([, m]) => m.category === category);
              if (!tools.length) return null;

              return (
                <div key={category}>
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-slate-400/90 dark:text-slate-500 font-bold px-1 mb-1.5">
                    {category}
                  </p>
                  <div className="space-y-0.5 border-l-2 border-slate-200/90 dark:border-slate-600/50 ml-1.5 pl-2.5">
                    {tools.map(([slug, meta]) => {
                      const isActive = activeToolSlug === slug;
                      return (
                        <Link
                          key={slug}
                          href={`/tools/${slug}`}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors text-[0.8125rem] leading-snug ${
                            isActive
                              ? "bg-[#4647d3]/10 text-[#4647d3] dark:text-[#a5b4fc] font-semibold ring-1 ring-[#4647d3]/15"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/40 dark:hover:bg-slate-800/60"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span
                            className="shrink-0 w-6 h-6 rounded-md bg-white/80 dark:bg-slate-800/80 flex items-center justify-center text-[0.65rem] border border-slate-200/80 dark:border-slate-600/50"
                            aria-hidden
                          >
                            {meta.icon}
                          </span>
                          <span className="min-w-0 line-clamp-2">{meta.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer — Help, Logout, Upgrade Pro */}
        <div className="shrink-0 mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-700/60 space-y-1">
          <a
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 text-[0.875rem] font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/80 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px] text-slate-500 dark:text-slate-400">
              help
            </span>
            Help
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 text-[0.875rem] font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/80 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[22px] text-slate-500 dark:text-slate-400">
              logout
            </span>
            Logout
          </a>
          <button
            type="button"
            className="mt-4 w-full py-3.5 rounded-full font-bold text-white text-[0.875rem] primary-gradient shadow-lg shadow-[#4647d3]/30 hover:brightness-105 active:scale-[0.99] transition-all"
          >
            Upgrade Pro
          </button>
        </div>
      </aside>
    </>
  );
}
