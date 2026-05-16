"use client";

import dynamic from "next/dynamic";
import { useMemo, type CSSProperties } from "react";
import type { ApiTestResult } from "../use-tool-client-engine";
import { MonacoField } from "./MonacoField";

const JsonView = dynamic(() => import("@uiw/react-json-view"), { ssr: false });

export type ApiTesterWorkspaceProps = {
  variant?: "omni" | "legacy";
  title: string;
  description: string;
  httpMethod: string;
  setHttpMethod: (v: string) => void;
  url: string;
  setUrl: (v: string) => void;
  headersText: string;
  setHeadersText: (v: string) => void;
  body: string;
  setBody: (v: string) => void;
  isLoading: boolean;
  apiResponse: ApiTestResult | null;
  apiError: string | null;
  onSend: () => void;
  onClear: () => void;
  onCopy: () => void;
};

function statusTone(result: ApiTestResult | null, error: string | null) {
  if (error) return { label: "Failed", className: "text-error" };
  if (!result) return { label: "Ready", className: "text-on-surface-variant" };
  if (result.ok) return { label: `${result.status} OK`, className: "text-primary" };
  return { label: `${result.status} ${result.statusText}`, className: "text-error" };
}

function ResponseBody({
  result,
  error,
}: {
  result: ApiTestResult | null;
  error: string | null;
}) {
  if (error) {
    return (
      <pre className="text-sm text-error font-mono whitespace-pre-wrap editor-scroll overflow-auto h-full min-h-[120px]">
        {error}
      </pre>
    );
  }
  if (!result) {
    return (
      <p className="text-sm text-on-surface-variant">
        Send a request to inspect status, headers, and body here.
      </p>
    );
  }

  const body = result.body;
  if (body !== null && typeof body === "object") {
    return (
      <div className="editor-scroll overflow-auto h-full min-h-[120px] text-sm">
        <JsonView
          value={body as object}
          collapsed={2}
          displayDataTypes={false}
          enableClipboard={false}
          style={
            {
              "--w-rjv-font-family": "ui-monospace, monospace",
              "--w-rjv-background-color": "transparent",
            } as CSSProperties
          }
        />
      </div>
    );
  }

  const text =
    typeof body === "string"
      ? body
      : body === undefined || body === null
        ? ""
        : String(body);

  return (
    <pre className="text-sm font-mono whitespace-pre-wrap break-all editor-scroll overflow-auto h-full min-h-[120px] text-on-surface">
      {text || "(empty body)"}
    </pre>
  );
}

export function ApiTesterWorkspace({
  variant = "omni",
  title,
  description,
  httpMethod,
  setHttpMethod,
  url,
  setUrl,
  headersText,
  setHeadersText,
  body,
  setBody,
  isLoading,
  apiResponse,
  apiError,
  onSend,
  onClear,
  onCopy,
}: ApiTesterWorkspaceProps) {
  const status = useMemo(() => statusTone(apiResponse, apiError), [apiResponse, apiError]);
  const isOmni = variant === "omni";

  const shellClass = isOmni ? "flex flex-col flex-1 min-h-0" : "flex flex-col gap-4";
  const gridClass = isOmni
    ? "flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-0 lg:min-h-[640px]"
    : "grid grid-cols-1 lg:grid-cols-2 gap-4";
  const panelClass = isOmni
    ? "flex flex-col rounded-lg bg-surface-container-low overflow-hidden ring-1 ring-outline-variant/15 min-h-[280px]"
    : "flex flex-col rounded-[14px] border border-[#e8e3da] bg-white shadow-sm min-h-[280px]";
  const panelHeadClass = isOmni
    ? "flex items-center justify-between px-6 py-4 bg-surface-container-high/50"
    : "flex items-center justify-between px-4 py-3 border-b border-[#e8e3da] bg-[#faf8f5]";

  return (
    <div className={shellClass}>
      <header
        className={
          isOmni
            ? "mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0"
            : "flex flex-wrap items-end justify-between gap-3 mb-2"
        }
      >
        <div>
          {isOmni ? (
            <div className="flex items-center gap-2 text-primary font-bold mb-2">
              <span className="material-symbols-outlined text-sm">http</span>
              <span className="text-[0.75rem] tracking-[0.2em] uppercase font-label">
                Developer Suite
              </span>
            </div>
          ) : null}
          <h2
            className={
              isOmni
                ? "text-[2rem] sm:text-[2.75rem] font-extrabold tracking-tight font-headline text-on-surface leading-tight"
                : "text-xl font-extrabold text-[#1a1510]"
            }
          >
            {title}
          </h2>
          <p
            className={
              isOmni
                ? "text-on-surface-variant max-w-lg mt-2 font-body text-sm sm:text-base"
                : "text-sm text-[#6b6560] mt-1"
            }
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onSend}
          disabled={isLoading}
          className={
            isOmni
              ? "gradient-button flex items-center gap-2 px-6 sm:px-8 py-3 text-on-primary font-bold rounded-full hover:saturate-150 transition-all active:scale-95 shadow-xl shadow-primary/20 w-full sm:w-auto justify-center disabled:opacity-60"
              : "px-5 py-2.5 rounded-lg bg-[#e8521a] text-white text-sm font-bold disabled:opacity-60"
          }
        >
          {isLoading ? "Sending…" : "Send request"}
        </button>
      </header>

      <div className={gridClass}>
        <section className={panelClass}>
          <div className={panelHeadClass}>
            <h3 className="font-bold text-sm">Request</h3>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-on-surface-variant/70">
              axios
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1 min-h-0">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={httpMethod}
                onChange={(e) => setHttpMethod(e.target.value)}
                className="rounded-lg bg-surface-container-highest px-3 py-2 text-sm font-bold border border-outline-variant/30"
                aria-label="HTTP method"
              >
                {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/v1/resource"
                className="flex-1 min-w-[160px] rounded-lg bg-surface-container-highest px-3 py-2 text-sm border border-outline-variant/30"
                aria-label="Request URL"
              />
            </div>
            <div className="flex flex-col gap-1 min-h-[100px]">
              <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-wider">
                Headers (JSON)
              </span>
              <div className="h-[100px] rounded-lg overflow-hidden border border-outline-variant/20">
                <MonacoField
                  height="100px"
                  value={headersText}
                  onChange={setHeadersText}
                  placeholder='{ "Authorization": "Bearer ..." }'
                  aria-label="Request headers as JSON"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-h-[140px]">
              <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-wider">
                Body
              </span>
              <div className="flex-1 min-h-[140px] rounded-lg overflow-hidden border border-outline-variant/20">
                <MonacoField
                  height="140px"
                  value={body}
                  onChange={setBody}
                  placeholder='{ "key": "value" }'
                  aria-label="Request body"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={panelClass}>
          <div className={panelHeadClass}>
            <div className="flex items-center gap-3 min-w-0 flex-wrap">
              <h3 className="font-bold text-sm">Response</h3>
              <span className={`text-xs font-bold ${status.className}`}>{status.label}</span>
              {apiResponse ? (
                <span className="text-[0.65rem] text-on-surface-variant">
                  {apiResponse.durationMs} ms
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClear}
                className="text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onCopy}
                className="text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1 min-h-0">
            {apiResponse ? (
              <div className="flex flex-wrap gap-2 text-[0.65rem] font-mono text-on-surface-variant">
                {Object.entries(apiResponse.headers)
                  .slice(0, 8)
                  .map(([k, v]) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/20"
                    >
                      {k}: {v}
                    </span>
                  ))}
              </div>
            ) : null}
            <div className="flex-1 min-h-0">
              <ResponseBody result={apiResponse} error={apiError} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
