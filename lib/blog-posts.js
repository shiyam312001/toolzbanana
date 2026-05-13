/**
 * Static articles for /blog — unique publisher content for SEO and programme policies.
 * @type {{ slug: string; title: string; description: string; date: string; readMinutes: number; sections: { heading: string; paragraphs: string[] }[] }[]}
 */
export const BLOG_POSTS = [
  {
    slug: "why-local-browser-tools-matter",
    title: "Why local browser tools matter for privacy and speed",
    description:
      "How ToolzBanana runs many utilities in your browser, what never leaves your device, and when a server round-trip is required.",
    date: "2026-04-18",
    readMinutes: 6,
    sections: [
      {
        heading: "The case for client-side processing",
        paragraphs: [
          "Developers and creators often need quick utilities: format JSON, decode a JWT, compress an image, or merge PDFs. Traditional web apps sometimes upload every file to a server. That can be convenient for heavy jobs, but it also increases latency and puts more of your data in transit.",
          "ToolzBanana is designed so that many workflows complete entirely in your browser. When processing stays on your machine, you avoid unnecessary uploads, reduce exposure if a third party were compromised, and typically get faster feedback for small and medium inputs.",
        ],
      },
      {
        heading: "When a server is still involved",
        paragraphs: [
          "Some operations are impractical to run fully in the browser at scale, or rely on libraries that execute more reliably on the server. In those cases, only the minimum data required for the operation should be sent, and you should always read the specific tool notes on the page.",
          "If you are working with highly sensitive material, consider using offline tooling or corporate-approved environments in addition to any public website.",
        ],
      },
      {
        heading: "Building habits that protect your tokens and files",
        paragraphs: [
          "Never paste production secrets into unfamiliar sites. For JWT inspection, prefer local decoding when you only need to read claims. For API testing, use staging credentials and synthetic data whenever possible.",
          "We publish guides alongside our tools so each page explains what runs locally, what you should avoid pasting, and how to copy results safely back into your editor or ticket system.",
        ],
      },
    ],
  },
  {
    slug: "json-jwt-and-base64-at-work",
    title: "JSON, JWT, and Base64 at work: a practical primer",
    description:
      "A readable overview for engineers who touch APIs daily: formatting payloads, inspecting tokens, and encoding binary safely.",
    date: "2026-04-02",
    readMinutes: 7,
    sections: [
      {
        heading: "JSON as the lingua franca of APIs",
        paragraphs: [
          "Most modern APIs speak JSON. Readable JSON makes debugging easier: consistent indentation, sorted keys where appropriate, and validation errors that point to the exact line save hours during integrations.",
          "A dedicated formatter helps you confirm that the structure you think you sent is what downstream services actually receive, especially when building requests in curl, Postman, or custom scripts.",
        ],
      },
      {
        heading: "JWT structure without the mystery",
        paragraphs: [
          "JSON Web Tokens are three Base64url-encoded segments: header, payload, and signature. Decoding the header and payload is a standard debugging step; verifying the signature belongs to your identity provider and must be done with the correct keys and libraries in a trusted environment.",
          "Our JWT decoder focuses on helping you read claims and expiry locally so you can compare them against server logs without sending the token to an unnecessary backend.",
        ],
      },
      {
        heading: "Base64 for transport, not for security",
        paragraphs: [
          "Base64 encodes bytes as ASCII text. It is not encryption. Use it when you need to embed binary in JSON or email-safe text, not when you need confidentiality.",
          "Pair encoding utilities with real cryptographic tools when you handle passwords, keys, or personal data at rest or in transit.",
        ],
      },
    ],
  },
  {
    slug: "pdf-and-image-workflows-without-clutter",
    title: "PDF and image workflows without desktop clutter",
    description:
      "Merge, split, convert, and resize documents and images from the browser when you do not want another desktop app installed.",
    date: "2026-03-15",
    readMinutes: 5,
    sections: [
      {
        heading: "Lightweight document tasks",
        paragraphs: [
          "Many PDF jobs are simple: combine invoices, extract a page range for a colleague, or turn slides into images for a wiki. Dedicated desktop suites are powerful but heavy for one-off tasks.",
          "Browser-based utilities shine when the file sizes are moderate, the steps are repeatable, and you want immediate download links without managing installers.",
        ],
      },
      {
        heading: "Images for the web",
        paragraphs: [
          "Serving appropriately compressed images improves Core Web Vitals and user experience. Converting formats and resizing to exact dimensions are common steps before upload to a CMS or storefront.",
          "Automating those steps in a predictable UI reduces mistakes like accidentally overwriting a source PNG with an over-compressed JPEG.",
        ],
      },
      {
        heading: "Quality checks before you ship",
        paragraphs: [
          "Always visually inspect PDFs and images after conversion. Fonts, transparency, and color profiles can behave differently across engines.",
          "Keep originals until you have confirmed the export opens correctly in the tool your audience uses most.",
        ],
      },
    ],
  },
  {
    slug: "adsense-friendly-pages-what-we-publish",
    title: "What we publish on every tool page (and why it matters)",
    description:
      "Transparency about editorial content next to utilities: how ToolzBanana pairs explanations with tools for a better reader experience.",
    date: "2026-05-01",
    readMinutes: 4,
    sections: [
      {
        heading: "Tools plus context",
        paragraphs: [
          "A utility without explanation can still be useful, but readers and automated policy systems both benefit from clear context: what the tool does, typical pitfalls, and privacy expectations.",
          "Each ToolzBanana tool page includes an editorial section with guidance written for humans first. That content is independent of the interactive widget and remains available even if scripts fail partially.",
        ],
      },
      {
        heading: "Navigation versus destination pages",
        paragraphs: [
          "Pure navigation screens—like bare redirects or empty shells—are poor places for advertising because they do not answer a reader question. We avoid placing display ads on sparse screens and instead route people to pages with real explanations.",
          "Our hub pages summarize categories in depth so they remain valuable reading experiences on their own.",
        ],
      },
    ],
  },
];

export function getAllBlogSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
