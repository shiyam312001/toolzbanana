"use client";

import { ToolShell } from "./tool-shell";
import { ToolEditorialSection } from "./tools/ToolEditorialSection";
import { ApiTesterWorkspace } from "./api-tester/ApiTesterWorkspace";
import { BackgroundRemoverCompare } from "./image-tools/BackgroundRemoverCompare";
import { OmniToolDispatcher } from "./tool-suite/OmniToolDispatcher";
import { useToolClientEngine } from "./use-tool-client-engine";

/* ─────────────────────────────────────────────
   Design tokens (mirrors CSS variables in globals)
───────────────────────────────────────────── */
const t = {
  bg:        "#f5f2ed",
  surface:   "#fdfcfa",
  card:      "#ffffff",
  border:    "#e8e3da",
  border2:   "#d4cdc2",
  accent:    "#e8521a",
  accentS:   "#c43e0e",
  accentT:   "rgba(232,82,26,0.10)",
  green:     "#16a34a",
  greenT:    "rgba(22,163,74,0.10)",
  blue:      "#2563eb",
  text:      "#1a1714",
  text2:     "#4a453e",
  muted:     "#9a9188",
} as const;

/* ─────────────────────────────────────────────
   Tiny reusable primitives
───────────────────────────────────────────── */

/** Labelled section header inside a panel */
function PanelHead({
  label,
  active = false,
  children,
}: {
  label: string;
  active?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "12px 18px",
        borderBottom: `1px solid ${t.border}`,
        background: "rgba(245,242,237,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: t.muted,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: active ? t.accent : t.muted,
            boxShadow: active ? `0 0 0 2px rgba(232,82,26,0.2)` : "none",
            animation: active ? "blink 2.5s ease-in-out infinite" : "none",
            flexShrink: 0,
          }}
        />
        {label}
      </span>
      {children && (
        <div style={{ display: "flex", gap: 5 }}>{children}</div>
      )}
    </div>
  );
}

/** Small icon button */
function IconBtn({
  title,
  onClick,
  children,
}: {
  title?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title ?? "Tool action"}
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${t.border}`,
        background: "transparent",
        color: t.muted,
        cursor: "pointer",
        fontSize: 12,
        transition: "all .15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = t.bg;
        (e.currentTarget as HTMLButtonElement).style.color = t.text;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = t.muted;
      }}
    >
      {children}
    </button>
  );
}

/** Primary orange run button */
function RunBtn({
  onClick,
  disabled,
  children,
  style,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 22px",
        borderRadius: 9,
        background: disabled ? "#c9b8a8" : undefined,
        border: "none",
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-head), sans-serif",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.01em",
        backgroundImage: disabled
          ? undefined
          : `linear-gradient(90deg, ${t.accent} 0%, ${t.accent} 45%, rgba(255,255,255,0.58) 50%, ${t.accentS} 55%, ${t.accentS} 100%)`,
        backgroundSize: disabled ? undefined : "200% 100%",
        backgroundPosition: disabled ? undefined : "0% 0%",
        boxShadow: disabled ? "none" : "0 3px 14px rgba(232,82,26,0.35)",
        transition: disabled ? "transform .18s, box-shadow .18s" : "transform .18s, box-shadow .18s, background-position .55s",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 0%";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 5px 20px rgba(232,82,26,0.45)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 0%";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 3px 14px rgba(232,82,26,0.35)";
        }
      }}
    >
      {children}
    </button>
  );
}

/** Download / secondary green button */
function DownloadBtn({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 16px",
        borderRadius: 8,
        background: t.greenT,
        border: `1px solid rgba(22,163,74,0.3)`,
        color: t.green,
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 500,
        transition: "all .2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background =
          "rgba(22,163,74,0.18)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.background = t.greenT)
      }
    >
      {children}
    </button>
  );
}

/** Pill toggle for binary modes */
function PillToggle({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel?: string;
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const thumbW = 100 / Math.max(1, options.length);

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel ?? "Options"}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        background: t.bg,
        border: `1px solid ${t.border2}`,
        borderRadius: 999,
        padding: 3,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          bottom: 3,
          left: `${activeIndex * thumbW}%`,
          width: `${thumbW}%`,
          borderRadius: 999,
          background: "#fff",
          border: "1px solid rgba(232,82,26,0.14)",
          boxShadow: "0 10px 26px rgba(232,82,26,0.14)",
          transition: "left .18s ease",
          pointerEvents: "none",
        }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          role="radio"
          aria-checked={value === o.value}
          style={{
            position: "relative",
            zIndex: 1,
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontFamily: "var(--font-head), sans-serif",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            color: value === o.value ? t.text : t.muted,
            background: "transparent",
            transition: "color .15s",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Styled text input */
function Inp({
  value,
  onChange,
  placeholder,
  style,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      style={{
        height: 30,
        borderRadius: 7,
        border: `1px solid ${t.border2}`,
        background: "#fff",
        color: t.text,
        padding: "0 10px",
        fontSize: 11.5,
        fontFamily: "inherit",
        outline: "none",
        transition: "border-color .15s, box-shadow .15s",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = t.accent;
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,82,26,0.10)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = t.border2;
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

/** Styled select */
function Sel({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  ariaLabel?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      style={{
        height: 30,
        borderRadius: 7,
        border: `1px solid ${t.border2}`,
        background: "#fff",
        color: t.text,
        padding: "0 10px",
        fontSize: 11.5,
        fontFamily: "inherit",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Panel card wrapper */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: t.card,
        borderRadius: 14,
        border: `1px solid ${t.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "box-shadow .2s, border-color .2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(0,0,0,.10)";
        (e.currentTarget as HTMLDivElement).style.borderColor = t.border2;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
      }}
    >
      {children}
    </div>
  );
}

