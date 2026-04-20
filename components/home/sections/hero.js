import Link from "next/link";
import { Search } from "lucide-react";
import { SectionWrapper } from "../../ui/SectionWrapper";

const CATEGORY_CHIPS = [
  { label: "PDF",        emoji: "📄", href: "/#categories" },
  { label: "Image",      emoji: "🖼️", href: "/#categories" },
  { label: "Text",       emoji: "📝", href: "/#categories" },
  { label: "Developer",  emoji: "👾", href: "/tools" },
  { label: "Calculator", emoji: "🧮", href: "/#categories" },
  { label: "Security",   emoji: "🔒", href: "/#categories" },
];

export function Hero() {
  return (
    <SectionWrapper
      className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-[#fdf3e3] via-[#fef9f1] to-white"
      padded="small"
    >
      <div className="mx-auto flex max-w-[480px] flex-col items-center py-10 text-center">

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-500 shadow-sm">
          🍌 60+ Free Tools Available
        </div>

        {/* Heading */}
        <h1 className="text-[2.25rem] font-extrabold leading-[1.15] tracking-tight text-gray-900">
          Free Online Tools That{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Make Work Easy
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-gray-400">
          Simplify your workflow with our comprehensive collection of free online
          tools. No signup required, completely free forever.
        </p>

        {/* Search bar */}
        <div className="mt-6 flex w-full items-center rounded-full border border-gray-200 bg-white px-3 py-[5px] shadow-sm">
          <Search className="mr-2 h-3.5 w-3.5 shrink-0 text-gray-400" />
          <input
            placeholder='Search any tool... "Hash Generator"'
            aria-label="Search for a tool"
            className="min-w-0 flex-1 bg-transparent text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          <button className="shrink-0 rounded-full bg-amber-400 px-4 py-1.5 text-[12px] font-bold text-white transition hover:bg-amber-500">
            Search
          </button>
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {CATEGORY_CHIPS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-[5px] text-[11px] font-medium text-gray-600 shadow-sm transition hover:border-amber-200 hover:text-amber-600"
            >
              <span className="text-[10px]">{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-6 py-2 text-[13px] font-bold text-white shadow-md transition hover:bg-amber-500"
          >
            Browse all Tools →
          </Link>
          <Link
            href="/#categories"
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 text-[13px] font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            View Categories
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
}