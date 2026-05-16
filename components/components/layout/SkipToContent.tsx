"use client";

export function SkipToContent() {
  return (
    <button
      type="button"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-md"
      onClick={() => {
        const main = document.getElementById("content");
        if (!main) return;
        main.focus({ preventScroll: true });
        main.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Skip to main content
    </button>
  );
}
