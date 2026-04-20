import Link from "next/link";
import { SectionWrapper } from "../../ui/SectionWrapper";

const categoryCards = [
  {
    title: "PDF Tools",
    subtitle: "Compress, merge, split, and convert PDF files",
    count: "13 tools",
    href: "/tools?category=pdf",
    icon: (
      // Document with fold icon
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    title: "Image Tools",
    subtitle: "Resize, compress, convert, and edit images",
    count: "11 tools",
    href: "/tools?category=image",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Text Tools",
    subtitle: "Format, count, convert, and manipulate text",
    count: "18 tools",
    href: "/tools?category=text",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    title: "Developer Tools",
    subtitle: "JSON, Base64, Hash, and encoding tools",
    count: "14 tools",
    href: "/tools?category=developer",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Calculators",
    subtitle: "Financial, scientific, and unit calculators",
    count: "10 tools",
    href: "/tools?category=calculator",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="8" y2="10" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="10" x2="16" y2="10" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="8" y1="18" x2="8" y2="18" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="18" x2="16" y2="18" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Security Tools",
    subtitle: "Password generators, encryption, and hashing",
    count: "8 tools",
    href: "/tools?category=security",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function ToolCategories() {
  return (
    <SectionWrapper id="categories" className="bg-white">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-[1.6rem] font-extrabold tracking-tight text-gray-900">
          Explore by Category
        </h2>
        <p className="mt-1.5 text-[12.5px] text-gray-400">
          Choose from our wide range of tool categories
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categoryCards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-6 py-8 text-center shadow-sm transition hover:border-amber-200 hover:shadow-md"
          >
            {/* Icon — amber outline */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              {c.icon}
            </div>

            <div className="mt-3 text-[13px] font-bold text-gray-900">{c.title}</div>
            <p className="mt-1 text-[11px] leading-relaxed text-gray-400">
              {c.subtitle}
            </p>
            <div className="mt-3 text-[11px] font-medium text-gray-400">{c.count}</div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}