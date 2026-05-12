"use client";

import { useCallback, useRef } from "react";

const DEMO_PREVIEW =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDjCCsB9K58xYL0_uf1jL57bM5UVDzA2ma94FJWOGVc6xP6MVinWKQD8esOZYAkPEHKpc-N9bWQb_9M9nyc-xho__a7MOQwW0gq4_GLakUqyi4Vityn615jCKaqV4Q5z_bXCibGp2JZwwjXnsDpDwkbc8in8aLgTMlGuLPx8kq_wPMjXITwlNKMHHCYI4nkxhRagqhVNdiSxt2TmCVuWP7eveMeMMfQxj08BnC2bjkenPKj8ofzQrjOXgzUsN1EfE-xSf6x6SfI03k";

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {number} [props.quality]
 * @param {(n: number) => void} [props.onQualityChange]
 * @param {boolean} [props.showCompression]
 * @param {import('react').ReactNode} [props.extraControls]
 * @param {string} props.previewUrl
 * @param {string} props.originalLabel
 * @param {boolean} [props.busy]
 * @param {string} props.primaryLabel
 * @param {() => void} props.onPrimary
 * @param {(f: File | undefined) => void} props.onPickFile
 * @param {string} [props.dropHint]
 */
export function ImageToolShell({
  title,
  description,
  quality = 80,
  onQualityChange,
  showCompression = true,
  extraControls,
  previewUrl,
  originalLabel,
  busy,
  primaryLabel,
  onPrimary,
  onPickFile,
  dropHint = "PNG, JPG, or WEBP up to 20MB",
}) {
  const inputRef = useRef(null);

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    onPickFile(f);
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-12 pb-8 md:pb-12">
      <div className="text-center space-y-4">
        <h1 className="font-headline text-[2.75rem] font-extrabold tracking-tight text-on-surface leading-tight">
          {title}
        </h1>
        <p className="text-on-surface-variant text-lg max-w-md mx-auto">{description}</p>
      </div>

      <div className="w-full space-y-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onPickFile(e.target.files?.[0])}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openPicker();
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="group relative w-full aspect-[16/7] rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low hover:bg-surface-container transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        >
          <div className="z-10 flex flex-col items-center space-y-4 text-center px-6">
            <div className="h-16 w-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                cloud_upload
              </span>
            </div>
            <div className="space-y-1">
              <p className="font-headline font-bold text-lg text-on-surface">
                Drop your masterpiece here
              </p>
              <p className="text-on-surface-variant text-sm">{dropHint}</p>
            </div>
          </div>
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <div className="absolute inset-0 primary-gradient mix-blend-overlay" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          <div className="md:col-span-7 bg-surface-container-lowest rounded-lg p-6 flex flex-col space-y-4 shadow-[40px_0_64px_-20px_rgba(44,47,48,0.06)]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-label">
                Preview
              </span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {originalLabel}
              </span>
            </div>
            <div className="relative w-full aspect-video rounded-md overflow-hidden bg-surface-container-low">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Compression preview"
                src={previewUrl}
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col space-y-6">
            <div className="bg-surface-container-low rounded-lg p-6 space-y-6 flex-1">
              {showCompression ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label
                      className="font-headline font-bold text-on-surface"
                      htmlFor="omni-compress-range"
                    >
                      Compression
                    </label>
                    <span className="text-2xl font-extrabold text-primary font-headline">
                      {quality}%
                    </span>
                  </div>
               <input
  id="omni-compress-range"
  className="w-full h-2 rounded-lg cursor-pointer !bg-[#fde68a] accent-primary"
  max={100}
  min={0}
  type="range"
  value={quality}
  onChange={(e) => onQualityChange?.(Number(e.target.value))}
/>
                  <div className="flex justify-between text-[0.75rem] text-on-surface-variant font-label">
                    <span>High Quality</span>
                    <span>Max Save</span>
                  </div>
                </div>
              ) : (
                extraControls
              )}
            </div>
            <button
              type="button"
              onClick={onPrimary}
              disabled={busy}
              className="primary-gradient text-on-primary font-headline font-bold py-5 px-8 rounded-full shadow-lg shadow-primary/20 hover:saturate-150 transition-all duration-300 active:translate-y-1 flex items-center justify-center space-x-3 w-full group disabled:opacity-70"
            >
              <span className="material-symbols-outlined group-hover:animate-bounce">
                download
              </span>
              <span>{busy ? "Working…" : primaryLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-on-surface-variant font-label text-sm opacity-60">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-base">verified_user</span>
          <span>Secure processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-base">bolt</span>
          <span>GPU accelerated</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-base">delete</span>
          <span>Auto-delete in 24h</span>
        </div>
      </div>
    </div>
  );
}
