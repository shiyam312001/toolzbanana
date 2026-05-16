"use client";

import { useEffect, useMemo } from "react";
import { BackgroundRemoverCompare } from "../image-tools/BackgroundRemoverCompare";
import { ImageToolShell } from "./ImageTool";

const DEMO_PREVIEW = "/file.svg";

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** @param {{ slug: string; tool: { title: string; description: string }; engine: import("../use-tool-client-engine").ToolClientEngine }} props */
export function OmniImageTool({ slug, tool, engine }) {
  const {
    files,
    setFiles,
    output,
    resultBlob,
    compressQuality,
    setCompressQuality,
    imageFormat,
    setImageFormat,
    resizeWidth,
    setResizeWidth,
    resizeHeight,
    setResizeHeight,
    handleRun,
    handleDownload,
    isLoading,
  } = engine;

  const previewUrl = useMemo(() => {
    const f = files[0];
    if (!f) return DEMO_PREVIEW;
    return URL.createObjectURL(f);
  }, [files]);

  useEffect(() => {
    const f = files[0];
    if (!f) return;
    return () => {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {
        // ignore
      }
    };
  }, [files, previewUrl]);

  function onPickFile(f) {
    if (!f || !f.type.startsWith("image/")) return;
    setFiles([f]);
  }

  const originalLabel = files[0]
    ? `Original: ${formatMb(files[0].size)}`
    : "Original: 4.2 MB";

  const primaryLabels = {
    "image-compressor": "Compress & Download",
    "image-converter": "Convert & Download",
    "background-remover": "Remove Background",
    "resize-image": "Resize & Download",
  };

  const extraResize = (
    <div className="space-y-4">
      <p className="text-sm text-on-surface-variant font-body">
        Set target dimensions in pixels. The image is stretched to fit exactly.
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <label className="font-headline font-bold text-on-surface text-sm" htmlFor="omni-w">
          Width
        </label>
        <input
          id="omni-w"
          type="text"
          inputMode="numeric"
          value={resizeWidth}
          onChange={(e) => setResizeWidth(e.target.value)}
          placeholder="1920"
          className="w-24 rounded-lg bg-surface-container-highest px-3 py-2 text-sm border border-outline-variant/30 text-center"
        />
        <span className="text-on-surface-variant">×</span>
        <label className="font-headline font-bold text-on-surface text-sm" htmlFor="omni-h">
          Height
        </label>
        <input
          id="omni-h"
          type="text"
          inputMode="numeric"
          value={resizeHeight}
          onChange={(e) => setResizeHeight(e.target.value)}
          placeholder="1080"
          className="w-24 rounded-lg bg-surface-container-highest px-3 py-2 text-sm border border-outline-variant/30 text-center"
        />
      </div>
    </div>
  );

  const extraConverter = (
    <div className="space-y-4">
      <label className="font-headline font-bold text-on-surface" htmlFor="omni-fmt">
        Target format
      </label>
      <select
        id="omni-fmt"
        value={imageFormat}
        onChange={(e) => setImageFormat(e.target.value)}
        className="w-full rounded-lg bg-surface-container-highest px-3 py-3 text-sm font-bold border border-outline-variant/30"
      >
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <p className="text-[0.75rem] text-on-surface-variant">
        Quality is optimized automatically for the selected format.
      </p>
    </div>
  );

  const extraBg = (
    <div className="space-y-4 min-h-[120px] flex flex-col justify-center">
      <p className="text-sm text-on-surface leading-relaxed">
        Background removal runs <strong className="text-primary">locally</strong> in your browser.
        For best results, use a clear subject and simple background.
      </p>
    </div>
  );

  const showCompression = slug === "image-compressor";
  let extraControls = null;
  if (slug === "resize-image") extraControls = extraResize;
  if (slug === "image-converter") extraControls = extraConverter;
  if (slug === "background-remover") extraControls = extraBg;

  return (
    <>
      <ImageToolShell
        title={tool.title}
        description={tool.description}
        quality={compressQuality}
        onQualityChange={setCompressQuality}
        showCompression={showCompression}
        extraControls={extraControls}
        previewUrl={previewUrl}
        originalLabel={originalLabel}
        busy={isLoading}
        primaryLabel={primaryLabels[slug] ?? "Run"}
        onPrimary={handleRun}
        onPickFile={onPickFile}
      />
      {slug === "background-remover" && files[0] ? (
        <BackgroundRemoverCompare
          variant="omni"
          beforeFile={files[0]}
          resultBlob={resultBlob}
          isLoading={isLoading}
        />
      ) : null}
      {(output || resultBlob) && (
        <div className="w-full max-w-2xl mt-8 flex flex-col gap-3 items-stretch">
          {output ? (
            <p
              className={`text-sm leading-relaxed whitespace-pre-wrap rounded-lg p-4 bg-surface-container-low ring-1 ring-outline-variant/15 ${output.startsWith("Error:") ? "text-error font-medium" : "text-on-surface-variant"}`}
            >
              {output}
            </p>
          ) : null}
          {resultBlob ? (
            <button
              type="button"
              onClick={handleDownload}
              className="primary-gradient text-on-primary font-headline font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 hover:saturate-150 transition-all flex items-center justify-center gap-2 w-full sm:w-auto self-center"
            >
              <span className="material-symbols-outlined">download</span>
              Download result
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}
