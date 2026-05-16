"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { configureMonaco } from "./monaco-loader";

const MonacoEditor = dynamic(
  async () => {
    configureMonaco();
    const mod = await import("@monaco-editor/react");
    return mod.default;
  },
  {
    ssr: false,
    loading: () => (
      <textarea
        readOnly
        className="w-full h-full resize-none bg-transparent font-mono text-xs p-2 opacity-60"
        value="Loading editor…"
      />
    ),
  },
);

const editorOptions = {
  minimap: { enabled: false },
  fontSize: 12,
  lineNumbers: "off" as const,
  scrollBeyondLastLine: false,
  wordWrap: "on" as const,
  automaticLayout: true,
  tabSize: 2,
  padding: { top: 8 },
  scrollbar: { vertical: "auto" as const, horizontal: "hidden" as const },
};

type MonacoFieldProps = {
  height: string;
  language?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
};

export function MonacoField({
  height,
  language = "json",
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
}: MonacoFieldProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    configureMonaco();
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        spellCheck={false}
        className="w-full h-full min-h-[80px] resize-none bg-transparent font-mono text-xs p-3 border-0 outline-none"
        style={{ height }}
      />
    );
  }

  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={editorOptions}
      loading={
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          spellCheck={false}
          className="w-full h-full resize-none bg-transparent font-mono text-xs p-3"
          style={{ height }}
        />
      }
    />
  );
}
