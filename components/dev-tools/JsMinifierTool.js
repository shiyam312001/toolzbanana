"use client";

import DevToolCard from "./DevToolCard";

export default function JsMinifierTool() {
  return (
    <DevToolCard
      slug="js-minifier"
      title="JS Minifier"
      badge="Optimized"
      description="Minify JavaScript to remove comments and whitespace for faster bundles."
    />
  );
}

