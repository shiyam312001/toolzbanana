"use client";

import DevToolCard from "./DevToolCard";

export default function CssMinifierTool() {
  return (
    <DevToolCard
      slug="css-minifier"
      title="CSS Minifier"
      badge="Smaller"
      description="Strip whitespace and comments from CSS to produce compact stylesheets."
    />
  );
}

