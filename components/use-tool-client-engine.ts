"use client";

import { useRef, useState } from "react";
import { format as formatSql } from "sql-formatter";
import { html as beautifyHtml } from "js-beautify";
import { minify as terserMinify } from "terser";
import imageCompression from "browser-image-compression";
import axios, { isAxiosError } from "axios";
import {
  validateImageUpload,
  validateImageDimensions,
  RECOMMENDED_MIN_DIMENSION_PX,
} from "../lib/image-upload-limits";
import { PDFDocument } from "pdf-lib";
import jsPDF from "jspdf";

export type ApiTestResult = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  durationMs: number;
};

const BG_REMOVER_MAX_DIMENSION = 1600;

async function decodeImageSource(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Fall back below
    }
  }

  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = src;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to read image."));
    });
    return img;
  } catch (err) {
    URL.revokeObjectURL(src);
    throw err;
  }
}

function releaseImageSource(source: ImageBitmap | HTMLImageElement) {
  if ("close" in source && typeof source.close === "function") {
    source.close();
    return;
  }
  if ("src" in source && source.src.startsWith("blob:")) {
    URL.revokeObjectURL(source.src);
  }
}

/** Decode with EXIF orientation, enforce min size, and export JPEG for reliable API detection. */
async function prepareImageForBackgroundRemoval(
  file: File,
): Promise<{ blob: Blob; scaled: boolean; width: number; height: number }> {
  const source = await decodeImageSource(file);
  const width = source.width;
  const height = source.height;

  const dimCheck = validateImageDimensions(width, height);
  if (!dimCheck.ok) {
    releaseImageSource(source);
    throw new Error(dimCheck.error);
  }

  const longestSide = Math.max(width, height);
  const scaled = longestSide > BG_REMOVER_MAX_DIMENSION;
  const ratio = scaled ? BG_REMOVER_MAX_DIMENSION / longestSide : 1;
  const targetWidth = Math.max(1, Math.round(width * ratio));
  const targetHeight = Math.max(1, Math.round(height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    releaseImageSource(source);
    throw new Error("Canvas is unavailable.");
  }
  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  releaseImageSource(source);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.92),
  );
  if (!blob) {
    throw new Error("Failed to prepare image.");
  }

  return { blob, scaled, width: targetWidth, height: targetHeight };
}

function parseApiErrorPayload(data: unknown): string | null {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as { error?: string };
      return parsed.error || null;
    } catch {
      return data;
    }
  }
  if (typeof data === "object" && data !== null && "error" in data) {
    const err = (data as { error?: unknown }).error;
    return typeof err === "string" ? err : null;
  }
  return null;
}

async function parseApiErrorBlob(blob: Blob): Promise<string> {
  try {
    const text = await blob.text();
    return parseApiErrorPayload(text) || "Background removal failed.";
  } catch {
    // ignore
  }
  return "Background removal failed.";
}

async function removeBackgroundViaApi(
  file: File,
  preparedBlob: Blob,
  onProgress?: (percent: number) => void,
): Promise<Blob> {
  const formData = new FormData();
  const uploadName = (file.name || "image.jpg").replace(/\.[^.]+$/i, ".jpg");
  formData.append("image", preparedBlob, uploadName);

  try {
    const response = await axios.post("/api/remove-background", formData, {
      responseType: "blob",
      headers: { Accept: "image/png" },
      onUploadProgress: (event) => {
        if (!onProgress || !event.total) return;
        const pct = Math.round((event.loaded / event.total) * 55) + 15;
        onProgress(Math.min(88, pct));
      },
    });

    const data = response.data as Blob;
    if (data.type?.includes("json")) {
      throw new Error(await parseApiErrorBlob(data));
    }
    onProgress?.(95);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const fromPayload = parseApiErrorPayload(err.response.data);
      if (fromPayload) throw new Error(fromPayload);
      if (err.response.data instanceof Blob) {
        throw new Error(await parseApiErrorBlob(err.response.data));
      }
    }
    if (err instanceof Error) throw err;
    throw new Error("Background removal failed.");
  }
}

