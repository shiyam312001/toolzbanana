import Link from "next/link";
import { SectionWrapper } from "../../ui/SectionWrapper";

// Navbar shown above "How it works" in screenshot
export function HowItWorksNavbar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-base font-extrabold text-gray-900">🍌 ToolzBanana</span>
      </div>

      {/* Search */}
      <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 sm:flex">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          placeholder="Search tools..."
          className="w-28 bg-transparent text-[11px] placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {/* Nav links */}
      <div className="hidden items-center gap-5 sm:flex">
        <span className="text-[11px] text-gray-500">rk</span>
        <Link href="/" className="text-[11px] font-medium text-gray-600 hover:text-gray-900">Home</Link>
        <Link href="/tools" className="text-[11px] font-medium text-gray-600 hover:text-gray-900">All tools</Link>
        <Link href="/categories" className="text-[11px] font-medium text-gray-600 hover:text-gray-900">Categories</Link>
        <Link href="/about" className="text-[11px] font-medium text-gray-600 hover:text-gray-900">About</Link>
        {/* Theme toggle placeholder */}
        <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[11px]">☀</button>
        <Link
          href="/tools"
          className="rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-bold text-white transition hover:bg-amber-500"
        >
          Explore Tools
        </Link>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "1",
    title: "Choose Your Tool",
    body: "Browse our collection and select the tool you need from 60+ options.",
    icon: "🔍",
    color: "bg-purple-100 text-purple-500",
    badge: "bg-purple-500",
  },
  {
    n: "2",
    title: "Upload & Configure",
    body: "Upload your file or input data and customize settings as needed.",
    icon: "⚙️",
    color: "bg-orange-100 text-orange-500",
    badge: "bg-orange-500",
  },
  {
    n: "3",
    title: "Download Results",
    body: "Process instantly and download your results in seconds.",
    icon: "⬇️",
    color: "bg-green-100 text-green-500",
    badge: "bg-green-500",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[12px] font-medium text-gray-400">Get things done in three simple steps</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="flex flex-col items-center text-center">
            {/* Icon circle with numbered badge */}
            <div className={`relative flex h-14 w-14 items-center justify-center rounded-full text-2xl ${s.color}`}>
              {s.icon}
              <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white ${s.badge}`}>
                {s.n}
              </span>
            </div>
            <p className="mt-4 text-[13px] font-bold text-gray-900">{s.title}</p>
            <p className="mt-1.5 max-w-[160px] text-[11px] leading-relaxed text-gray-400">{s.body}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}