/** Bottom bar inside a panel */
function RunBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "13px 18px",
        borderTop: `1px solid ${t.border}`,
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

/** Hint text used in run bars */
function Hint({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, color: t.muted }}>{children}</span>
  );
}

/** Background-remover progress (fake progress because SDK doesn't expose granular progress). */
function ProgressBar({ progress }: { progress: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div style={{ width: "100%", marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          color: t.muted,
          marginBottom: 6,
          gap: 10,
        }}
      >
        <span>Working…</span>
        <span style={{ color: t.accent, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(232,82,26,0.10)",
          border: `1px solid rgba(232,82,26,0.22)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, rgba(232,82,26,0.85) 0%, rgba(245,158,11,0.75) 55%, rgba(232,82,26,0.85) 100%)",
            boxShadow: "0 8px 24px rgba(232,82,26,0.25)",
            transition: "width .25s ease",
          }}
        />
      </div>
    </div>
  );
}

/** Options strip below panel header */
function OptionsBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "10px 18px",
        borderBottom: `1px solid ${t.border}`,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,0.6)",
      }}
    >
      {children}
    </div>
  );
}

/** Monospace textarea */
function CodeArea({
  value,
  onChange,
  placeholder,
  readOnly,
  minHeight = 220,
  ariaLabel,
  ariaLive,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  ariaLabel?: string;
  ariaLive?: "polite" | "assertive";
}) {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      style={{
        flex: 1,
        margin: 14,
        borderRadius: 10,
        border: `1px solid ${t.border}`,
        background: readOnly ? "#fafafa" : t.bg,
        padding: "12px 14px",
        fontFamily: "'Courier New', monospace",
        fontSize: 11.5,
        color: readOnly ? t.text2 : t.text,
        resize: "none",
        outline: "none",
        minHeight,
        lineHeight: 1.7,
        transition: "border-color .15s, background .15s, box-shadow .15s",
      }}
      onFocus={(e) => {
        if (!readOnly) {
          e.currentTarget.style.borderColor = t.accent;
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,82,26,0.10)";
        }
      }}
      onBlur={(e) => {
        if (!readOnly) {
          e.currentTarget.style.borderColor = t.border;
          e.currentTarget.style.background = t.bg;
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    />
  );
}

/** Upload dropzone */
function UploadZone({
  multiple,
  accept,
  files,
  onChange,
  variant = "default",
  onRemoveFile,
}: {
  multiple?: boolean;
  accept?: string;
  files: File[];
  onChange: (f: File[]) => void;
  variant?: "background-remover" | "default";
  onRemoveFile?: (index: number) => void;
}) {
  const isBgRemover = variant === "background-remover";
  const fileInputAriaLabel = isBgRemover
    ? "Upload image files"
    : "Upload files";
  return (
    <label
      style={{
        flex: 1,
        margin: 14,
        borderRadius: 10,
        border: `1.5px dashed ${t.border2}`,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: isBgRemover ? "42px 20px" : "36px 20px",
        minHeight: isBgRemover ? 260 : 220,
        cursor: "pointer",
        transition: "all .2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLLabelElement).style.borderColor = t.accent;
        (e.currentTarget as HTMLLabelElement).style.background =
          "linear-gradient(180deg, rgba(232,82,26,0.07) 0%, #ffffff 58%)";
        (e.currentTarget as HTMLLabelElement).style.boxShadow =
          "0 22px 60px rgba(232,82,26,0.12), 0 0 0 4px rgba(232,82,26,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLLabelElement).style.borderColor = t.border2;
        (e.currentTarget as HTMLLabelElement).style.background = t.bg;
        (e.currentTarget as HTMLLabelElement).style.boxShadow = "none";
      }}
    >
      {/* icon box */}
      <div
        style={{
          width: isBgRemover ? 70 : 52,
          height: isBgRemover ? 70 : 52,
          borderRadius: isBgRemover ? 18 : 14,
          background:
            "linear-gradient(135deg,rgba(232,82,26,0.12),rgba(245,158,11,0.08))",
          border: "1px solid rgba(232,82,26,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isBgRemover ? 30 : 22,
          boxShadow: "0 4px 16px rgba(232,82,26,0.12)",
        }}
      >
        {isBgRemover ? "🧽" : "📂"}
      </div>

      <div
        style={{
          fontFamily: "var(--font-head), sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: t.text,
        }}
      >
        {isBgRemover ? "Upload image" : `Drop your file${multiple ? "s" : ""} here`}
      </div>

      <div
        style={{
          fontSize: 12,
          color: t.muted,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: t.accent, fontWeight: 600 }}>
          Click to browse
        </span>{" "}
        or drag &amp; drop
        {isBgRemover ? " · Runs locally · Max 20 MB" : " · Max 20 MB"}
      </div>

      {files.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "center",
          }}
        >
          {files.map((f, idx) => (
            <span
              key={f.name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 20,
                    background: t.accentT,
                border: "1px solid rgba(232,82,26,0.2)",
                fontSize: 10.5,
                color: t.accent,
                fontWeight: 500,
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ opacity: 0.9 }}>📄</span>
              {f.name}
              {onRemoveFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(idx);
                  }}
                  style={{
                    marginLeft: 2,
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(232,82,26,0.25)",
                    background: "rgba(255,255,255,0.7)",
                    color: t.accent,
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                    fontSize: 12,
                  }}
                  aria-label="Remove file"
                  title="Remove file"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Format hints */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {(accept?.includes("image") ? ["PNG", "JPG", "WEBP", "BMP"] : ["PDF"]).map(
          (fmt) => (
            <span
              key={fmt}
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "3px 8px",
                borderRadius: 5,
                background: "rgba(0,0,0,0.04)",
                border: `1px solid ${t.border}`,
                color: t.muted,
              }}
            >
              {fmt}
            </span>
          )
        )}
      </div>

      <input
        type="file"
        style={{ display: "none" }}
        multiple={multiple}
        accept={accept}
        aria-label={fileInputAriaLabel}
        onChange={(e) => onChange(Array.from(e.target.files || []))}
      />
    </label>
  );
}

/** Output placeholder when no result yet */
function OutputPlaceholder({
  slug,
  isLoading,
  processProgress,
}: {
  slug: string;
  isLoading: boolean;
  processProgress: number;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        flex: 1,
        margin: 14,
        borderRadius: 10,
        border: `1px dashed ${t.border2}`,
        background: "rgba(245,242,237,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        minHeight: 220,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(0,0,0,0.04)",
          border: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          opacity: 0.5,
        }}
      >
        {slug === "background-remover" ? "🧽" : "🌅"}
      </div>
      <span style={{ fontSize: 12.5, color: t.muted }}>
        {slug === "background-remover"
          ? isLoading
            ? "Removing background…"
            : "Your image with a transparent background will appear here."
          : "Result will appear here…"}
      </span>
      {slug === "background-remover" && (
        <>
          {isLoading ? (
            <span
              style={{
                fontSize: 11.5,
                color: t.text2,
                opacity: 0.95,
                marginTop: -4,
                textAlign: "center",
                maxWidth: 280,
              }}
            >
              {Math.round(Math.max(0, Math.min(100, processProgress)))}% complete
            </span>
          ) : (
            <span
              style={{
                fontSize: 11.5,
                color: t.text2,
                opacity: 0.9,
                marginTop: -4,
                textAlign: "center",
                maxWidth: 280,
              }}
            >
              Tip: use a clear, well-lit subject for cleaner edges.
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function ToolClient({
  slug,
  tool,
  layout = "legacy",
}: {
  slug: string;
  tool: { title: string; description: string };
  layout?: "legacy" | "omni";
}) {
  const engine = useToolClientEngine(slug);
  if (layout === "omni") {
    return <OmniToolDispatcher slug={slug} tool={tool} engine={engine} />;
  }

  const {
    input,
    setInput,
    output,
    setOutput,
    isLoading,
    processProgress,
    files,
    setFiles,
    resultBlob,
    setResultBlob,
    httpMethod,
    setHttpMethod,
    url,
    setUrl,
    headersText,
    setHeadersText,
    regexPattern,
    setRegexPattern,
    regexFlags,
    setRegexFlags,
    timestampMode,
    setTimestampMode,
    imageFormat,
    setImageFormat,
    resizeWidth,
    setResizeWidth,
    resizeHeight,
    setResizeHeight,
    splitPagesSpec,
    setSplitPagesSpec,
    isImageTool,
    isPdfTool,
    isRegexTool,
    isApiTester,
    isUuid,
    isTimestamp,
    hasFileInput,
    handleRun,
    handleClear,
    handleCopy,
    handleDownload,
    apiResponse,
    apiError,
  } = engine;

  if (isApiTester) {
    return (
      <>
        <ApiTesterWorkspace
          variant="legacy"
          title={tool.title}
          description={tool.description}
          httpMethod={httpMethod}
          setHttpMethod={setHttpMethod}
          url={url}
          setUrl={setUrl}
          headersText={headersText}
          setHeadersText={setHeadersText}
          body={input}
          setBody={setInput}
          isLoading={isLoading}
          apiResponse={apiResponse}
          apiError={apiError}
          onSend={handleRun}
          onClear={handleClear}
          onCopy={handleCopy}
        />
        <ToolEditorialSection slug={slug} variant="legacy" />
      </>
    );
  }

  /* ────────────────────────────────────────────
     Render
  ──────────────────────────────────────────── */
  return (
    <>
    <ToolShell
      title={tool.title}
      description={tool.description}
      onCopy={handleCopy}
      onClear={handleClear}
      onDownload={handleDownload}
      isLoading={isLoading}
    >
      {/* ── grid: input + output ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          fontFamily: "var(--font-instrument), sans-serif",
        }}
      >
        {/* ════ INPUT PANEL ════ */}
        <Panel>
          <PanelHead label="Input" active>
            <IconBtn title="Clear" onClick={handleClear}>✕</IconBtn>
          </PanelHead>

          {/* ── tool-specific options strips ── */}

          {isTimestamp && (
            <OptionsBar>
              <span style={{ fontSize: 10.5, color: t.muted }}>Mode:</span>
              <PillToggle
                value={timestampMode}
                onChange={setTimestampMode}
                ariaLabel="Timestamp conversion mode"
                options={[
                  { label: "Unix → Date", value: "toDate" },
                  { label: "Date → Unix", value: "toUnix" },
                ]}
              />
              <RunBtn onClick={handleRun} disabled={isLoading} style={{ marginLeft: "auto" }}>
                {isLoading ? "⏳ Converting…" : "Convert"}
              </RunBtn>
            </OptionsBar>
          )}

          {isRegexTool && (
            <OptionsBar>
              <span style={{ fontSize: 10.5, color: t.muted }}>Pattern:</span>
              <Inp
                value={regexPattern}
                onChange={setRegexPattern}
                placeholder="^[a-z0-9]+$"
                ariaLabel="Regex pattern"
                style={{ flex: 1, minWidth: 120 }}
              />
              <span style={{ fontSize: 10.5, color: t.muted }}>Flags:</span>
              <Inp
                value={regexFlags}
                onChange={setRegexFlags}
                placeholder="gimuy"
                ariaLabel="Regex flags"
                style={{ width: 70, textAlign: "center" }}
              />
              <RunBtn onClick={handleRun} disabled={isLoading}>
                {isLoading ? "⏳" : "Test"}
              </RunBtn>
            </OptionsBar>
          )}

          {isApiTester && (
            <>
              <OptionsBar>
                <Sel
                  value={httpMethod}
                  onChange={setHttpMethod}
                  options={["GET","POST","PUT","PATCH","DELETE"]}
                  ariaLabel="HTTP method"
                />
                <Inp
                  value={url}
                  onChange={setUrl}
                  placeholder="https://api.example.com/v1/resource"
                  ariaLabel="Request URL"
                  style={{ flex: 1, minWidth: 160 }}
                />
                <RunBtn onClick={handleRun} disabled={isLoading}>
                  {isLoading ? "⏳ Sending…" : "Send"}
                </RunBtn>
              </OptionsBar>
              <OptionsBar>
                <span style={{ fontSize: 10.5, color: t.muted }}>Headers (JSON):</span>
                <textarea
                  value={headersText}
                  onChange={(e) => setHeadersText(e.target.value)}
                  placeholder='{ "Authorization": "Bearer ..." }'
                  aria-label="Request headers as JSON"
                  style={{
                    flex: 1,
                    minHeight: 52,
                    borderRadius: 7,
                    border: `1px solid ${t.border2}`,
                    background: "#fff",
                    color: t.text,
                    padding: "6px 10px",
                    fontFamily: "'Courier New', monospace",
                    fontSize: 11,
                    resize: "none",
                    outline: "none",
                  }}
                />
              </OptionsBar>
            </>
          )}

          {slug === "image-converter" && (
            <OptionsBar>
              <span style={{ fontSize: 10.5, color: t.muted }}>Target format:</span>
              <Sel
                value={imageFormat}
                onChange={setImageFormat}
                options={["image/jpeg","image/png","image/webp"]}
                ariaLabel="Target image format"
              />
            </OptionsBar>
          )}

          {slug === "resize-image" && (
            <OptionsBar>
              <span style={{ fontSize: 10.5, color: t.muted }}>Target size (px):</span>
              <Inp
                value={resizeWidth}
                onChange={setResizeWidth}
                placeholder="Width"
                ariaLabel="Target width in pixels"
                style={{ width: 80, textAlign: "center" }}
              />
              <span style={{ fontSize: 10.5, color: t.muted }}>×</span>
              <Inp
                value={resizeHeight}
                onChange={setResizeHeight}
                placeholder="Height"
                ariaLabel="Target height in pixels"
                style={{ width: 80, textAlign: "center" }}
              />
            </OptionsBar>
          )}

          {slug === "split-pdf" && (
            <OptionsBar>
              <span style={{ fontSize: 10.5, color: t.muted }}>Pages (e.g. 1-3,5):</span>
              <Inp
                value={splitPagesSpec}
                onChange={setSplitPagesSpec}
                placeholder="1"
                ariaLabel="Pages spec"
                style={{ width: 120 }}
              />
            </OptionsBar>
          )}

          {/* ── file upload zone ── */}
          {hasFileInput && (
            <UploadZone
              multiple={slug === "merge-pdf" || slug === "image-to-pdf"}
              accept={
                isPdfTool && slug !== "image-to-pdf"
                  ? "application/pdf"
                  : isImageTool && slug !== "pdf-to-image"
                  ? "image/*"
                  : "image/*,application/pdf"
              }
              files={files}
              onChange={setFiles}
              variant={slug === "background-remover" ? "background-remover" : "default"}
              onRemoveFile={
                slug === "background-remover"
                  ? (idx) => {
                      setFiles((prev) => prev.filter((_, i) => i !== idx));
                      setOutput("");
                      setResultBlob(null);
                    }
                  : undefined
              }
            />
          )}

          {/* ── text input ── */}
          {!isUuid && !isApiTester && !hasFileInput && (
            <CodeArea
              value={input}
              onChange={setInput}
              placeholder={
                slug === "json-formatter"      ? '{ "hello": "world" }'
                : slug === "jwt-decoder"       ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                : slug === "timestamp-converter" && timestampMode === "toUnix" ? "2026-03-10T12:00:00Z"
                : isRegexTool                  ? "Paste or type text to match against…"
                : ""
              }
              ariaLabel={`${tool.title} input`}
            />
          )}

          {/* ── uuid one-shot ── */}
          {isUuid && (
            <div style={{ padding: "20px 18px" }}>
              <RunBtn onClick={handleRun} disabled={isLoading}>
                {isLoading ? "⏳ Generating…" : "✦ Generate UUID"}
              </RunBtn>
            </div>
          )}

          {/* ── default run bar ── */}
          {!isUuid && !isApiTester && !isRegexTool && !isTimestamp && (
            slug === "background-remover" ? (
              <div
                style={{
                  padding: "13px 18px",
                  borderTop: `1px solid ${t.border}`,
                  background: "rgba(255,255,255,0.6)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <RunBtn onClick={handleRun} disabled={isLoading}>
                    {isLoading ? "✦ Removing…" : "✦ Remove Background"}
                  </RunBtn>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(232,82,26,0.25)",
                      background: "rgba(232,82,26,0.08)",
                      color: t.accent,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                      boxShadow: "0 10px 26px rgba(232,82,26,0.08)",
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        background: t.accent,
                        boxShadow: "0 0 0 4px rgba(232,82,26,0.12)",
                      }}
                    />
                    Runs locally
                  </span>
                </div>
                {isLoading && <ProgressBar progress={processProgress} />}
              </div>
            ) : (
              <RunBar>
                <RunBtn onClick={handleRun} disabled={isLoading}>
                  {isLoading
                    ? "⏳ Processing…"
                    : hasFileInput
                    ? "✦ Run Tool"
                    : "✦ Run Tool"}
                </RunBtn>
                {hasFileInput && (
                  <Hint>
                    Runs <strong style={{ color: t.accentS }}>locally</strong> in
                    your browser
                  </Hint>
                )}
              </RunBar>
            )
          )}
        </Panel>

        {/* ════ OUTPUT PANEL ════ */}
        <Panel>
          <PanelHead label="Output">
            <IconBtn title="Clear output" onClick={() => { setOutput(""); setResultBlob(null); }}>🗑</IconBtn>
            <IconBtn title="Copy to clipboard" onClick={handleCopy}>⎘</IconBtn>
          </PanelHead>

          {/* image preview if we have a blob */}
          {resultBlob && (isImageTool || slug === "pdf-to-image") ? (
            <div
              style={{
                flex: 1,
                margin: 14,
                borderRadius: 10,
                border: `1px solid ${t.border}`,
                background: "repeating-conic-gradient(#e8e3da 0% 25%, #f5f2ed 0% 50%) 0 0 / 16px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 220,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(resultBlob)}
                alt={`${tool.title} result`}
                loading="lazy"
                decoding="async"
                style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain", borderRadius: 6 }}
              />
            </div>
          ) : output ? (
            <CodeArea
              value={output}
              readOnly
              ariaLabel={`${tool.title} output`}
              ariaLive="polite"
            />
          ) : (
            <OutputPlaceholder slug={slug} isLoading={isLoading} processProgress={processProgress} />
          )}

          <RunBar>
            <DownloadBtn onClick={handleDownload}>
              ⬇ Download{" "}
              {resultBlob
                ? slug === "background-remover"
                  ? "PNG"
                  : ["pdf-to-image","image-compressor","image-converter","resize-image","background-remover"].includes(slug)
                  ? ".png"
                  : ".pdf"
                : "TXT"}
            </DownloadBtn>
            {output && !resultBlob && (
              <Hint>
                <strong style={{ color: t.accentS }}>{output.length}</strong> chars
              </Hint>
            )}
          </RunBar>
        </Panel>

        {slug === "background-remover" && files[0] ? (
          <BackgroundRemoverCompare
            variant="legacy"
            beforeFile={files[0]}
            resultBlob={resultBlob}
            isLoading={isLoading}
          />
        ) : null}

        {slug === "background-remover" && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: t.card,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)",
              padding: "16px 16px",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-head), sans-serif",
                fontWeight: 800,
                fontSize: 12,
                color: t.text2,
                letterSpacing: "0.02em",
                marginBottom: 10,
              }}
            >
              Tips for better cutouts
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: t.accent, fontSize: 16, lineHeight: 1 }}>1</span>
                <div style={{ fontSize: 12, color: t.text2, lineHeight: 1.5 }}>
                  Use a high-resolution image with clear edges and good lighting.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: t.accent, fontSize: 16, lineHeight: 1 }}>2</span>
                <div style={{ fontSize: 12, color: t.text2, lineHeight: 1.5 }}>
                  Keep the background simple and center your subject.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: t.accent, fontSize: 16, lineHeight: 1 }}>3</span>
                <div style={{ fontSize: 12, color: t.text2, lineHeight: 1.5 }}>
                  Download PNG to preserve transparency.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
      <ToolEditorialSection slug={slug} variant="legacy" />
    </>
  );
}