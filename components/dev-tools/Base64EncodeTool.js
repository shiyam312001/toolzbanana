"use client";

import DevToolCard from "./DevToolCard";

export default function Base64EncodeTool() {
  return (
    <DevToolCard
      slug="base64-encode"
      title="Base64 Encode"
      badge="Utility"
      description="Convert arbitrary text into Base64 strings for transport, storage, or testing."
    />
  );
}

