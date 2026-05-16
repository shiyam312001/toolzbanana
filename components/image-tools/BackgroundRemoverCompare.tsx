"use client";

import { useEffect, useMemo } from "react";

const CHECKER_BG =
  "repeating-conic-gradient(#e8e3da 0% 25%, #f5f2ed 0% 50%) 0 0 / 16px 16px";

type BackgroundRemoverCompareProps = {
  beforeFile: File | null | undefined;
  resultBlob: Blob | null | undefined;
  isLoading?: boolean;
  variant?: "omni" | "legacy";
};

function ComparePane({
  label,
  src,
  emptyHint,
  checker = false,
  variant,
}: {
  label: string;
  src: string | null;
  emptyHint: string;
  checker?: boolean;
  variant: "omni" | "legacy";
}) {
  const frameClass =
    variant === "omni"
      ? "relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant/20"
      : "relative w-full aspect-[4/3] rounded-[10px] overflow-hidden border border-[#e8e3da]";

  const bgStyle = checker ? { background: CHECKER_BG } : { background: "#f5f2ed" };

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <span
        className={
          variant === "omni"
            ? "text-[0.7rem] font-bold uppercase tracking-wider text-on-surface-variant"
            : "text-[10px] font-bold uppercase tracking-wider text-[#6b6560]"
        }
      >
        {label}
      </span>
      <div className={frameClass} style={bgStyle}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={label}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={
              variant === "omni"
                ? "absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-on-surface-variant/80"
                : "absolute inset-0 flex items-center justify-center p-4 text-center text-xs text-[#6b6560]"
            }
          >
            {emptyHint}
          </div>
        )}
      </div>
    </div>
  );
}

export function BackgroundRemoverCompare({
  beforeFile,
  resultBlob,
  isLoading = false,
  variant = "omni",
}: BackgroundRemoverCompareProps) {
  const beforeUrl = useMemo(
    () => (beforeFile ? URL.createObjectURL(beforeFile) : null),
    [beforeFile],
  );
  const afterUrl = useMemo(
    () => (resultBlob ? URL.createObjectURL(resultBlob) : null),
    [resultBlob],
  );

  useEffect(() => {
    return () => {
      if (beforeUrl) URL.revokeObjectURL(beforeUrl);
      if (afterUrl) URL.revokeObjectURL(afterUrl);
    };
  }, [beforeUrl, afterUrl]);

  if (!beforeFile && !resultBlob) return null;

  const afterHint = isLoading
    ? "Removing background…"
    : beforeFile
      ? "Run Remove Background to generate result"
      : "Upload an image first";

  if (variant === "legacy") {
    return (
      <div
        style={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          padding: "0 0 8px",
        }}
      >
        <ComparePane
          variant="legacy"
          label="Before"
          src={beforeUrl}
          emptyHint="Upload an image"
        />
        <ComparePane
          variant="legacy"
          label="After"
          src={afterUrl}
          emptyHint={afterHint}
          checker
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <ComparePane
        variant="omni"
        label="Before"
        src={beforeUrl}
        emptyHint="Upload an image"
      />
      <ComparePane
        variant="omni"
        label="After"
        src={afterUrl}
        emptyHint={afterHint}
        checker
      />
    </div>
  );
}
