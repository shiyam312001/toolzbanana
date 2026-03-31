import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-10 bg-[#0B0F19]">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="text-[15px] font-semibold text-white">BananaToolz</div>
            <p className="mt-2 text-[12px] leading-6 text-white/70">
              Free online tools for PDF, images, and developers.
            </p>
          </div>

          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Tools
            </div>
            <ul className="mt-4 space-y-2 text-[12px] text-white/75">
              <li>
                <Link href="/tools" className="hover:text-white">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white">
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Company
            </div>
            <ul className="mt-4 space-y-2 text-[12px] text-white/75">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-[12px] text-white/75">
              <li>
                <a href="mailto:hello@bananatoolz.com" className="hover:text-white">
                  hello@bananatoolz.com
                </a>
              </li>
              <li className="text-white/60">© {new Date().getFullYear()} BananaToolz</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

