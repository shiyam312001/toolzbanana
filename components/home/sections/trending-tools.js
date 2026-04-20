import Link from "next/link";
import { SectionWrapper } from "../../ui/SectionWrapper";

// Matches the screenshot: 4 tools in a 3-col then 1-col grid
const recentTools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    category: "Developer",
    users: "16.4k",
    href: "/tools/json-formatter",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Image Compressor",
    description: "Compress images without losing quality",
    category: "Image",
    users: "18.7k",
    href: "/tools/image-compressor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    name: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    category: "Pdf",
    users: "9.2k",
    href: "/tools/pdf-merger",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    category: "Pdf",
    users: "13.9k",
    href: "/tools/pdf-compressor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
];

export function TrendingTools() {
  return (
    <SectionWrapper id="recent" className="bg-white">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[11px] text-white">
          🕐
        </div>
        <div>
          <h2 className="text-[1rem] font-extrabold text-gray-900">Recently Used Tools</h2>
          <p className="text-[11px] text-gray-400">Quick access to your recent tools</p>
        </div>
      </div>

      {/* Tools grid */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recentTools.map((t) => (
          <div
            key={t.name}
            className="relative flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            {/* Trending badge */}
            <span className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-orange-50 px-2 py-0.5 text-[9px] font-bold text-orange-500">
              🔥 Trending
            </span>

            {/* Icon box */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-amber-500">
              {t.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pr-10">
              <div className="text-[12px] font-bold text-gray-900">{t.name}</div>
              <div className="mt-0.5 text-[11px] leading-snug text-gray-400">{t.description}</div>
              <div className="mt-1 text-[10px] font-medium text-gray-300">{t.category}</div>
              <div className="text-[10px] text-gray-400">{t.users} users</div>
              <Link
                href={t.href}
                className="mt-1.5 inline-block text-[11px] font-semibold text-amber-500 hover:text-amber-600"
              >
                Use Tool
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}