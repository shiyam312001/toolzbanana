"use client";

import { useMemo } from "react";

function HighlightedJson({ text }) {
  const nodes = useMemo(() => {
    if (!text)
      return [
        <span key="placeholder" className="text-on-surface-variant">
          Paste JSON and tap Format JSON.
        </span>,
      ];
    const parts = [];
    let last = 0;
    const re =
      /("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|(true|false|null)|(\s+)|([{}\[\]])|([:,])/g;
    let k = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        parts.push(
          <span key={`raw-${k++}`}>{text.slice(last, m.index)}</span>,
        );
      }
      const tok = m[0];
      if (m[1]) parts.push(<span key={k++} className="text-primary">{tok}</span>);
      else if (m[2]) parts.push(<span key={k++} className="text-tertiary">{tok}</span>);
      else if (m[3]) parts.push(<span key={k++} className="text-tertiary">{tok}</span>);
      else if (m[4]) parts.push(<span key={k++}>{tok}</span>);
      else if (m[5]) parts.push(<span key={k++} className="text-secondary">{tok}</span>);
      else if (m[6])
        parts.push(<span key={k++} className="text-on-surface-variant">{tok}</span>);
      last = re.lastIndex;
    }
    if (last < text.length) {
      parts.push(<span key={`end-${k++}`}>{text.slice(last)}</span>);
    }
    return parts;
  }, [text]);

  return (
    <pre className="w-full h-full font-mono text-sm editor-scroll overflow-auto select-all whitespace-pre-wrap break-all">
      {nodes}
    </pre>
  );
}

