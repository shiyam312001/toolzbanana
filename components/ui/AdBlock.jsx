"use client";

import { AdBanner } from "../components/common/AdBanner";

/**
 * Homepage / content-page ad wrapper — only visible on the homepage route.
 */
export function AdBlock({ className = "", size: _size = "728x90" }) {
  void _size;

  return (
    <div className={className}>
      <AdBanner lazy />
    </div>
  );
}
