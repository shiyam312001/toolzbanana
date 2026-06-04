"use client";

import { OmniSidebar } from "./OmniSidebar";

/** Main canvas: fluid padding, safe areas, no horizontal overflow — all breakpoints */
const OMNI_MAIN =
  "omni-main-panel flex-1 flex flex-col min-w-0 w-full max-w-full " +
  "overflow-x-hidden " +
  "px-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] " +
  "sm:px-5 sm:pt-5 sm:pb-6 " +
  "md:px-7 md:py-7 " +
  "lg:px-10 lg:py-10 " +
  "[&_h1]:text-balance [&_h2]:text-balance";

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

  const rightRail = activeToolSlug ? (
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
