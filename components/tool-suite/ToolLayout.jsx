"use client";

import Link from "next/link";
import { AdBlock } from "../ui/AdBlock";
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
  const wrapperClass =
    "omni-tool-root omni-layout-shell light bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-[100dvh] overflow-x-hidden";

  const rightRail =
    activeToolSlug ? (
      <OmniSidebar
        activeToolSlug={activeToolSlug}
        activeHubKey={activeHubKey}
        header={sidebarHeader}
      />
    ) : null;

  const pageWrapClass =
    variant === "code" ? "w-full" : "w-full max-w-6xl mx-auto xl:max-w-7xl";

  const toolPageBody = (
    <div className={pageWrapClass}>
      <div className="mb-5 sm:mb-6">
        <AdBlock size="728x90" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_380px] gap-5 lg:gap-7 items-start">
        <section className="min-w-0">{children}</section>
        {rightRail}
      </div>
    </div>
  );

  if (variant === "code") {
    return (
      <div className={`${wrapperClass} flex flex-col`}>
        <main className={OMNI_MAIN}>{toolPageBody}</main>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div className={`${wrapperClass} flex flex-col antialiased`}>
        <main className={OMNI_MAIN}>{toolPageBody}</main>
      </div>
    );
  }

  if (variant === "pdf") {
    return (
      <div className={`${wrapperClass} flex flex-col min-w-0`}>
        <main className={OMNI_MAIN}>{toolPageBody}</main>
      </div>
    );
  }

  return null;
}