function formatBytes(len) {
  if (len < 1024) return `${len} B`;
  const kb = len / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function looksLikeJson(s) {
  if (!s || !s.trim()) return false;
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {object} props
 * @param {string} [props.eyebrowLabel]
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.primaryLabel
 * @param {string} [props.primaryIcon]
 * @param {() => void} props.onPrimary
 * @param {boolean} [props.primaryDisabled]
 * @param {boolean} [props.isLoading]
 * @param {string} props.inputPanelTitle
 * @param {string} [props.inputBadge]
 * @param {import('react').ReactNode} [props.inputSlot]
 * @param {string} [props.inputPlaceholder]
 * @param {string} [props.inputValue]
 * @param {(v: string) => void} [props.onInputChange]
 * @param {boolean} [props.hideTextarea]
 * @param {string} props.output
 * @param {string | null} [props.error]
 * @param {() => void} props.onClear
 * @param {() => void} props.onCopy
 * @param {string} [props.outputPanelTitle]
 * @param {string} [props.statusMode] — "json" | "generic"
 * @param {string} [props.emptyOutputHint]
 */
export function CodeToolShell({
  eyebrowLabel = "Developer Suite",
  title,
  description,
  primaryLabel,
  primaryIcon = "magic_button",
  onPrimary,
  primaryDisabled,
  isLoading,
  inputPanelTitle,
  inputBadge = "RAW",
  inputSlot,
  inputPlaceholder = '{"paste": "your", "unformatted": "json here"}',
  inputValue = "",
  onInputChange,
  hideTextarea,
  output,
  error,
  onClear,
  onCopy,
  outputPanelTitle = "Formatted Output",
  statusMode = "json",
  emptyOutputHint,
}) {
  const stats = useMemo(() => {
    const text = output || "";
    const lines = text ? text.split("\n").length : 0;
    const size = new Blob([text]).size;
    return {
      lines,
      sizeLabel: formatBytes(size),
      valid: !error && output.length > 0,
      idle: !output && !error,
    };
  }, [output, error]);

  const statusText = error
    ? statusMode === "json"
      ? "Invalid JSON"
      : "Error"
    : stats.valid
      ? statusMode === "json"
        ? "Valid JSON"
        : "Ready"
      : "Waiting";

  const outputBody =
    error ? (
      <pre className="w-full h-full font-mono text-sm editor-scroll overflow-auto text-error whitespace-pre-wrap">
        {error}
      </pre>
    ) : output && (statusMode === "json" || looksLikeJson(output)) ? (
      <HighlightedJson text={output} />
    ) : output ? (
      <pre className="w-full h-full font-mono text-sm editor-scroll overflow-auto select-all whitespace-pre-wrap break-all">
        {output}
      </pre>
    ) : (
      <pre className="w-full h-full font-mono text-sm editor-scroll overflow-auto select-all whitespace-pre-wrap break-all">
        <span className="text-on-surface-variant">
          {emptyOutputHint ?? "Run the tool to see output here."}
        </span>
      </pre>
    );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <span className="material-symbols-outlined text-sm">auto_fix_high</span>
            <span className="text-[0.75rem] tracking-[0.2em] uppercase font-label">
              {eyebrowLabel}
            </span>
          </div>
          <h2 className="text-[2rem] sm:text-[2.75rem] font-extrabold tracking-tight font-headline text-on-surface leading-tight">
            {title}
          </h2>
          <p className="text-on-surface-variant max-w-lg mt-2 font-body text-sm sm:text-base">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimary}
            disabled={primaryDisabled || isLoading}
            className="gradient-button flex items-center gap-2 px-6 sm:px-8 py-3 text-on-primary font-bold rounded-full hover:saturate-150 transition-all active:scale-95 shadow-xl shadow-primary/20 w-full sm:w-auto justify-center disabled:opacity-60"
          >
            <span
              className="material-symbols-outlined text-[1.25rem]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {primaryIcon}
            </span>
            {isLoading ? "Working…" : primaryLabel}
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-0 lg:min-h-[690px] auto-rows-fr">
        <section className="flex flex-col rounded-lg bg-surface-container-low overflow-hidden ring-1 ring-outline-variant/15 min-h-[260px] lg:min-h-0">
          <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">input</span>
              <h2 className="font-headline font-bold text-on-surface">{inputPanelTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] font-bold text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-md">
                {inputBadge}
              </span>
            </div>
          </div>
          <div className="flex-1 p-6 min-h-[200px] flex flex-col">
            {inputSlot ?? (
              !hideTextarea && (
                <textarea
                  value={inputValue}
                  onChange={(e) => onInputChange?.(e.target.value)}
                  className="flex-1 w-full min-h-[200px] bg-transparent border-none focus:ring-0 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none editor-scroll"
                  placeholder={inputPlaceholder}
                  spellCheck={false}
                />
              )
            )}
          </div>
        </section>

        <section className="flex flex-col rounded-lg glass-panel overflow-hidden ring-1 ring-outline-variant/15 shadow-2xl shadow-on-surface/5 min-h-[260px] lg:min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-4 bg-surface-container-high/30">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-primary shrink-0">code_blocks</span>
              <h2 className="font-headline font-bold text-on-surface truncate">
                {outputPanelTitle}
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Clear
              </button>
              <button
                type="button"
                onClick={onCopy}
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all group"
              >
                <span className="material-symbols-outlined text-sm group-active:scale-110">
                  content_copy
                </span>
                Copy Output
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-6 overflow-hidden relative min-h-[180px] lg:min-h-0">
            {outputBody}
          </div>
        </section>
      </div>

      <footer className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center justify-between py-6 border-t border-outline-variant/10 shrink-0">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-bold text-on-surface-variant/60 uppercase tracking-wider font-label">
              Status
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
              <div
                className={`w-2 h-2 rounded-full ${stats.valid ? "bg-primary" : stats.idle ? "bg-on-surface-variant/40" : "bg-error"}`}
              />
              {statusText}
            </div>
          </div>
          <div className="flex flex-col border-l border-outline-variant/20 pl-8">
            <span className="text-[0.65rem] font-bold text-on-surface-variant/60 uppercase tracking-wider font-label">
              Lines
            </span>
            <span className="text-xs font-bold text-on-surface">{stats.lines || "—"}</span>
          </div>
          <div className="flex flex-col border-l border-outline-variant/20 pl-8">
            <span className="text-[0.65rem] font-bold text-on-surface-variant/60 uppercase tracking-wider font-label">
              Size
            </span>
            <span className="text-xs font-bold text-on-surface">
              {output ? stats.sizeLabel : "—"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center ring-2 ring-surface">
              <span className="material-symbols-outlined text-xs text-secondary">
                javascript
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center ring-2 ring-surface">
              <span className="material-symbols-outlined text-xs text-primary">terminal</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center ring-2 ring-surface text-[0.6rem] font-bold text-on-surface-variant">
              +4
            </div>
          </div>
          <p className="text-xs text-on-surface-variant font-medium">Export to other formats</p>
        </div>
      </footer>
    </div>
  );
}
