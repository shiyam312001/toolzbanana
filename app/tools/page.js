import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { TOOL_CATEGORIES } from "../../components/tools-data";
import { Footer } from "../../components/home/sections/footer";
import { AdBlock } from "../../components/ui/AdBlock";
import { SectionWrapper } from "../../components/ui/SectionWrapper";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Developer Tools",
  description:
    "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: { url: `${SITE_URL}/tools` },
  twitter: {
    title: "Developer Tools · ToolzBanana",
    description:
      "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  },
};

export default async function ToolsDashboardPage({ searchParams }) {
  const sp = await searchParams;
  const rawSearch = typeof sp?.search === "string" ? sp.search : "";
  const q = rawSearch.trim().toLowerCase();
  const rawCategory =
    typeof sp?.category === "string" ? sp.category : "";

  const allTools = TOOL_CATEGORIES.flatMap((category) =>
    (category.tools || []).map((tool) => ({
      ...tool,
      category: category.label,
      categoryId: category.id,
    }))
  );

  const filtered =
    !q && !rawCategory
      ? allTools
      : allTools.filter((t) => {
          const matchesQuery =
            !q ||
            String(t.name || "")
              .toLowerCase()
              .includes(q) ||
            String(t.slug || "")
              .toLowerCase()
              .includes(q) ||
            String(t.category || "")
              .toLowerCase()
              .includes(q);

          const matchesCategory =
            !rawCategory ||
            String(t.categoryId || "").toLowerCase() === rawCategory.toLowerCase();

          return matchesQuery && matchesCategory;
        });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Ad block at top */}
      <SectionWrapper padded="small">
        <AdBlock size="728x90" />
      </SectionWrapper>

      <SectionWrapper className="pt-4 pb-12" padded="small">

        {/* Page header */}
        <header className="mb-5">
          <h1 className="text-[1.75rem] font-extrabold tracking-tight text-gray-900">
            All Tools
          </h1>
          <p className="mt-1 text-[12.5px] text-gray-500">
            Browse our complete collection of {allTools.length} free online tools.
            {q ? (
              <>
                {" "}
                Showing <span className="font-semibold">{filtered.length}</span> results for{" "}
                <span className="font-semibold">“{rawSearch}”</span>.
              </>
            ) : null}
          </p>
        </header>

        {/* Search bar */}
        <form action="/tools" className="relative mb-4 max-w-lg">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            name="search"
            defaultValue={rawSearch}
            aria-label="Search tools"
            placeholder="Search tools... (e.g. PDF compressor, image converter)"
            className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-[12.5px] text-gray-700 placeholder:text-gray-400 shadow-sm focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100"
          />
        </form>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500">
            <Filter className="h-3 w-3" />
            Filter by Category:
          </span>

          {/* Active "All Tools" chip */}
          <button className="rounded-full bg-amber-400 px-3 py-1 text-[11.5px] font-bold text-white shadow-sm">
            All Tools ({allTools.length})
          </button>

          {TOOL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11.5px] font-semibold text-gray-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600"
            >
              {c.label} ({c.tools.length})
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group relative flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-md"
            >
              {/* Trending / Ad badge */}
              {tool.badge && (
                <span className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-orange-50 px-2 py-0.5 text-[9px] font-bold text-orange-500">
                  🔥 {tool.badge}
                </span>
              )}

              {/* Icon box */}
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-amber-50 text-amber-500">
                {tool.icon ? (
                  <span className="text-base">{tool.icon}</span>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pr-10">
                <div className="text-[13px] font-bold text-gray-900 leading-snug">
                  {tool.name}
                </div>
                {tool.description && (
                  <div className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-gray-400">
                    {tool.description}
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-medium text-gray-400">
                      {tool.category}
                    </span>
                    {tool.users && (
                      <span className="text-[10px] text-gray-400">{tool.users} users</span>
                    )}
                  </div>
                </div>
                <span className="mt-2 inline-block text-[11px] font-semibold text-amber-500 transition group-hover:text-amber-600">
                  Use Tool
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-amber-100 bg-white p-5 text-[12.5px] text-gray-600">
            No tools found. Try a different search.
          </div>
        ) : null}

        {/* Bottom ad */}
        <div className="mt-10">
          <AdBlock size="728x90" />
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}