"use client";

import Link from "next/link";
import { ChevronDown, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { getOmniShellForSlug } from "../tools/tool-meta";

const HUB_ROUTE_SEGMENTS = new Set(["code", "image", "pdf"]);

function useOmniToolPage(pathname) {
  return useMemo(() => {
    const parts = (pathname || "").split("/").filter(Boolean);
    if (parts[0] !== "tools" || !parts[1]) return false;
    return (
      HUB_ROUTE_SEGMENTS.has(parts[1]) || getOmniShellForSlug(parts[1]) != null
    );
  }, [pathname]);
}

export function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const hideForOmniShell = useOmniToolPage(pathname);

  const breadcrumb = useMemo(() => {
    const parts = (pathname || "").split("/").filter(Boolean);
    if (!parts.length) return { a: "ToolzBanana", b: "", c: "" };

    const titleCase = (s) =>
      s
        .split("-")
        .filter(Boolean)
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(" ");

    if (parts[0] === "tools") {
      return {
        a: "ToolzBanana",
        b: "Tools",
        c: titleCase(parts[1] || "tools"),
      };
    }

    return {
      a: "ToolzBanana",
      b: titleCase(parts[0]),
      c: parts[1] ? titleCase(parts[1]) : "",
    };
  }, [pathname]);

  if (hideForOmniShell) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f5f2ed]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-[15px] font-semibold tracking-tight text-[#1a1714]">
              ToolzBanana
            </span>
          </Link>

          <nav
            className="hidden md:flex min-w-0 items-center gap-2 text-[12px] font-medium text-[#9a9188]"
            aria-label="Breadcrumb"
          >
            <span className="truncate">{breadcrumb.a}</span>
            {breadcrumb.b ? <span>/</span> : null}
            {breadcrumb.b ? (
              <span
                className="truncate"
                aria-current={!breadcrumb.c ? "page" : undefined}
              >
                {breadcrumb.b}
              </span>
            ) : null}
            {breadcrumb.c ? <span>/</span> : null}
            {breadcrumb.c ? (
              <span
                className="truncate text-[#1a1714] font-semibold"
                aria-current="page"
              >
                {breadcrumb.c}
              </span>
            ) : null}
          </nav>
        </div>

        <div className="flex-1">
          <div
            className="relative mx-auto max-w-xl"
            role="search"
            aria-label="Search tools"
          >
            <Search
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9a9188]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              aria-label="Search tools"
              className="w-full rounded-full border border-black/10 bg-white/70 py-2 pl-10 pr-3 text-[13px] text-[#1a1714] placeholder:text-[#bdb0a4] outline-none focus:border-[#e8521a]/40 focus:ring-4 focus:ring-[#e8521a]/15"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-[12px] font-medium text-[#1a1714] shadow-sm hover:bg-white"
            aria-label="Language"
          >
            <span className="text-[#1a1714]">English</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#9a9188]" />
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#1a1714] shadow-sm hover:bg-white"
            aria-label="User menu"
            title="User"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

