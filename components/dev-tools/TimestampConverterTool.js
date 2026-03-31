"use client";

import DevToolCard from "./DevToolCard";

export default function TimestampConverterTool() {
  return (
    <DevToolCard
      slug="timestamp-converter"
      title="Timestamp Converter"
      badge="Human time"
      description="Convert between Unix timestamps and readable date/time strings in one place."
    />
  );
}

