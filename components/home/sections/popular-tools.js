import Link from "next/link";
import { SectionWrapper } from "../../ui/SectionWrapper";

const popularTools = [
  {
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    category: "Pdf",
    users: "13.5k",
    href: "/tools/pdf-compressor",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
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
    name: "Background Remover",
    description: "Remove background from images automatically",
    category: "Image",
    users: "12.9k",
    href: "/tools/background-remover",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
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
    name: "QR Code Generator",
    description: "Create QR codes for URLs, text, or contact info",
    category: "Developer",
    users: "16.8k",
    href: "/tools/qr-code-generator",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        <line x1="14" y1="14" x2="14" y2="14" strokeWidth="2.5" /><line x1="18" y1="14" x2="18" y2="14" strokeWidth="2.5" />
        <line x1="21" y1="14" x2="21" y2="14" strokeWidth="2.5" /><line x1="14" y1="18" x2="14" y2="18" strokeWidth="2.5" />
        <line x1="14" y1="21" x2="14" y2="21" strokeWidth="2.5" /><line x1="18" y1="21" x2="18" y2="21" strokeWidth="2.5" />
        <line x1="21" y1="21" x2="21" y2="21" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "Password Generator",
    description: "Generate secure random passwords",
    category: "Security",
    users: "11.9k",
    href: "/tools/password-generator",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export function PopularTools() {
  return (
    <SectionWrapper id="popular" className="bg-white">
      {/* Header row */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-1.5 text-[1rem] font-extrabold text-gray-900">
            🔥 Popular Tools
          </h2>
          <p className="mt-0.5 text-[11px] text-gray-400">Most used tools by our community</p>
        </div>
        <Link
          href="/tools"
          className="text-[11px] font-semibold text-amber-500 transition hover:text-amber-600"
        >
          View all Tools →
        </Link>
      </div>

      {/* 3-col grid */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {popularTools.map((t) => (
          <div
            key={t.name}
            className="relative flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-amber-100 hover:shadow-md"
          >
            {/* Trending badge */}
            <span className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-orange-50 px-2 py-0.5 text-[9px] font-bold text-orange-500">
              🔥 Trending
            </span>

            {/* Icon */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-amber-500">
              {t.icon}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1 pr-12">
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