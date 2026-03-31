import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";

const pillLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "PDF Tools", href: "/#categories" },
  { label: "Image Tools", href: "/#categories" },
  { label: "Developer Tools", href: "/tools" },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 lg:px-6 lg:pb-14 lg:pt-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h1 className="text-[34px] font-semibold leading-[1.12] tracking-tight text-slate-900 lg:text-[44px]">
              Free Online Tools That{" "}
              <span className="text-[#F59E0B]">Make Work Easy</span>
            </h1>
            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-600">
              Simple, fast, and secure tools for PDF, images, and developers. No sign-up
              required — just pick a tool and get the job done.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {pillLinks.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  {p.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex max-w-xl items-center gap-2 rounded-full border border-black/10 bg-white p-1 shadow-sm">
              <div className="hidden items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-slate-700 sm:inline-flex">
                <span>Tools</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>

              <div className="flex flex-1 items-center gap-2 rounded-full bg-[#FAFAFA] px-4 py-2.5">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  placeholder="Search for a tool..."
                  aria-label="Search for a tool"
                  className="w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full bg-[#FFC83D] px-5 py-2.5 text-[12px] font-semibold text-slate-900 shadow-sm hover:bg-[#ffbf1f]"
              >
                Search
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-[270px] w-[270px] items-center justify-center lg:mx-0 lg:h-[320px] lg:w-[320px]">
            <div className="absolute inset-0 rounded-full bg-[#FFE7A6]" />
            <div className="absolute inset-6 rounded-full bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] ring-1 ring-black/5" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)] ring-1 ring-black/5">
              <span className="text-3xl">🍌</span>
            </div>

            <div className="absolute right-0 top-10 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-slate-900 shadow-sm ring-1 ring-black/5">
              100+ Tools
            </div>
            <div className="absolute left-0 top-20 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-slate-900 shadow-sm ring-1 ring-black/5">
              Fast & Secure
            </div>
            <div className="absolute bottom-6 right-6 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-slate-900 shadow-sm ring-1 ring-black/5">
              No Signup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

