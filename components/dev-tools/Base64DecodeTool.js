"use client";

import DevToolCard from "./DevToolCard";

export default function Base64DecodeTool() {
  return (
    <DevToolCard
      slug="base64-decode"
      title="Base64 Decode"
      badge="Utility"
      description="Decode Base64 strings back into human‑readable text for debugging and inspection."
    />
  );
}

