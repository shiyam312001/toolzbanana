"use client";

import { useToolHasResult } from "../../context/ToolResultContext";
import { AdBanner, AdPlacement } from "./AdBanner";

/** Renders a tool-page ad only after the user has produced a result. */
export function ToolPageAd() {
  const hasResult = useToolHasResult();
  if (!hasResult) return null;

  return (
    <AdPlacement className="mt-10">
      <AdBanner active lazy />
    </AdPlacement>
  );
}
