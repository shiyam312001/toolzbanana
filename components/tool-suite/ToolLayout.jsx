"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { OmniSidebar } from "./OmniSidebar";

/** Main canvas: fluid padding, safe areas, no horizontal overflow — all breakpoints */
const OMNI_MAIN =
  "omni-main-panel flex-1 flex flex-col min-h-0 min-w-0 w-full max-w-full " +
  "overflow-x-hidden overflow-y-auto overscroll-y-contain " +
  "px-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] " +
  "sm:px-5 sm:pt-5 sm:pb-6 " +
  "md:px-7 md:py-7 " +
  "lg:px-10 lg:py-10 " +
  "[&_h1]:text-balance [&_h2]:text-balance";

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCutcayU2ZIMBcv1n1IaVVqFK939PvI8-1c9aFyhuB-r2u0pb8dRoKW_RXHUCtVW4Fhz0wpgeYKQjGIRyNGyTSqNKfwHZBLEkPsX8sqslENikqi7pHTIO2lRk9wDIhGT9Eaq3aC5sonp44F5gLe1-6ScaHwRSq0OuhNKQhBX0jooWe31a6oW7kUcVNXGCWJHhTjKTGOCPHFVVFucyWbAZyd9fm0gxAHB0aL6B-1DKNZkPoLXCUpe3Tg8oFd3u2TIU0GPtN3YWEUS4Q";

const CODE_NAV_AVATAR = AVATAR_SRC;

const IMAGE_NAV_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCmYfo8CZemIBIuXG9VU2UgG38A5BNKI9UXFJ5v9N1QbqN6PIAbB0NaYBLC8EbaFzE5tsnBbb-yPXvn3lzQqpg_E8ef03Etzm56LSnaZFda5avN5g9PuPFi8bWZrccuqiR7QF8C5YWnErPYR5qMHVo9B8xoYdLNUxCtqxJk0Pd7uQwmGiNZ_-Zcrpe1yBpOrSVZN6x5KWiwxO-kAZOQvAiBUcylWdqSzaIyForTv4JZaKMf2czozPrejRgIBG50ZyTKUeVXw47CQoM";

const PDF_NAV_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHfzVkdZdsftLvfIhYsANgilYccN6C_cZrXRRfmjUcLjBBVG6QeYJa5YmDKhhNap-5lPzRiH1szbGseCDBC17wzJp2RsAGAHlB6lhkTa3zdDNPwwvFhM6h2sThOC3nRraJbmz9saoGRY_InqjFY-9mVpfmH9P_SKJNvWKBvtzlsDNDgQy6SmHWNxhIFazMHd8I5HPDBsl3NctYkJrxr2BftDTkyVx0FcgcgOVwrS1s-SZgC-C7w465yOdywZwZ2z-MEPXuULDOhBI";

function SiteBrand() {
  return (
    <Link
      href="/"
      className="text-xl font-bold tracking-tight text-[#2c2f30] dark:text-slate-100 font-headline hover:opacity-90"
    >
      ToolzBanana
    </Link>
  );
}

