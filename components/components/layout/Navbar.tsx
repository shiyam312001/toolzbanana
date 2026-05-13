"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const THEME_KEY = "toolqube-theme";

  const toggleDarkMode = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(THEME_KEY, nextIsDark ? "dark" : "light");
  };

  useEffect(() => {
    // Always start in light mode on initial page load.
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem(THEME_KEY, "light");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl group-hover:scale-110 transition-transform">
              🍌
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              ToolzBanana
            </span>
          </Link>

          <div
            className={`hidden md:flex items-center flex-1 max-w-md mx-8 transition-all duration-300 ${
              isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 placeholder-gray-500"
                />
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-gray-700 hover:text-yellow-600 transition-colors">
              All tools
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              href="/tools"
              className="hidden sm:inline-flex px-4 py-2 bg-[#FFC72C] text-gray-900 rounded-lg hover:bg-[#E6B000] transition-colors font-bold"
            >
              Explore Tools
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-yellow-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                All Tools
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-yellow-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/tools" className="inline-flex justify-center px-4 py-2 bg-[#FFC72C] text-gray-900 rounded-lg hover:bg-[#E6B000] transition-colors" onClick={() => setIsMenuOpen(false)}>
                Explore Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
