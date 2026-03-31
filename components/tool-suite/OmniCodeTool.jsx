"use client";

import { CodeToolShell } from "./CodeTool";

/** @param {{ slug: string; tool: { title: string; description: string }; engine: import("../use-tool-client-engine").ToolClientEngine }} props */
export function OmniCodeTool({ slug, tool, engine }) {
  const {
    input,
    setInput,
    output,
    isLoading,
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
    handleRun,
    handleClear,
    handleCopy,
  } = engine;

  const errLine =
    output.startsWith("Error:") ||
    output.startsWith("Invalid JWT") ||
    output.startsWith("Minify error") ||
    (slug === "regex-tester" && output.startsWith("Invalid RegExp"))
      ? output
      : null;
  const displayOutput = errLine ? "" : output;

  const isUuid = slug === "uuid-generator";
  const isApi = slug === "api-tester";
  const isRegex = slug === "regex-tester";
  const isTs = slug === "timestamp-converter";

  const labels = {
    "json-formatter": {
      primary: "Format JSON",
      inputTitle: "Input Raw JSON",
      placeholder: '{"paste": "your", "unformatted": "json here"}',
      icon: "magic_button",
      statusMode: "json",
    },
    "jwt-decoder": {
      primary: "Decode JWT",
      inputTitle: "Encoded JWT",
      placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      icon: "vpn_key",
      statusMode: "generic",
    },
    "base64-encode": {
      primary: "Encode Base64",
      inputTitle: "Plain Text",
      placeholder: "Type text to encode…",
      icon: "arrow_forward",
      statusMode: "generic",
    },
    "base64-decode": {
      primary: "Decode Base64",
      inputTitle: "Base64 String",
      placeholder: "Paste Base64…",
      icon: "arrow_back",
      statusMode: "generic",
    },
    "uuid-generator": {
      primary: "Generate UUID",
      inputTitle: "UUID",
      placeholder: "",
      icon: "bolt",
      statusMode: "generic",
    },
    "api-tester": {
      primary: "Send Request",
      inputTitle: "Request Body (optional)",
      placeholder: '{ "key": "value" }',
      icon: "send",
      statusMode: "generic",
    },
    "regex-tester": {
      primary: "Test Regex",
      inputTitle: "Sample Text",
      placeholder: "Paste or type text to match against…",
      icon: "regular_expression",
      statusMode: "generic",
    },
    "sql-formatter": {
      primary: "Format SQL",
      inputTitle: "SQL Input",
      placeholder: "SELECT * FROM users WHERE id = 1;",
      icon: "data_object",
      statusMode: "generic",
    },
    "html-beautifier": {
      primary: "Beautify HTML",
      inputTitle: "HTML Input",
      placeholder: "<div><p>Hello</p></div>",
      icon: "html",
      statusMode: "generic",
    },
    "css-minifier": {
      primary: "Minify CSS",
      inputTitle: "CSS Input",
      placeholder: ".btn { color: red; }",
      icon: "css",
      statusMode: "generic",
    },
    "js-minifier": {
      primary: "Minify JavaScript",
      inputTitle: "JavaScript Input",
      placeholder: "function hello() { return 1; }",
      icon: "javascript",
      statusMode: "generic",
    },
    "timestamp-converter": {
      primary: "Convert",
      inputTitle: "Timestamp / Date",
      placeholder:
        timestampMode === "toUnix"
          ? "2026-03-10T12:00:00Z"
          : "1700000000",
      icon: "schedule",
      statusMode: "generic",
    },
  };

  const L = labels[slug] ?? labels["json-formatter"];

  const inputSlot =
    isUuid ? (
      <div className="flex flex-1 items-center justify-center min-h-[200px]">
        <p className="text-on-surface-variant text-sm text-center max-w-sm">
          Tap <strong className="text-primary">Generate UUID</strong> in the header to create a new v4 UUID.
        </p>
      </div>
    ) : isApi ? (
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={httpMethod}
            onChange={(e) => setHttpMethod(e.target.value)}
            className="rounded-lg bg-surface-container-highest px-3 py-2 text-sm font-bold text-on-surface border border-outline-variant/30"
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
        <div className="flex flex-col gap-1 flex-1 min-h-0">
          <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-wider">
            Headers (JSON)
          </span>
          <textarea
            value={headersText}
            onChange={(e) => setHeadersText(e.target.value)}
            placeholder='{ "Authorization": "Bearer ..." }'
            className="flex-1 min-h-[80px] w-full rounded-lg bg-surface-container-highest p-3 font-mono text-xs border border-outline-variant/30 resize-none editor-scroll"
            aria-label="Request headers as JSON"
          />
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 min-h-[120px] w-full rounded-lg bg-transparent border border-outline-variant/20 p-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none editor-scroll"
          placeholder={L.placeholder}
          spellCheck={false}
          aria-label="Request body"
        />
      </div>
    ) : isRegex ? (
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-wider">
              Pattern
            </span>
            <input
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="^[a-z0-9]+$"
              className="w-full rounded-lg bg-surface-container-highest px-3 py-2 font-mono text-sm border border-outline-variant/30"
              aria-label="Regex pattern"
            />
          </div>
          <div className="flex flex-col gap-1 w-[88px]">
            <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-wider">
              Flags
            </span>
            <input
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              placeholder="gimuy"
              className="w-full text-center rounded-lg bg-surface-container-highest px-2 py-2 font-mono text-sm border border-outline-variant/30"
              aria-label="Regex flags"
            />
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 min-h-[160px] w-full rounded-lg bg-transparent border border-outline-variant/20 p-3 font-mono text-sm resize-none editor-scroll"
          placeholder={L.placeholder}
          spellCheck={false}
        />
      </div>
    ) : isTs ? (
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Mode
          </span>
          <div className="flex rounded-full bg-surface-container-highest p-1 gap-1">
            <button
              type="button"
              onClick={() => setTimestampMode("toDate")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                timestampMode === "toDate"
                  ? "bg-primary text-on-primary shadow"
                  : "text-on-surface-variant"
              }`}
            >
              Unix → Date
            </button>
            <button
              type="button"
              onClick={() => setTimestampMode("toUnix")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                timestampMode === "toUnix"
                  ? "bg-primary text-on-primary shadow"
                  : "text-on-surface-variant"
              }`}
            >
              Date → Unix
            </button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 min-h-[180px] w-full rounded-lg bg-transparent border border-outline-variant/20 p-3 font-mono text-sm resize-none editor-scroll"
          placeholder={L.placeholder}
          spellCheck={false}
        />
      </div>
    ) : (
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 w-full min-h-[200px] bg-transparent border-none focus:ring-0 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none editor-scroll"
        placeholder={L.placeholder}
        spellCheck={false}
      />
    );

  return (
    <CodeToolShell
      title={tool.title}
      description={tool.description}
      primaryLabel={L.primary}
      primaryIcon={L.icon}
      onPrimary={handleRun}
      primaryDisabled={isLoading}
      isLoading={isLoading}
      inputPanelTitle={L.inputTitle}
      inputBadge="RAW"
      inputSlot={inputSlot}
      hideTextarea
      inputValue={input}
      onInputChange={setInput}
      output={displayOutput}
      error={errLine}
      onClear={handleClear}
      onCopy={handleCopy}
      statusMode={L.statusMode}
      emptyOutputHint={
        slug === "json-formatter"
          ? "Paste JSON and tap Format JSON."
          : "Run the tool to see output here."
      }
    />
  );
}
