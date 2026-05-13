import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍌</span>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ToolzBanana
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Free browser-based utilities for developers and creators—JSON, JWT, PDF, and image workflows—with in-depth guides on every tool page.
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} ToolzBanana. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Blog & guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