export function useToolClientEngine(slug: string) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const progressTimerRef = useRef<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const [httpMethod, setHttpMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headersText, setHeadersText] = useState("");
  const [regexPattern, setRegexPattern] = useState("");
  const [regexFlags, setRegexFlags] = useState("g");
  const [timestampMode, setTimestampMode] = useState("toDate");
  const [imageFormat, setImageFormat] = useState("image/png");
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [splitPagesSpec, setSplitPagesSpec] = useState("1");
  const [compressQuality, setCompressQuality] = useState(80);
  const [apiResponse, setApiResponse] = useState<ApiTestResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const isImageTool = [
    "image-compressor",
    "image-converter",
    "background-remover",
    "resize-image",
  ].includes(slug);
  const isPdfTool = ["pdf-to-image", "image-to-pdf", "merge-pdf", "split-pdf"].includes(slug);
  const isRegexTool = slug === "regex-tester";
  const isApiTester = slug === "api-tester";
  const isUuid = slug === "uuid-generator";
  const isTimestamp = slug === "timestamp-converter";
  const hasFileInput = isImageTool || isPdfTool;

  async function handleRun() {
    try {
      setIsLoading(true);
      setResultBlob(null);
      if (slug === "background-remover" && files.length > 0) {
        setOutput("");
      }
      if (slug === "background-remover" && files.length > 0) {
        setProcessProgress(0);
        if (progressTimerRef.current) window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = window.setInterval(() => {
          setProcessProgress((p) => {
            const bump = 6 + Math.random() * 10;
            const next = p + bump;
            return next >= 92 ? 92 : next;
          });
        }, 220);
      }

      switch (slug) {
        case "json-formatter": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          const parsed = JSON.parse(input);
          setOutput(JSON.stringify(parsed, null, 2));
          break;
        }
        case "jwt-decoder": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          const parts = input.split(".");
          if (parts.length < 2) {
            setOutput("Invalid JWT: expected three segments (header.payload.signature).");
            break;
          }
          const [header, payload, signature] = parts;
          const decodeSegment = (seg: string) => {
            const normalized = seg.replace(/-/g, "+").replace(/_/g, "/");
            const padded = normalized + "===".slice((normalized.length + 3) % 4);
            return atob(padded);
          };
          setOutput(
            JSON.stringify(
              {
                header: JSON.parse(decodeSegment(header)),
                payload: JSON.parse(decodeSegment(payload)),
                signature,
              },
              null,
              2,
            ),
          );
          break;
        }
        case "base64-encode": {
          setOutput(btoa(input || ""));
          break;
        }
        case "base64-decode": {
          if (!input) {
            setOutput("");
            break;
          }
          setOutput(atob(input));
          break;
        }
        case "uuid-generator": {
          setOutput(crypto.randomUUID());
          break;
        }
        case "sql-formatter": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          setOutput(formatSql(input, { language: "sql" }));
          break;
        }
        case "html-beautifier": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          setOutput(beautifyHtml(input, { indent_size: 2, wrap_line_length: 120 }));
          break;
        }
        case "css-minifier": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          const res = await fetch("/api/css-minify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ css: input }),
          });
          if (!res.ok) {
            setOutput("Minify error from server:\n" + ((await res.text()) || res.statusText));
            break;
          }
          const data = await res.json();
          setOutput(data.error ? "Minify error:\n" + data.error : data.css || "");
          break;
        }
        case "js-minifier": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          const result = await terserMinify(input, { compress: true, mangle: true });
          setOutput(
            (result as { error?: unknown; code?: string }).error
              ? "Minify error:\n" + String((result as { error: unknown }).error)
              : (result as { code?: string }).code || "",
          );
          break;
        }
        case "regex-tester": {
          if (!regexPattern) {
            setOutput("Enter a pattern to test.");
            break;
          }
          let re: RegExp;
          try {
            re = new RegExp(regexPattern, regexFlags);
          } catch (err: unknown) {
            setOutput("Invalid RegExp: " + (err as Error).message);
            break;
          }
          const text = input ?? "";
          const matches: object[] = [];
          let match: RegExpExecArray | null;
          if (re.global) {
            while ((match = re.exec(text)) !== null) {
              matches.push({ match: match[0], index: match.index, groups: match.groups });
              if (match.index === re.lastIndex) re.lastIndex++;
            }
          } else {
            match = re.exec(text);
            if (match) matches.push({ match: match[0], index: match.index, groups: match.groups });
          }
          setOutput(JSON.stringify({ count: matches.length, matches }, null, 2));
          break;
        }
        case "timestamp-converter": {
          if (!input.trim()) {
            setOutput("");
            break;
          }
          if (timestampMode === "toDate") {
            const raw = Number(input.trim());
            if (Number.isNaN(raw)) {
              setOutput("Provide a numeric Unix timestamp (seconds or ms).");
              break;
            }
            const ms = raw < 1e11 ? raw * 1000 : raw;
            const d = new Date(ms);
            if (Number.isNaN(d.getTime())) {
              setOutput("Invalid timestamp.");
              break;
            }
            setOutput(
              JSON.stringify(
                {
                  iso: d.toISOString(),
                  locale: d.toLocaleString(),
                  utc: d.toUTCString(),
                  unixSeconds: Math.floor(ms / 1000),
                  unixMilliseconds: ms,
                },
                null,
                2,
              ),
            );
          } else {
            const d = new Date(input);
            if (Number.isNaN(d.getTime())) {
              setOutput("Unable to parse date. Try formats like 2026-03-10T12:34:56Z.");
              break;
            }
            const ms = d.getTime();
            setOutput(
              JSON.stringify(
                {
                  unixSeconds: Math.floor(ms / 1000),
                  unixMilliseconds: ms,
                  iso: d.toISOString(),
                },
                null,
                2,
              ),
            );
          }
          break;
        }
        case "api-tester": {
          setApiResponse(null);
          setApiError(null);
          if (!url.trim()) {
            setApiError("Enter a URL to call.");
            setOutput("Enter a URL to call.");
            break;
          }
          const headers: Record<string, string> = {};
          if (headersText.trim()) {
            try {
              Object.assign(headers, JSON.parse(headersText));
            } catch {
              const msg = 'Headers must be valid JSON, e.g. { "Authorization": "Bearer ..." }';
              setApiError(msg);
              setOutput(msg);
              break;
            }
          }
          const method = httpMethod.toUpperCase();
          const hasBody = method !== "GET" && method !== "HEAD" && input.trim().length > 0;
          if (hasBody && !headers["Content-Type"] && !headers["content-type"]) {
            const trimmed = input.trim();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
              headers["Content-Type"] = "application/json";
            }
          }
          const started = performance.now();
          try {
            const res = await axios.request({
              url: url.trim(),
              method,
              headers,
              data: hasBody ? input : undefined,
              validateStatus: () => true,
              timeout: 60_000,
              transformResponse: [(data) => data],
              responseType: "text",
            });
            let body: unknown = res.data;
            const contentType = String(res.headers["content-type"] ?? "");
            if (typeof body === "string" && contentType.includes("application/json")) {
              try {
                body = JSON.parse(body);
              } catch {
                /* keep raw string */
              }
            } else if (typeof body === "string" && (body.startsWith("{") || body.startsWith("["))) {
              try {
                body = JSON.parse(body);
              } catch {
                /* keep raw string */
              }
            }
            const flatHeaders: Record<string, string> = {};
            for (const [k, v] of Object.entries(res.headers)) {
              if (v === undefined) continue;
              flatHeaders[k] = Array.isArray(v) ? v.join(", ") : String(v);
            }
            const result: ApiTestResult = {
              ok: res.status >= 200 && res.status < 300,
              status: res.status,
              statusText: res.statusText,
              headers: flatHeaders,
              body,
              durationMs: Math.round(performance.now() - started),
            };
            setApiResponse(result);
            setOutput(JSON.stringify(result, null, 2));
          } catch (err: unknown) {
            let message = "Request error: " + (err as Error).message;
            if (isAxiosError(err) && err.response) {
              const flatHeaders: Record<string, string> = {};
              for (const [k, v] of Object.entries(err.response.headers)) {
                if (v === undefined) continue;
                flatHeaders[k] = Array.isArray(v) ? v.join(", ") : String(v);
              }
              const result: ApiTestResult = {
                ok: false,
                status: err.response.status,
                statusText: err.response.statusText,
                headers: flatHeaders,
                body: err.response.data,
                durationMs: Math.round(performance.now() - started),
              };
              setApiResponse(result);
              setOutput(JSON.stringify(result, null, 2));
              break;
            }
            if (isAxiosError(err) && err.message) message = err.message;
            setApiError(message);
            setOutput(message);
          }
          break;
        }
        case "image-compressor": {
          if (!files.length) {
            setOutput("Attach at least one image to compress.");
            break;
          }
          const file = files[0];
          const q = Math.max(0.01, Math.min(1, compressQuality / 100));
          const compressed = await imageCompression(file, {
            maxSizeMB: 512,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            initialQuality: q,
          });
          setResultBlob(compressed);
          setOutput(
            `Compressed ${file.name}\nOriginal: ${(file.size / 1024).toFixed(1)} KB\nCompressed: ${(compressed.size / 1024).toFixed(1)} KB\nSize: ${((compressed.size / file.size) * 100).toFixed(1)}% of original`,
          );
          break;
        }
        case "image-converter": {
          if (!files.length) {
            setOutput("Attach an image to convert.");
            break;
          }
          const file = files[0];
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
          });
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d")!.drawImage(img, 0, 0);
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, imageFormat, 0.9));
          URL.revokeObjectURL(img.src);
          if (!blob) {
            setOutput("Failed to convert image.");
            break;
          }
          setResultBlob(blob);
          setOutput(`Converted ${file.name} → ${imageFormat.replace("image/", "")}\nOutput size: ${(blob.size / 1024).toFixed(1)} KB`);
          break;
        }
        case "background-remover": {
          if (!files.length) {
            setOutput("Attach an image to remove its background.");
            break;
          }
          const file = files[0];
          const validation = validateImageUpload(file);
          if (!validation.ok) {
            setOutput(`Error: ${validation.error}`);
            break;
          }
          setProcessProgress(8);
          const { blob: preparedBlob, scaled, width, height } =
            await prepareImageForBackgroundRemoval(file);
          const blob = await removeBackgroundViaApi(file, preparedBlob, setProcessProgress);
          setResultBlob(blob);
          const speedNote = scaled
            ? `\nOptimized input to max ${BG_REMOVER_MAX_DIMENSION}px for faster processing.`
            : "";
          const sizeHint =
            Math.min(width, height) < RECOMMENDED_MIN_DIMENSION_PX
              ? `\nTip: Larger images (>${RECOMMENDED_MIN_DIMENSION_PX}px on the short side) usually give better cutouts.`
              : "";
          setOutput(
            `Background removed for ${file.name}\nOutput size: ${(blob.size / 1024).toFixed(1)} KB${speedNote}${sizeHint}\nProcessed via remove.bg (image sent securely to our server, not stored).`,
          );
          break;
        }
        case "resize-image": {
          if (!files.length) {
            setOutput("Attach an image to resize.");
            break;
          }
          const widthNum = Number(resizeWidth),
            heightNum = Number(resizeHeight);
          if (!widthNum || !heightNum) {
            setOutput("Provide numeric width and height in pixels.");
            break;
          }
          const file = files[0];
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
          });
          const canvas = document.createElement("canvas");
          canvas.width = widthNum;
          canvas.height = heightNum;
          canvas.getContext("2d")!.drawImage(img, 0, 0, widthNum, heightNum);
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, file.type || "image/png", 0.9));
          URL.revokeObjectURL(img.src);
          if (!blob) {
            setOutput("Failed to resize image.");
            break;
          }
          setResultBlob(blob);
          setOutput(`Resized ${file.name} → ${widthNum}×${heightNum}px\nOutput size: ${(blob.size / 1024).toFixed(1)} KB`);
          break;
        }
        case "pdf-to-image": {
          if (!files.length) {
            setOutput("Attach a PDF to convert to an image.");
            break;
          }
          const file = files[0];
          const buffer = await file.arrayBuffer();
          const pdfjsModule = await import("pdfjs-dist");
          const pdfjs = (pdfjsModule as { default?: unknown }).default || pdfjsModule;
          const p = pdfjs as {
            version?: string;
            GlobalWorkerOptions?: { workerSrc: string };
            getDocument: (o: { data: ArrayBuffer }) => { promise: Promise<unknown> };
          };
          try {
            const version = p.version || "3.11.174";
            if (p.GlobalWorkerOptions) {
              p.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
            }
          } catch {
            /* ignore */
          }
          const pdf = (await (
            p.getDocument({ data: buffer }).promise as Promise<{
              getPage: (n: number) => Promise<{
                getViewport: (o: { scale: number }) => { width: number; height: number };
                render: (o: {
                  canvasContext: CanvasRenderingContext2D | null;
                  viewport: { width: number; height: number };
                }) => { promise: Promise<unknown> };
              }>;
            }>
          )) as unknown as {
            getPage: (n: number) => Promise<{
              getViewport: (o: { scale: number }) => { width: number; height: number };
              render: (o: {
                canvasContext: CanvasRenderingContext2D | null;
                viewport: { width: number; height: number };
              }) => { promise: Promise<unknown> };
            }>;
          };
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
          const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png", 0.95));
          if (!blob) {
            setOutput("Failed to render PDF page.");
            break;
          }
          setResultBlob(blob);
          setOutput(`Rendered first page of ${file.name} to PNG (${canvas.width}×${canvas.height}px).`);
          break;
        }
        case "image-to-pdf": {
          if (!files.length) {
            setOutput("Attach one or more images to convert to PDF.");
            break;
          }
          const doc = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
          for (const [index, file] of files.entries()) {
            const imgDataUrl: string = await new Promise((res, rej) => {
              const reader = new FileReader();
              reader.onload = () => res(reader.result as string);
              reader.onerror = rej;
              reader.readAsDataURL(file);
            });
            doc.addImage(
              imgDataUrl,
              "JPEG",
              0,
              0,
              doc.internal.pageSize.getWidth(),
              doc.internal.pageSize.getHeight(),
              undefined,
              "FAST",
            );
            if (index !== files.length - 1) doc.addPage();
          }
          setResultBlob(doc.output("blob"));
          setOutput(`Combined ${files.length} image(s) into a single PDF document.`);
          break;
        }
        case "merge-pdf": {
          if (files.length < 2) {
            setOutput("Attach at least two PDF files to merge.");
            break;
          }
          const mergedPdf = await PDFDocument.create();
          for (const file of files) {
            const pdf = await PDFDocument.load(await file.arrayBuffer());
            (await mergedPdf.copyPages(pdf, pdf.getPageIndices())).forEach((page) => mergedPdf.addPage(page));
          }
          const mergedBytes = await mergedPdf.save();
          setResultBlob(new Blob([mergedBytes as BlobPart], { type: "application/pdf" }));
          setOutput(
            `Merged ${files.length} PDF files into a single document (${(mergedBytes.byteLength / 1024).toFixed(1)} KB).`,
          );
          break;
        }
        case "split-pdf": {
          if (!files.length) {
            setOutput("Attach a PDF to split.");
            break;
          }
          const file = files[0];
          const pdf = await PDFDocument.load(await file.arrayBuffer());
          const total = pdf.getPageCount();
          const pages = new Set<number>();
          (splitPagesSpec || "1").split(",").forEach((part) => {
            const trimmed = part.trim();
            if (!trimmed) return;
            if (trimmed.includes("-")) {
              const [s, e] = trimmed.split("-").map(Number);
              for (let i = Math.max(1, s); i <= Math.min(total, e); i++) pages.add(i - 1);
            } else {
              const idx = Number(trimmed);
              if (Number.isFinite(idx) && idx >= 1 && idx <= total) pages.add(idx - 1);
            }
          });
          if (!pages.size) {
            setOutput(`No valid pages selected. This document has ${total} page(s).`);
            break;
          }
          const outPdf = await PDFDocument.create();
          (await outPdf.copyPages(pdf, [...pages])).forEach((page) => outPdf.addPage(page));
          const bytes = await outPdf.save();
          setResultBlob(new Blob([bytes as BlobPart], { type: "application/pdf" }));
          setOutput(`Created a new PDF containing ${pages.size} page(s) from ${file.name}.`);
          break;
        }
        default:
          setOutput("This tool is not implemented yet.");
      }
    } catch (err: unknown) {
      setOutput("Error: " + (err as Error).message);
    } finally {
      setIsLoading(false);
      if (slug === "background-remover") {
        if (progressTimerRef.current) window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
        setProcessProgress(100);
      }
    }
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard?.writeText(output).catch(() => {});
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setFiles([]);
    setResultBlob(null);
    setApiResponse(null);
    setApiError(null);
  }

  function handleDownload() {
    if (resultBlob) {
      const ext = [
        "pdf-to-image",
        "image-compressor",
        "image-converter",
        "resize-image",
        "background-remover",
      ].includes(slug)
        ? "png"
        : "pdf";
      const blobUrl = URL.createObjectURL(resultBlob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${slug}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
      return;
    }
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${slug}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  }

  return {
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
    compressQuality,
    setCompressQuality,
    apiResponse,
    apiError,
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
  };
}

export type ToolClientEngine = ReturnType<typeof useToolClientEngine>;
