"use client";

import Link from "next/link";
import { Menu, Moon, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  {
    href: "/tools",
    label: "All tools",
    match: (p: string) => p === "/tools" || p.startsWith("/tools/"),
  },
  { href: "/categories", label: "Categories", match: (p: string) => p === "/categories" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        height:77,
        padding:"10px 0",
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: scrolled ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div className="ds-container">
        <div style={{ display: "flex", alignItems: "center", height: 56, gap: 8 }}>

          {/* ① Logo — desktop only */}
          <Link
            href="/"
            className="navbar-desktop-only"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              flexShrink: 0,
              marginRight: 8,
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }} aria-hidden>🍌</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#f59e0b", letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>
              ToolzBanana
            </span>
          </Link>

          {/* ② Search — desktop only */}
          <div
            role="search"
            aria-label="Search tools"
            className="navbar-desktop-only"
            style={{ position: "relative", width: 360, marginRight: 25,marginLeft: 15 }}
          >
            <Search
              aria-hidden
              style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                width: 15, height: 15, color: "#9ca3af", pointerEvents: "none",
              }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              aria-label="Search tools"
              style={{
                width: "100%",
                padding: "8px 14px 8px 36px",
                fontSize: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                backgroundColor: "#f9fafb",
                color: "#111827",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#f59e0b";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)";
                e.currentTarget.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
            />
          </div>

          {/* ③ Nav links — desktop only */}
          <nav
            aria-label="Primary"
            className="navbar-desktop-only"
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
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
                    padding: "6px 14px",
                    borderRadius: 999,
                    backgroundColor: active ? "#fef3c7" : "transparent",
                    transition: "background-color 0.15s, color 0.15s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Spacer pushes icons + CTA to the right */}
          <div />

          {/* ④ Theme toggle icon — desktop only */}
          <button
            type="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            className="navbar-desktop-only"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "#6b7280",
              transition: "background-color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#f3f4f6")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
          >
            <Moon style={{ width: 15, height: 15 }} />
          </button>

          {/* ⑤ Explore Tools CTA — desktop only */}
          <Link
            href="/tools"
            className="navbar-desktop-only"
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
              marginLeft: 12,
              border: "none",
              boxShadow: "0 2px 6px rgba(245,158,11,0.35)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background-color 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#d97706";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#f59e0b";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Explore Tools
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="navbar-mobile-only"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "#374151",
              flexShrink: 0,
            }}
          >
            {mobileOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            style={{ borderTop: "1px solid #e5e7eb", padding: "16px 0" }}
            className="navbar-mobile-only"
          >
            <div role="search" aria-label="Search tools" style={{ position: "relative", marginBottom: 12 }}>
              <Search
                aria-hidden
                style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  width: 15, height: 15, color: "#9ca3af", pointerEvents: "none",
                }}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                aria-label="Search tools"
                style={{
                  width: "100%",
                  padding: "9px 14px 9px 36px",
                  fontSize: 14,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  backgroundColor: "#f9fafb",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }} aria-label="Mobile primary">
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
                      color: active ? "#d97706" : "#374151",
                      padding: "10px 12px",
                      borderRadius: 8,
                      backgroundColor: active ? "#fef3c7" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

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

      <style>{`
        .navbar-desktop-only { display: none !important; }
        @media (min-width: 768px) {
          .navbar-desktop-only { display: flex !important; }
        }
        .navbar-mobile-only { display: none !important; }
        @media (max-width: 767px) {
          .navbar-mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}