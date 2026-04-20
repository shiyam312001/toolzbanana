"use client";

import Link from "next/link";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", match: (p) => p === "/" },
  {
    href: "/tools",
    label: "All tools",
    match: (p) => p === "/tools" || p.startsWith("/tools/"),
  },
  { href: "/categories", label: "Categories", match: (p) => p === "/categories" },
  { href: "/about", label: "About", match: (p) => p === "/about" },
];

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery =
    (pathname || "") === "/tools" ? searchParams?.get("search") || "" : "";
  const [query, setQuery] = useState(() => initialQuery);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => getInitialTheme());

  const isDark = theme === "dark";

  // Show search bar only after scrolling 200px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apply theme to the document root.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  };

  const runSearch = () => {
    const q = (query || "").trim();
    router.push(q.length ? `/tools?search=${encodeURIComponent(q)}` : "/tools");
    setMobileOpen(false);
  };

  const breadcrumb = useMemo(() => {
    const parts = (pathname || "").split("/").filter(Boolean);
    if (!parts.length) return { a: "ToolzBanana", b: "", c: "" };
    const titleCase = (s) =>
      s.split("-").filter(Boolean).map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
    if (parts[0] === "tools") {
      return { a: "ToolzBanana", b: "Tools", c: titleCase(parts[1] || "") };
    }
    return { a: "ToolzBanana", b: titleCase(parts[0]), c: parts[1] ? titleCase(parts[1]) : "" };
  }, [pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: isDark ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #f0f0f0",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ── Main nav row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            {/* Banana SVG icon */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 19C6 19 5 12 10 8C14 5 20 6 22 7"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M11 19C11 19 9 13 13 10C16 8 20 9 21 10"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="22" cy="7" r="2" fill="#f59e0b" />
            </svg>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#f59e0b",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              ToolzBanana
            </span>
          </Link>

          {/* Search bar — fades in after 200px scroll, desktop only */}
          <div
            className="navbar-search-wrap"
            role="search"
            aria-label="Search tools"
            style={{
              position: "relative",
              flex: 1,
              maxWidth: 400,
              opacity: scrolled ? 1 : 0,
              pointerEvents: scrolled ? "auto" : "none",
              transform: scrolled ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          >
            <Search
              aria-hidden
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 14,
                height: 14,
                color: isDark ? "rgba(226,232,240,0.55)" : "#9ca3af",
                pointerEvents: "none",
              }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              aria-label="Search tools"
              style={{
                width: "100%",
                padding: "7px 14px 7px 34px",
                fontSize: 14,
                border: isDark
                  ? "1.5px solid rgba(148,163,184,0.22)"
                  : "1.5px solid #e5e7eb",
                borderRadius: 999,
                backgroundColor: isDark ? "rgba(2,6,23,0.35)" : "#f9fafb",
                color: isDark ? "#e2e8f0" : "#111827",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s, background-color 0.15s",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#f59e0b";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)";
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(2,6,23,0.55)"
                  : "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = isDark
                  ? "rgba(148,163,184,0.22)"
                  : "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(2,6,23,0.35)"
                  : "#f9fafb";
              }}
            />
          </div>

          {/* Spacer pushes nav to the right */}
          <div style={{ flex: 1 }} />

          {/* Desktop nav links */}
          <nav aria-label="Primary" className="navbar-desktop-nav">
            {NAV_LINKS.map((item) => {
              const active = item.match(pathname || "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    color: active ? "#d97706" : "#374151",
                    padding: "6px 12px",
                    borderRadius: 999,
                    backgroundColor: active ? "#fef3c7" : "transparent",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            className="navbar-desktop-theme"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 999,
              border: isDark
                ? "1.5px solid rgba(148,163,184,0.22)"
                : "1.5px solid #e5e7eb",
              backgroundColor: isDark ? "rgba(2,6,23,0.25)" : "transparent",
              cursor: "pointer",
              color: isDark ? "rgba(226,232,240,0.75)" : "#6b7280",
              flexShrink: 0,
              transition: "background-color 0.15s",
            }}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? "rgba(2,6,23,0.38)"
                : "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? "rgba(2,6,23,0.25)"
                : "transparent";
            }}
          >
            {isDark ? (
              <Sun style={{ width: 15, height: 15 }} />
            ) : (
              <Moon style={{ width: 15, height: 15 }} />
            )}
          </button>

          {/* Explore Tools CTA */}
          <Link
            href="/tools"
            className="navbar-desktop-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              backgroundColor: "#f59e0b",
              padding: "8px 18px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background-color 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d97706";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f59e0b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Tools
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="navbar-mobile-menu"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 999,
              border: isDark
                ? "1.5px solid rgba(148,163,184,0.22)"
                : "1.5px solid #e5e7eb",
              backgroundColor: isDark ? "rgba(2,6,23,0.25)" : "transparent",
              cursor: "pointer",
              color: isDark ? "#e2e8f0" : "#374151",
              flexShrink: 0,
            }}
          >
            {mobileOpen ? (
              <X style={{ width: 18, height: 18 }} />
            ) : (
              <Menu style={{ width: 18, height: 18 }} />
            )}
          </button>
        </div>

        {/* ── Breadcrumb row (lg+) ── */}
       

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div
            className="navbar-mobile-drawer"
            style={{
              borderTop: isDark
                ? "1px solid rgba(148,163,184,0.18)"
                : "1px solid #f0f0f0",
              padding: "14px 0",
            }}
          >
            <div role="search" style={{ position: "relative", marginBottom: 12 }}>
              <Search
                aria-hidden
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 14,
                  height: 14,
                  color: isDark ? "rgba(226,232,240,0.55)" : "#9ca3af",
                  pointerEvents: "none",
                }}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools..."
                aria-label="Search tools"
                style={{
                  width: "100%",
                  padding: "9px 14px 9px 34px",
                  fontSize: 14,
                  border: isDark
                    ? "1.5px solid rgba(148,163,184,0.22)"
                    : "1.5px solid #e5e7eb",
                  borderRadius: 999,
                  backgroundColor: isDark ? "rgba(2,6,23,0.35)" : "#f9fafb",
                  color: isDark ? "#e2e8f0" : "#111827",
                  outline: "none",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runSearch();
                }}
              />
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV_LINKS.map((item) => {
                const active = item.match(pathname || "");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      color: active
                        ? "#d97706"
                        : isDark
                          ? "rgba(226,232,240,0.88)"
                          : "#374151",
                      padding: "10px 12px",
                      borderRadius: 8,
                      backgroundColor: active
                        ? "#fef3c7"
                        : isDark
                          ? "rgba(2,6,23,0.18)"
                          : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                marginTop: 10,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderRadius: 10,
                padding: "10px 12px",
                border: isDark
                  ? "1.5px solid rgba(148,163,184,0.22)"
                  : "1.5px solid #e5e7eb",
                backgroundColor: isDark ? "rgba(2,6,23,0.25)" : "#fff",
                color: isDark ? "#e2e8f0" : "#374151",
                fontWeight: 700,
                cursor: "pointer",
              }}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun style={{ width: 16, height: 16 }} /> : <Moon style={{ width: 16, height: 16 }} />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
            <Link
              href="/tools"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#f59e0b",
                padding: "10px 18px",
                borderRadius: 8,
                marginTop: 12,
              }}
            >
              Explore Tools
            </Link>
          </div>
        )}
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        .navbar-breadcrumb {
          display: none;
          align-items: center;
          border-top: 1px solid #f3f4f6;
          padding: 5px 0;
        }
        @media (min-width: 768px) {
          .navbar-desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 2px;
          }
          .navbar-desktop-theme { display: inline-flex !important; }
          .navbar-desktop-cta   { display: inline-flex !important; }
          .navbar-mobile-menu   { display: none !important; }
          .navbar-mobile-drawer { display: none !important; }
          .navbar-search-wrap   { display: block !important; }
        }
        @media (max-width: 767px) {
          .navbar-desktop-nav   { display: none !important; }
          .navbar-desktop-theme { display: none !important; }
          .navbar-desktop-cta   { display: none !important; }
          .navbar-mobile-menu   { display: inline-flex !important; }
          .navbar-search-wrap   { display: none !important; }
        }
        @media (min-width: 1024px) {
          .navbar-breadcrumb { display: flex; }
        }
      `}</style>
    </header>
  );
}