/** Hub index pages: /tools/code | /tools/image | /tools/pdf (tool cards, not aliases). */
export const HUB_KEY_TO_CATEGORY = {
  code: "Code & Data",
  image: "Image",
  pdf: "PDF",
};

export const CATEGORY_TO_HUB_KEY = {
  "Code & Data": "code",
  Image: "image",
  PDF: "pdf",
};

export function isToolHubSegment(raw) {
  return typeof raw === "string" && raw in HUB_KEY_TO_CATEGORY;
}

export function getHubCategoryFromSegment(segment) {
  if (!isToolHubSegment(segment)) return null;
  return HUB_KEY_TO_CATEGORY[segment];
}

/** Normalizes [tool] param only for empty input (Next segment missing). */
export function resolveToolPageSlug(raw) {
  if (typeof raw !== "string" || !raw.length) return "json-formatter";
  return raw;
}

const OMNI_CODE_SLUGS = new Set([
  "json-formatter",
  "jwt-decoder",
  "base64-encode",
  "base64-decode",
  "uuid-generator",
  "api-tester",
  "regex-tester",
  "sql-formatter",
  "html-beautifier",
  "css-minifier",
  "js-minifier",
  "timestamp-converter",
]);

const OMNI_IMAGE_SLUGS = new Set([
  "image-compressor",
  "image-converter",
  "background-remover",
  "resize-image",
]);

const OMNI_PDF_SLUGS = new Set([
  "merge-pdf",
  "pdf-to-image",
  "image-to-pdf",
  "split-pdf",
]);

/** @returns {"code"|"image"|"pdf"|null} */
export function getOmniShellForSlug(resolvedSlug) {
  if (OMNI_CODE_SLUGS.has(resolvedSlug)) return "code";
  if (OMNI_IMAGE_SLUGS.has(resolvedSlug)) return "image";
  if (OMNI_PDF_SLUGS.has(resolvedSlug)) return "pdf";
  return null;
}

/** @deprecated use getOmniShellForSlug */
export function getOmniToolSuite(resolvedSlug) {
  return getOmniShellForSlug(resolvedSlug);
}

export const TOOL_META = {
  "json-formatter": {
    title: "JSON Formatter",
    category: "Code & Data",
    icon: "{ }",
    description:
      "Validate and pretty‑print JSON with helpful error messages and one‑click copy.",
  },
  "jwt-decoder": {
    title: "JWT Decoder",
    category: "Code & Data",
    icon: "🔑",
    description:
      "Decode JWT headers and payloads locally in your browser — no tokens leave your device.",
  },
  "base64-encode": {
    title: "Base64 Encode",
    category: "Code & Data",
    icon: "→",
    description: "Convert plain text into Base64 for transport or storage.",
  },
  "base64-decode": {
    title: "Base64 Decode",
    category: "Code & Data",
    icon: "←",
    description: "Decode Base64 strings back into readable text.",
  },
  "uuid-generator": {
    title: "UUID Generator",
    category: "Code & Data",
    icon: "⚙",
    description: "Generate secure RFC 4122 v4 UUIDs using the Web Crypto API.",
  },
  "api-tester": {
    title: "API Tester",
    category: "Code & Data",
    icon: "⚡",
    description:
      "Quickly call REST APIs with custom methods, headers, and bodies and inspect full responses.",
  },
  "regex-tester": {
    title: "Regex Tester",
    category: "Code & Data",
    icon: ".*",
    description:
      "Test JavaScript regular expressions and inspect matches, indices, and groups.",
  },
  "sql-formatter": {
    title: "SQL Formatter",
    category: "Code & Data",
    icon: "⊞",
    description:
      "Reformat SQL queries for readability with consistent indentation.",
  },
  "html-beautifier": {
    title: "HTML Beautifier",
    category: "Code & Data",
    icon: "<>",
    description: "Beautify HTML markup with clean, consistent indentation.",
  },
  "css-minifier": {
    title: "CSS Minifier",
    category: "Code & Data",
    icon: "#",
    description:
      "Minify CSS stylesheets using a safe server‑side minifier to reduce file size.",
  },
  "js-minifier": {
    title: "JS Minifier",
    category: "Code & Data",
    icon: "JS",
    description:
      "Compress and mangle JavaScript to create smaller production bundles.",
  },
  "timestamp-converter": {
    title: "Timestamp Converter",
    category: "Code & Data",
    icon: "⏱",
    description:
      "Convert between Unix timestamps and human‑readable dates in multiple formats.",
  },
  "image-compressor": {
    title: "Image Compressor",
    category: "Image",
    icon: "↓",
    description:
      "Compress images in‑browser and compare original vs compressed size before download.",
  },
  "image-converter": {
    title: "Image Converter",
    category: "Image",
    icon: "⟳",
    description: "Convert images between JPG, PNG, and WEBP formats.",
  },
  "background-remover": {
    title: "Background Remover",
    category: "Image",
    icon: "✂",
    description:
      "Remove image backgrounds in your browser. Runs locally — your images never leave your device.",
  },
  "resize-image": {
    title: "Resize Image",
    category: "Image",
    icon: "⤡",
    description:
      "Resize images to exact pixel dimensions with aspect‑ratio control and download.",
  },
  "pdf-to-image": {
    title: "PDF to Image",
    category: "PDF",
    icon: "📄",
    description:
      "Render the first page of a PDF to a high‑resolution PNG image in your browser.",
  },
  "image-to-pdf": {
    title: "Image to PDF",
    category: "PDF",
    icon: "🖼",
    description: "Combine one or more images into a single PDF document.",
  },
  "merge-pdf": {
    title: "Merge PDF",
    category: "PDF",
    icon: "⊕",
    description:
      "Merge multiple PDF files into a single document using pdf-lib.",
  },
  "split-pdf": {
    title: "Split PDF",
    category: "PDF",
    icon: "⊗",
    description:
      "Extract specific pages or ranges from a PDF into a new document.",
  },
};

export const TOOL_PAGE_CATEGORIES = ["Code & Data", "Image", "PDF"];

