import { loader } from "@monaco-editor/react";

let configured = false;

/** Configure Monaco to load assets from jsDelivr (avoids broken local worker paths in Next.js). */
export function configureMonaco() {
  if (configured || typeof window === "undefined") return;
  configured = true;
  loader.config({
    paths: {
      vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs",
    },
  });
}
