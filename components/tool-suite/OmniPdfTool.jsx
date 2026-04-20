"use client";

import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { useCallback, useEffect, useRef, useState } from "react";

const DECOR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcWbO-Nt7ITSkKB4w6jwDfB2q5Lz6Id235kZK36UUzF3zJfav7IV2CnXNoqB2shVURfJZPVUK0MZRy5vn0XRt3utuAUeWldVYUG2Q4sP_tqzWrUbXbHa3zVgOvdoV_ZzLlS5VeJY5YJwkyJRyqWoSyX7orCtcdthAbBtlglolQ0rt4dRhmQItmvJwvVW_PdoXYThhNuQJSsF4yAP-HM9PHj5eLeaWnM7EpuBFCSyjxw01_HFnvhHJkGsuHsm-2Ald_Ioaa1Q-iYg";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function fileToEntry(file, idx) {
  let pages = "—";
  if (file.type.includes("pdf")) {
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      pages = `${pdf.getPageCount()} Pages`;
    } catch {
      pages = "—";
    }
  } else {
    pages = "Image";
  }
  return {
    id: `${file.name}-${idx}-${file.size}`,
    name: file.name,
    pages,
    sizeLabel: formatSize(file.size),
    file,
  };
}

const DEMO_ITEMS = [
  {
    id: "demo-1",
    name: "Annual_Report_2023.pdf",
    pages: "42 Pages",
    sizeLabel: "2.4 MB",
    file: null,
  },
  {
    id: "demo-2",
    name: "Financial_Summary_Q4.pdf",
    pages: "12 Pages",
    sizeLabel: "850 KB",
    file: null,
  },
  {
    id: "demo-3",
    name: "Compliance_Notes_v2.pdf",
    pages: "5 Pages",
    sizeLabel: "1.1 MB",
    file: null,
  },
];

