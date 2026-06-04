"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ToolClientEngine } from "../use-tool-client-engine";

const ToolResultContext = createContext(false);

export function ToolResultProvider({
  hasResult,
  children,
}: {
  hasResult: boolean;
  children: ReactNode;
}) {
  return (
    <ToolResultContext.Provider value={hasResult}>
      {children}
    </ToolResultContext.Provider>
  );
}

export function useToolHasResult() {
  return useContext(ToolResultContext);
}

/** True when the user has run the tool and meaningful output is visible. */
export function computeHasToolResult(
  engine: Pick<
    ToolClientEngine,
    "output" | "resultBlob" | "apiResponse" | "apiError"
  >,
  slug: string,
): boolean {
  if (engine.resultBlob) return true;

  if (slug === "api-tester" && (engine.apiResponse || engine.apiError)) {
    return true;
  }

  const out = engine.output?.trim();
  if (!out) return false;

  if (
    out.startsWith("Error:") ||
    out.startsWith("Invalid JWT") ||
    out.startsWith("Minify error") ||
    (slug === "regex-tester" && out.startsWith("Invalid RegExp"))
  ) {
    return false;
  }

  return true;
}
