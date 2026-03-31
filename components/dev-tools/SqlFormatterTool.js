"use client";

import DevToolCard from "./DevToolCard";

export default function SqlFormatterTool() {
  return (
    <DevToolCard
      slug="sql-formatter"
      title="SQL Formatter"
      badge="Readable"
      description="Reformat SQL queries with consistent indentation to make debugging and reviews easier."
    />
  );
}

