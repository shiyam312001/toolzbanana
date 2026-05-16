"use client";

import DevToolCard from "./DevToolCard";

export default function ApiTesterTool() {
  return (
    <DevToolCard
      slug="api-tester"
      title="API Tester"
      badge="REST"
      description="Send HTTP requests with axios, edit JSON in Monaco, and inspect responses with an interactive tree view."
    />
  );
}