/** @param {{ slug: string; tool: { title: string; description: string }; engine: import("../use-tool-client-engine").ToolClientEngine }} props */
export function OmniPdfTool({ slug, tool, engine }) {
  const {
    files,
    setFiles,
    splitPagesSpec,
    setSplitPagesSpec,
    output,
    resultBlob,
    handleRun,
    handleDownload,
    isLoading,
  } = engine;

  const [items, setItems] = useState(DEMO_ITEMS);
  const [outName, setOutName] = useState("Merged_Documents_2023.pdf");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!files.length) return;
    let cancelled = false;
    (async () => {
      const next = [];
      for (let i = 0; i < files.length; i++) {
        next.push(await fileToEntry(files[i], i));
      }
      if (!cancelled) setItems(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [files]);

  const hasReal = items.some((row) => row.file);
  const allDemo = items.length > 0 && !hasReal;

  const totals = allDemo
    ? { count: 3, pages: 59, bytes: 4.35 * 1024 * 1024 }
    : items.reduce(
        (acc, row) => {
          if (!row.file) return acc;
          acc.count += 1;
          const n = parseInt(String(row.pages).replace(/\D/g, ""), 10);
          if (!Number.isNaN(n)) acc.pages += n;
          acc.bytes += row.file.size;
          return acc;
        },
        { count: 0, pages: 0, bytes: 0 },
      );

  const sizeEstimate = allDemo
    ? "4.35 MB"
    : totals.bytes > 0
      ? `${(totals.bytes / (1024 * 1024)).toFixed(2)} MB`
      : "—";

  const addFiles = useCallback(async (fileList) => {
    const arr = Array.from(fileList || []).filter((f) =>
      slug === "image-to-pdf" ? f.type.startsWith("image/") : f.type.includes("pdf"),
    );
    if (!arr.length) return;
    if (slug === "split-pdf" || slug === "pdf-to-image") {
      setFiles([arr[0]]);
      return;
    }
    const next = [];
    for (let i = 0; i < arr.length; i++) {
      next.push(arr[i]);
    }
    setFiles((prev) => {
      if (!prev.length) return next;
      return [...prev, ...next];
    });
  }, [setFiles, slug]);

  const removeAt = (id) => {
    setFiles((prev) => {
      const row = items.find((x) => x.id === id);
      if (!row?.file) return prev;
      return prev.filter((f) => f !== row.file);
    });
  };

  const clearAll = () => setFiles([]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const openPicker = () => inputRef.current?.click();

  const accept =
    slug === "image-to-pdf" ? "image/png,image/jpeg,image/webp" : "application/pdf";
  const multiple = slug === "merge-pdf" || slug === "image-to-pdf";

  const primaryDisabled =
    isLoading ||
    (slug === "merge-pdf" && files.length < 2) ||
    (slug === "split-pdf" && files.length < 1) ||
    (slug === "pdf-to-image" && files.length < 1) ||
    (slug === "image-to-pdf" && files.length < 1);

  const primaryLabel =
    slug === "merge-pdf"
      ? isLoading
        ? "Merging…"
        : "Merge PDFs"
      : slug === "split-pdf"
        ? isLoading
          ? "Splitting…"
          : "Split PDF"
        : slug === "pdf-to-image"
          ? isLoading
            ? "Rendering…"
            : "Convert to PNG"
          : isLoading
            ? "Building…"
            : "Create PDF";

  return (
    <>
      <div className="mb-12">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {tool.title}
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-6">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <div
            role="button"
            tabIndex={0}
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openPicker();
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="group relative overflow-hidden bg-surface-container-low rounded-lg p-12 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/40 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">
                cloud_upload
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-2">
              {slug === "image-to-pdf" ? "Upload Images" : "Upload PDFs"}
            </h3>
            <p className="text-on-surface-variant text-center mb-6">
              Drag and drop your files here, or click to browse your storage
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              className="bg-surface-container-highest text-primary px-8 py-3 rounded-full font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Add Files
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="font-headline font-bold text-on-surface-variant uppercase tracking-widest text-xs">
                Uploaded Files ({items.length})
              </h4>
              <button
                type="button"
                onClick={clearAll}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-3">
              {items.map((row, index) => (
                <div
                  key={row.id}
                  className={`glass-card p-5 rounded-lg flex items-center justify-between group hover:shadow-xl hover:shadow-primary/5 transition-all ${index === 1 ? "border border-primary/10" : ""}`}
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${
                        slug === "image-to-pdf" && row.file?.type?.startsWith("image")
                          ? "bg-primary/10 text-primary"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {slug === "image-to-pdf" && row.file?.type?.startsWith("image")
                          ? "image"
                          : "picture_as_pdf"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-on-surface truncate">{row.name}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                          {row.pages}
                        </span>
                        <span className="text-xs text-on-surface-variant">{row.sizeLabel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      type="button"
                      className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
                      aria-label="Preview"
                    >
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAt(row.id)}
                      className="p-2 hover:bg-error/10 rounded-full text-error"
                      aria-label="Remove"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant cursor-grab"
                      aria-label="Reorder"
                    >
                      <span className="material-symbols-outlined text-xl">drag_indicator</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-lg p-8 lg:sticky lg:top-24">
            <h3 className="font-headline text-2xl font-bold mb-6">
              {slug === "split-pdf"
                ? "Split Settings"
                : slug === "pdf-to-image"
                  ? "Export Settings"
                  : slug === "image-to-pdf"
                    ? "PDF Settings"
                    : "Merge Settings"}
            </h3>
            <div className="space-y-6">
              {slug === "split-pdf" ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Pages (e.g. 1-3,5)
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    type="text"
                    value={splitPagesSpec}
                    onChange={(e) => setSplitPagesSpec(e.target.value)}
                    placeholder="1"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Output Filename
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    type="text"
                    value={outName}
                    onChange={(e) => setOutName(e.target.value)}
                  />
                </div>
              )}
              <div className="p-4 bg-surface-container rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Files</span>
                  <span className="text-sm font-bold">
                    {allDemo ? 3 : totals.count}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Pages</span>
                  <span className="text-sm font-bold">
                    {allDemo ? 59 : totals.pages || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estimated Size</span>
                  <span className="text-sm font-bold">{sizeEstimate}</span>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={primaryDisabled}
                  className="w-full primary-gradient text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 hover:saturate-150 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    {slug === "merge-pdf" ? "call_merge" : "bolt"}
                  </span>
                  {primaryLabel}
                </button>
                {output ? (
                  <p
                    className={`text-sm leading-relaxed whitespace-pre-wrap ${output.startsWith("Error:") ? "text-error font-medium" : "text-on-surface-variant"}`}
                  >
                    {output}
                  </p>
                ) : null}
                {resultBlob ? (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full bg-surface-container-highest text-primary py-3 rounded-full font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-xl">download</span>
                    Download result
                  </button>
                ) : null}
                {slug === "merge-pdf" ? (
                  <Link
                    href="/tools/split-pdf"
                    className="block w-full text-center bg-surface-container-highest text-secondary py-3 rounded-full font-semibold hover:bg-surface-container-high transition-colors"
                  >
                    Split PDF Instead
                  </Link>
                ) : null}
              </div>
              <p className="text-center text-[0.7rem] text-on-surface-variant/70 italic">
                *All processing is performed in-browser. Your files never leave your device.
              </p>
            </div>
          </div>

          <div className="relative h-48 rounded-lg overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Abstract background"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={DECOR_IMG}
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
              <div className="bg-white/80 p-4 rounded-xl backdrop-blur-md">
                <p className="text-on-surface font-headline font-bold text-sm">Need to compress first?</p>
                <p className="text-on-surface-variant text-[0.7rem] mt-1">
                  Try our advanced compression tool.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
