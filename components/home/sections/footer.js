import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-1.5 text-[13px] font-extrabold text-white">
              🍌 ToolzBanana
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
              Free online tools for your daily tasks.
              <br />Simple, fast, and secure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Quick Links
            </div>
            <ul className="mt-4 space-y-2.5">
              {["Home", "All Tools", "Categories", "About"].map((label) => (
                <li key={label}>
                  <Link href="/" className="text-[12px] text-gray-400 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Categories
            </div>
            <ul className="mt-4 space-y-2.5">
              {["PDF Tools", "Image Tools", "Text Tools", "Developer Tools"].map((label) => (
                <li key={label}>
                  <Link href="/#categories" className="text-[12px] text-gray-400 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Legal
            </div>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-and-conditions" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] text-gray-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-[11px] text-gray-500">
          Made with ❤️ for free tools • © {new Date().getFullYear()} ToolzBanana
        </div>
      </div>
    </footer>
  );
}