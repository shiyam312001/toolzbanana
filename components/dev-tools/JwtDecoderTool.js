"use client";

import DevToolCard from "./DevToolCard";

export default function JwtDecoderTool() {
  return (
    <DevToolCard
      slug="jwt-decoder"
      title="JWT Decoder"
      badge="Secure"
      description="Inspect JWT headers and payloads locally without sending tokens to a server."
    />
  );
}

