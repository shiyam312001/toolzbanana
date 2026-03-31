"use client";

import DevToolCard from "./DevToolCard";

export default function ApiTesterTool() {
  return (
    <DevToolCard
      slug="api-tester"
      title="API Tester"
      badge="REST"
      description="Quickly send HTTP requests with custom methods, headers, and bodies and inspect responses."
    />
  );
}

