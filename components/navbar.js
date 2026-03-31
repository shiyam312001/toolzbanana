"use client";

import { Search, ChevronDown, Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-amber-100 bg-[#FEFDF7]">
      {/* ── Main bar ── */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white shadow-sm">
            {/* Banana emoji-style icon */}
            <span className="text-base leading-none">🍌</span>
          </div>
          <span className="text-base font-bold tracking-tight">
            <span className="text-slate-900">Banana</span>
            <span className="text-amber-500">Toolz</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-amber-50 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden flex-1 items-center md:flex">
          <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-100">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              placeholder="Search tools..."
              aria-label="Search tools"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Bell */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-amber-50 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          {/* CTA */}
          <Link
            href="/submit"
            className="hidden items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-500 hover:shadow-md sm:inline-flex"
          >
            Submit Tool
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-amber-50 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="border-t border-amber-100 bg-[#FEFDF7] px-4 pb-4 md:hidden">
          {/* Mobile search */}
          <div className="mb-3 mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              placeholder="Search tools..."
              aria-label="Search tools"
            />
          </div>

          {/* Mobile nav */}
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-50 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <Link
            href="/submit"
            className="mt-3 flex w-full items-center justify-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
          >
            Submit Tool
          </Link>
        </div>
      )}
    </header>
  );
}