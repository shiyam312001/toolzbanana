import Link from "next/link";
import { Footer } from "../../components/home/sections/footer";
import { SectionWrapper } from "../../components/ui/SectionWrapper";

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Categories",
  description: "Explore ToolzBanana tools organized by category.",
  alternates: { canonical: `${SITE_URL}/categories` },
};

// Each category matches the screenshot exactly:
// color = card bg, iconBg = white circle bg, iconColor = icon stroke color,
// linkColor = "View Tools →" color
const categories = [
  {
    title: "PDF Tools",
    count: "12 tools available",
    subtitle: "Compress, merge, split, and convert PDF files",
    href: "/tools?category=pdf",
    bg: "bg-red-100",
    decorBg: "bg-red-200/50",
    linkColor: "text-red-500",
    iconColor: "text-red-500",
    icon: (
      // Document with lines icon
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    title: "Image Tools",
    count: "15 tools available",
    subtitle: "Resize, compress, convert, and edit images",
    href: "/tools?category=image",
    bg: "bg-purple-100",
    decorBg: "bg-purple-200/50",
    linkColor: "text-purple-500",
    iconColor: "text-purple-500",
    icon: (
      // Image frame with mountain icon
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Text Tools",
    count: "18 tools available",
    subtitle: "Format, count, convert, and manipulate text",
    href: "/tools?category=text",
    bg: "bg-blue-100",
    decorBg: "bg-blue-200/50",
    linkColor: "text-blue-500",
    iconColor: "text-blue-500",
    icon: (
      // Bold T icon
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    title: "Developer Tools",
    count: "14 tools available",
    subtitle: "JSON, Base64, Hash, and encoding tools",
    href: "/tools?category=developer",
    bg: "bg-green-100",
    decorBg: "bg-green-200/50",
    linkColor: "text-green-600",
    iconColor: "text-green-600",
    icon: (
      // Code brackets
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Calculators",
    count: "10 tools available",
    subtitle: "Financial, scientific, and unit calculators",
    href: "/tools?category=calculator",
    bg: "bg-yellow-100",
    decorBg: "bg-yellow-200/50",
    linkColor: "text-yellow-600",
    iconColor: "text-yellow-600",
    icon: (
      // Calculator icon
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <circle cx="8" cy="11" r="0.5" fill="currentColor" />
        <circle cx="12" cy="11" r="0.5" fill="currentColor" />
        <circle cx="16" cy="11" r="0.5" fill="currentColor" />
        <circle cx="8" cy="15" r="0.5" fill="currentColor" />
        <circle cx="12" cy="15" r="0.5" fill="currentColor" />
        <circle cx="16" cy="15" r="0.5" fill="currentColor" />
        <circle cx="8" cy="19" r="0.5" fill="currentColor" />
        <circle cx="12" cy="19" r="0.5" fill="currentColor" />
        <circle cx="16" cy="19" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Security Tools",
    count: "8 tools available",
    subtitle: "Password generators, encryption, and hashing",
    href: "/tools?category=security",
    bg: "bg-orange-100",
    decorBg: "bg-orange-200/50",
    linkColor: "text-orange-500",
    iconColor: "text-orange-500",
    icon: (
      // Shield icon
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SectionWrapper padded="large">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-[2rem] font-extrabold tracking-tight text-gray-900">
            Tool Categories
          </h1>
          <p className="mt-2 text-[13px] text-gray-500">
            Explore our tools organized by category.
          </p>
        </div>

        {/* 3-col category card grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden rounded-2xl p-6 transition hover:shadow-md ${cat.bg}`}
            >
              {/* Decorative blob top-right */}
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full ${cat.decorBg}`}
                aria-hidden
              />

              {/* Icon box */}
              <div className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ${cat.iconColor}`}>
                {cat.icon}
              </div>

              {/* Title */}
              <h2 className="mt-4 text-[1.05rem] font-extrabold text-gray-900">
                {cat.title}
              </h2>

              {/* Count */}
              <p className="mt-1 text-[12px] font-semibold text-gray-700">
                {cat.count}
              </p>

              {/* Subtitle */}
              <p className="mt-2 text-[12px] leading-relaxed text-gray-600">
                {cat.subtitle}
              </p>

              {/* View Tools link */}
              <div className={`mt-5 text-[12.5px] font-bold ${cat.linkColor}`}>
                View Tools →
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}