/** Top nav — code + hub “code” shell */
function CodeTopNav({ onOpenSidebar }) {
  return (
    <nav className="bg-[#f5f6f7] dark:bg-slate-900 w-full max-w-[100vw] top-0 z-40 flex justify-between items-center gap-2 px-3 sm:px-6 md:px-8 min-h-[56px] sm:min-h-[64px] py-2.5 sm:py-3 border-b border-black/[0.06] overflow-x-hidden">
      <div className="flex items-center gap-3 md:gap-8 min-w-0">
        <button
          type="button"
          className="md:hidden p-2 -ml-1 rounded-full text-on-surface-variant hover:bg-surface-container-low shrink-0"
          aria-label="Open tools menu"
          onClick={onOpenSidebar}
        >
          <span className="material-symbols-outlined text-[24px] leading-none">menu</span>
        </button>
        <SiteBrand />
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/tools"
            className="text-[#4647d3] dark:text-[#9396ff] font-semibold border-b-2 border-[#4647d3] font-['Plus_Jakarta_Sans'] text-sm hover:text-[#4647d3] transition-colors duration-200"
          >
            Tools
          </Link>
          <a
            className="text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans'] text-sm hover:text-[#4647d3] transition-colors duration-200"
            href="#"
          >
            History
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans'] text-sm hover:text-[#4647d3] transition-colors duration-200"
            href="#"
          >
            API
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px] leading-none">
            search
          </span>
          <input
            className="bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-primary/30 focus:bg-white transition-all w-56 lg:w-64 align-middle"
            placeholder="Search tools..."
            type="search"
          />
        </div>
        <button
          type="button"
          className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[22px] leading-none">notifications</span>
        </button>
        <button
          type="button"
          className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[22px] leading-none">settings</span>
        </button>
        <div className="h-9 w-9 rounded-full overflow-hidden sm:ml-1 bg-surface-container-high ring-2 ring-primary-container/20 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User profile avatar"
            src={CODE_NAV_AVATAR}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

function ImageTopNav({ onOpenSidebar }) {
  return (
    <header className="w-full max-w-[100vw] top-0 z-40 bg-[#f5f6f7] dark:bg-slate-900 flex justify-between items-center gap-2 px-3 sm:px-6 md:px-8 min-h-[56px] sm:min-h-[64px] py-2.5 sm:py-3 border-b border-black/[0.06] overflow-x-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          className="md:hidden p-2 -ml-1 rounded-full text-on-surface-variant hover:bg-surface-container-low shrink-0"
          aria-label="Open tools menu"
          onClick={onOpenSidebar}
        >
          <span className="material-symbols-outlined text-[24px] leading-none">menu</span>
        </button>
        <SiteBrand />
      </div>
      <nav className="hidden md:flex items-center space-x-8 font-['Plus_Jakarta_Sans'] text-sm font-medium">
        <Link
          href="/tools"
          className="text-[#4647d3] dark:text-[#9396ff] font-semibold border-b-2 border-[#4647d3] transition-colors duration-200"
        >
          Tools
        </Link>
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-[#4647d3] transition-colors duration-200"
          href="#"
        >
          History
        </a>
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-[#4647d3] transition-colors duration-200"
          href="#"
        >
          API
        </a>
      </nav>
      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <button
          type="button"
          className="hidden sm:flex p-2 text-slate-500 hover:text-[#4647d3] transition-all active:opacity-80 sm:p-0"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
        </button>
        <button
          type="button"
          className="hidden sm:flex p-2 text-slate-500 hover:text-[#4647d3] transition-all active:opacity-80 sm:p-0"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User profile avatar"
            className="h-full w-full object-cover"
            src={IMAGE_NAV_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}

function PdfTopNav({ onOpenSidebar }) {
  return (
    <header className="w-full top-0 z-40 bg-[#f5f6f7] dark:bg-slate-900 flex justify-between items-center px-4 sm:px-8 min-h-[64px] py-3 border-b border-black/[0.06] w-full">
      <div className="flex items-center gap-3 md:gap-8 min-w-0">
        <button
          type="button"
          className="md:hidden p-2 -ml-1 rounded-full text-on-surface-variant hover:bg-surface-container-low shrink-0"
          aria-label="Open tools menu"
          onClick={onOpenSidebar}
        >
          <span className="material-symbols-outlined text-[24px] leading-none">menu</span>
        </button>
        <SiteBrand />
        <nav className="hidden md:flex gap-6">
          <Link
            href="/tools"
            className="text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans'] text-sm font-medium hover:text-[#4647d3] transition-colors duration-200"
          >
            Tools
          </Link>
          <a
            className="text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans'] text-sm font-medium hover:text-[#4647d3] transition-colors duration-200"
            href="#"
          >
            History
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans'] text-sm font-medium hover:text-[#4647d3] transition-colors duration-200"
            href="#"
          >
            API
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px] leading-none">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2.5 bg-surface-container-lowest border-none rounded-xl text-sm w-56 lg:w-64 focus:ring-2 focus:ring-primary/20"
            placeholder="Search files..."
            type="search"
          />
        </div>
        <button
          type="button"
          className="p-2.5 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[22px] leading-none">notifications</span>
        </button>
        <button
          type="button"
          className="p-2.5 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[22px] leading-none">settings</span>
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src={PDF_NAV_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * @param {{
 *   variant: "code" | "image" | "pdf",
 *   activeToolSlug: string | null,
 *   activeHubKey: "code" | "image" | "pdf" | null,
 *   sidebarHeader?: "code" | "pdf",
 *   children: React.ReactNode
 * }} props
 */
export function ToolLayout({
  variant,
  activeToolSlug = null,
  activeHubKey = null,
  sidebarHeader = "code",
  children,
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  const wrapperClass =
    "omni-tool-root omni-layout-shell light bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-[100dvh] overflow-x-hidden";

  const sidebar = (
    <OmniSidebar
      activeToolSlug={activeToolSlug}
      activeHubKey={activeHubKey}
      header={sidebarHeader}
      mobileOpen={mobileNavOpen}
      onMobileClose={closeMobileNav}
    />
  );

  if (variant === "code") {
    return (
      <div className={`${wrapperClass} flex flex-col`}>
        <CodeTopNav onOpenSidebar={openMobileNav} />
        <div className="flex-1 flex min-h-0 max-w-[100vw] overflow-hidden">
          {sidebar}
          <main className={OMNI_MAIN}>{children}</main>
        </div>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div className={`${wrapperClass} flex flex-col antialiased`}>
        <ImageTopNav onOpenSidebar={openMobileNav} />
        <div className="flex-1 flex min-h-0 max-w-[100vw] overflow-hidden">
          {sidebar}
          <main className={`${OMNI_MAIN} items-center`}>{children}</main>
        </div>
      </div>
    );
  }

  if (variant === "pdf") {
    return (
      <div className={`${wrapperClass} flex min-w-0`}>
        {sidebar}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 max-w-[100vw] overflow-hidden">
          <PdfTopNav onOpenSidebar={openMobileNav} />
          <main
            className={`${OMNI_MAIN} max-w-6xl mx-auto w-full xl:max-w-7xl`}
          >
            {children}
          </main>
        </div>
      </div>
    );
  }

  return null;
}
