"use client";

import { usePathname } from "next/navigation";
import { AdBanner } from "../components/common/AdBanner";

/**
 * Legacy ad wrapper — same as AdBanner; hidden off homepage via display:none.
 */
export function AdBlock({ className = "", size: _size = "728x90" }) {
  void _size;
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={className}
      style={isHome ? undefined : { display: "none" }}
      aria-hidden={!isHome}
      hidden={!isHome}
    >
      <AdBanner />
    </div>
  );
}
