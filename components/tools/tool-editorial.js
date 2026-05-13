/**
 * Long-form editorial copy for individual tool routes (AdSense / quality guidelines).
 * @type {Record<string, { pageTitle: string; sections: { h2: string; paragraphs: string[] }[] }>}
 */
const EDITORIAL = {
  "json-formatter": {
    pageTitle: "About this JSON formatter",
    sections: [
      {
        h2: "When formatting JSON saves real time",
        paragraphs: [
          "API responses, configuration files, and log exports often arrive as a single unreadable line. Pretty-printed JSON makes code review, diffing, and hand-editing safer because humans can see nesting, missing commas, and mismatched braces immediately.",
          "Use this formatter when you paste a payload from a network tab or CI log and need a stable layout before sharing it in Slack, a ticket, or documentation.",
        ],
      },
      {
        h2: "Validation errors you can act on",
        paragraphs: [
          "Invalid JSON cannot be reliably interpreted by strict parsers. Surfacing the error location helps you fix truncated streams, smart quotes from word processors, or trailing commas that some serializers allow but JSON forbids.",
          "After formatting succeeds, copy the output into your editor or keep it open while you adjust upstream code that produced the original blob.",
        ],
      },
      {
        h2: "Privacy expectations",
        paragraphs: [
          "Formatting runs in your session for routine use cases. Avoid pasting secrets you would not place in a shared scratch buffer; treat formatted output like any other sensitive text.",
          "Pair this tool with your team's secrets-handling policy: redact tokens before formatting when you publish examples publicly.",
        ],
      },
    ],
  },
  "jwt-decoder": {
    pageTitle: "About this JWT decoder",
    sections: [
      {
        h2: "Decode claims without sending tokens to us",
        paragraphs: [
          "JSON Web Tokens encode a header and payload as Base64url JSON. Inspecting those segments locally is a normal debugging step when expiry, audience, or issuer values look wrong in your application logs.",
          "This workspace is built so decoding happens in the browser for typical inspection workflows, which reduces unnecessary round-trips compared with ad-hoc pastebins.",
        ],
      },
      {
        h2: "Decoding is not verification",
        paragraphs: [
          "Anyone can craft a JWT-shaped string. Signature verification must use your authority's keys and trusted libraries on the server or in a hardened environment. Never trust a decoded payload alone for authorization decisions.",
          "If a token fails verification in your API but looks fine here, focus on clock skew, wrong signing keys, or mixed environments between staging and production.",
        ],
      },
      {
        h2: "Operational hygiene",
        paragraphs: [
          "Rotate refresh tokens and access tokens according to your identity provider guidance. Short-lived access tokens limit the window if a string leaks from a screenshot or log file.",
          "When sharing bug reports, prefer synthetic tokens or redacted claims so real user sessions are not exposed.",
        ],
      },
    ],
  },
  "base64-encode": {
    pageTitle: "About Base64 encoding",
    sections: [
      {
        h2: "Why Base64 exists",
        paragraphs: [
          "Binary data cannot travel cleanly through plain JSON or many email systems. Base64 maps bytes to a restricted ASCII alphabet so the result can be embedded in text formats without control characters breaking parsers.",
          "Common uses include embedding small images in data URLs, wrapping binary payloads inside JSON fields, and preparing attachments for legacy transports.",
        ],
      },
      {
        h2: "Encoding versus encryption",
        paragraphs: [
          "Base64 is reversible by design and offers no confidentiality. Do not rely on it to protect secrets; use proper encryption and key management instead.",
          "Encoded strings are roughly a third longer than raw binary, which matters for large blobs—compress or chunk data when your protocol allows it.",
        ],
      },
      {
        h2: "Practical tips",
        paragraphs: [
          "Always decode on the receiving side with strict validation when the data is untrusted, because malformed input can stress parsers or trigger security bugs in poorly written consumers.",
          "If you encode user-supplied files, document maximum sizes and reject inputs that exceed them to keep the tab responsive.",
        ],
      },
    ],
  },
  "base64-decode": {
    pageTitle: "About Base64 decoding",
    sections: [
      {
        h2: "Recovering the original bytes",
        paragraphs: [
          "Decoding turns a Base64 string back into its raw byte sequence. That is useful when you inspect a configuration value, unpack a payload from an older integration, or reverse a data URL for local analysis.",
          "Whitespace and newlines are common in PEM-style blocks; tolerant decoders strip them, but you should still validate the output type before writing files to disk.",
        ],
      },
      {
        h2: "Safety considerations",
        paragraphs: [
          "Decoded content might be executable, archived, or otherwise unsafe if written blindly to disk. Treat unknown output like any download from the internet.",
          "Never decode secrets into a shared screen recording without redaction, because decoded material can appear in editor history or clipboards unexpectedly.",
        ],
      },
      {
        h2: "Debugging integrations",
        paragraphs: [
          "If decoding fails, check for URL-safe alphabet variants, missing padding characters, or accidental truncation when copying from chat apps that wrap long lines.",
          "Compare the decoded length with what your producer claims; mismatches often point to double-encoding or incorrect transport framing.",
        ],
      },
    ],
  },
  "uuid-generator": {
    pageTitle: "About UUID generation",
    sections: [
      {
        h2: "RFC 4122 version 4 identifiers",
        paragraphs: [
          "Version 4 UUIDs are random128-bit identifiers formatted as hyphenated hexadecimal groups. They are popular for primary keys, correlation IDs, and opaque request tokens because collision risk is negligible at typical application scales.",
          "Generating identifiers with a cryptographically strong random source matters more than the exact string layout; weak randomness defeats the purpose of a UUID.",
        ],
      },
      {
        h2: "When UUIDs are the wrong tool",
        paragraphs: [
          "Sequential numeric IDs can be simpler for human-facing URLs and small databases. UUIDs trade readability for decentralization: multiple services can mint IDs without a single coordinator.",
          "If you need time-ordered identifiers at high throughput, research time-sortable alternatives and your database's indexing behavior before committing to a format.",
        ],
      },
      {
        h2: "Testing workflows",
        paragraphs: [
          "Use fresh UUIDs in automated tests to avoid collisions when suites run in parallel. Pair them with factories or fixtures so failures stay easy to reproduce.",
          "Document whether your API accepts any UUID-shaped string or validates version and variant bits strictly.",
        ],
      },
    ],
  },
  "api-tester": {
    pageTitle: "About the API tester",
    sections: [
      {
        h2: "Quick requests from the browser",
        paragraphs: [
          "Exploratory calls help you validate headers, methods, and bodies before you wire the same request into application code. Seeing status codes, response headers, and bodies together shortens the feedback loop during integrations.",
          "Keep in mind that browsers enforce CORS policies. A request that works in curl may be blocked from a public website origin unless the target API explicitly allows it.",
        ],
      },
      {
        h2: "Credentials and safety",
        paragraphs: [
          "Prefer short-lived tokens and staging hosts when testing. Revoke or rotate anything you paste into a shared machine after debugging is complete.",
          "Never send production passwords through untrusted networks without TLS, and avoid logging full bearer tokens in analytics or error trackers.",
        ],
      },
      {
        h2: "Reproducibility",
        paragraphs: [
          "Capture the exact URL, headers, and body that reproduced an issue so teammates can replay it. Small differences in content-type or trailing slashes often explain mysterious 404 or 415 responses.",
          "When responses are large, summarize structure and key headers instead of pasting megabytes into chat.",
        ],
      },
    ],
  },
  "regex-tester": {
    pageTitle: "About the regex tester",
    sections: [
      {
        h2: "JavaScript regular expression dialect",
        paragraphs: [
          "Regular expression engines differ across languages. This tester follows JavaScript semantics, which matters for flags like unicode sets and dotAll behavior that are not identical in Python or PCRE.",
          "Use it to prototype patterns you will embed in front-end code or Node services so the behavior you see matches runtime expectations.",
        ],
      },
      {
        h2: "Readability and maintenance",
        paragraphs: [
          "Dense regex can be impossible to audit later. Comment complex patterns in source, split them into named pieces where your language supports it, and add examples of both matching and non-matching strings in tests.",
          "Catastrophic backtracking is a real risk: test inputs that are long or adversarial when your pattern runs on user content.",
        ],
      },
      {
        h2: "Security note",
        paragraphs: [
          "Never run unbounded user-supplied regex against unbounded input in production without safeguards; some patterns can exhaust CPU with pathological strings.",
          "Treat regex as code: review changes in pull requests like any other logic.",
        ],
      },
    ],
  },
  "sql-formatter": {
    pageTitle: "About the SQL formatter",
    sections: [
      {
        h2: "Readable queries for humans",
        paragraphs: [
          "Well-indented SQL is easier to review in migrations, analytics notebooks, and BI exports. Consistent capitalization and line breaks help reviewers spot missing joins, accidental cartesian products, and suspicious literals.",
          "Formatting does not change semantics, but it can reveal mistakes that hide inside minified one-liners copied from generated code.",
        ],
      },
      {
        h2: "Dialect differences",
        paragraphs: [
          "SQL is not fully portable. Functions, types, and vendor-specific hints differ between engines. A formatter cannot replace a linter that understands your dialect.",
          "After formatting, run your query through an explain plan on the target database before optimizing indexes or shipping changes.",
        ],
      },
      {
        h2: "Collaboration",
        paragraphs: [
          "Agree on basic style rules in your repository so diffs stay small. Pair automated formatting with code review guidelines for naming, comments, and parameterization.",
          "Parameterized queries remain the primary defense against injection; formatting is not a security boundary.",
        ],
      },
    ],
  },
  "html-beautifier": {
    pageTitle: "About the HTML beautifier",
    sections: [
      {
        h2: "Structure you can navigate",
        paragraphs: [
          "Minified HTML saves bytes on the wire but is painful to edit. Beautification restores indentation and line breaks so you can compare templates, diagnose mismatched tags, or prepare snippets for documentation.",
          "Always keep a canonical source file in your repository rather than relying on beautified output as the only copy of a template.",
        ],
      },
      {
        h2: "Whitespace-sensitive contexts",
        paragraphs: [
          "Inside pre, textarea, or inline formatting, extra whitespace can change rendering. After beautifying, reload affected pages in a browser to confirm layout.",
          "Some frameworks strip whitespace during compilation; understand your build pipeline before mass-reformatting generated artifacts.",
        ],
      },
      {
        h2: "Accessibility reminders",
        paragraphs: [
          "Readable markup makes it easier to verify heading order, labels, and landmarks. Pair visual checks with automated accessibility scans for serious projects.",
          "Semantic elements communicate intent to assistive technologies better than div soup, even when both look identical with CSS.",
        ],
      },
    ],
  },
  "css-minifier": {
    pageTitle: "About the CSS minifier",
    sections: [
      {
        h2: "Smaller stylesheets for production",
        paragraphs: [
          "Minification removes comments and redundant whitespace, and can rewrite values where safe. Smaller CSS improves download time and parse cost on constrained devices.",
          "Ship minified assets to users while keeping readable source maps and originals in version control for debugging.",
        ],
      },
      {
        h2: "What minifiers do not fix",
        paragraphs: [
          "Dead rule elimination and deduplication are separate optimizations. A minifier will not automatically redesign your cascade or remove unused frameworks unless paired with other tooling.",
          "Test responsive breakpoints after minification when you rely on fragile comment hacks—most minifiers strip comments by default.",
        ],
      },
      {
        h2: "Deployment hygiene",
        paragraphs: [
          "Set long cache lifetimes on hashed filenames and invalidate through filenames rather than manual purges when possible.",
          "Document which build step owns minification so developers do not accidentally double-minify or lose source maps.",
        ],
      },
    ],
  },
  "js-minifier": {
    pageTitle: "About the JavaScript minifier",
    sections: [
      {
        h2: "Production bundles",
        paragraphs: [
          "Minified JavaScript reduces payload size and can apply safe transforms like renaming local symbols when configured. That speeds up parsing and execution on mobile networks.",
          "Modern applications usually minify inside bundlers; this standalone tool helps when you evaluate a small snippet or compare output sizes quickly.",
        ],
      },
      {
        h2: "Correctness first",
        paragraphs: [
          "Aggressive transforms can break code that depends on eval, dynamic property access, or stringified function names. Always run your test suite against the minified build for critical services.",
          "Source maps are essential for investigating production errors without leaking full originals to users—configure them thoughtfully.",
        ],
      },
      {
        h2: "Security context",
        paragraphs: [
          "Minified third-party code is harder to read, which is why supply-chain reviews matter. Prefer dependencies you can audit and pin versions with lockfiles.",
          "Never paste untrusted JavaScript into minifiers on machines with sensitive credentials unless you understand the execution environment.",
        ],
      },
    ],
  },
  "timestamp-converter": {
    pageTitle: "About the timestamp converter",
    sections: [
      {
        h2: "Unix time and time zones",
        paragraphs: [
          "Unix timestamps count seconds or milliseconds since 1970-01-01 UTC. Converting to human-readable dates requires knowing whether your source is in seconds or milliseconds and which time zone should display for humans.",
          "Always store absolute instants in UTC at the boundary of your system and convert to local zones at presentation time when possible.",
        ],
      },
      {
        h2: "Common debugging scenarios",
        paragraphs: [
          "Off-by-one thousand errors happen when APIs mix seconds and milliseconds. If a date looks decades wrong, check the unit first before chasing logic bugs.",
          "Daylight saving transitions create duplicate or skipped local clock times; represent recurring events with explicit rules rather than naive offsets.",
        ],
      },
      {
        h2: "Interoperability",
        paragraphs: [
          "ISO8601 strings include offsets that make intent clearer than bare integers. Prefer them in new JSON APIs while documenting legacy integer fields until clients migrate.",
          "Log correlation benefits from consistent precision: pick millisecond or microsecond resolution team-wide for trace IDs tied to timestamps.",
        ],
      },
    ],
  },
  "image-compressor": {
    pageTitle: "About the image compressor",
    sections: [
      {
        h2: "Balancing size and visual quality",
        paragraphs: [
          "Large hero images and thumbnails slow down pages and increase bandwidth bills. Compression reduces file size by trading bits humans rarely notice for fewer bytes on the wire.",
          "Always compare before-and-after visually, especially for graphics with sharp edges, text overlays, or transparency.",
        ],
      },
      {
        h2: "Formats matter",
        paragraphs: [
          "Photographs often compress well as JPEG or modern AVIF/WebP depending on your CDN. UI screenshots with flat colors may be smaller as PNG or lossless WebP.",
          "Avoid re-compressing the same JPEG repeatedly; generational loss accumulates.",
        ],
      },
      {
        h2: "Workflow integration",
        paragraphs: [
          "Automate compression in your static asset pipeline so authors do not hand-tune every upload. Provide maximum dimension and quality guardrails in your CMS when non-technical users upload media.",
          "Keep originals in an internal archive when future redesigns might need higher resolution masters.",
        ],
      },
    ],
  },
  "image-converter": {
    pageTitle: "About the image converter",
    sections: [
      {
        h2: "Choosing the right output format",
        paragraphs: [
          "JPEG is ubiquitous for photos but lacks transparency. PNG preserves transparency and sharp edges but can be heavy for large photos. WebP often offers a good compromise where supported.",
          "Match the format to the channel where the image will appear: social platforms, print vendors, and mobile apps each have different recommendations.",
        ],
      },
      {
        h2: "Color profiles and gamut",
        paragraphs: [
          "Converting between formats can change colors if color profiles are embedded or stripped. Proof on calibrated displays when brand fidelity matters.",
          "Wide-gamut sources may look dull after conversion if the pipeline flattens to sRGB unexpectedly.",
        ],
      },
      {
        h2: "Batch discipline",
        paragraphs: [
          "Name files predictably and store conversion settings alongside exports so teammates can reproduce marketing assets months later.",
          "Document whether SEO-critical images require lossless exports to avoid text in screenshots becoming fuzzy.",
        ],
      },
    ],
  },
  "background-remover": {
    pageTitle: "About the background remover",
    sections: [
      {
        h2: "Subject separation for creatives",
        paragraphs: [
          "Removing backgrounds is a staple for product photos, marketing collages, and presentation decks. Automated models work best on clear foregrounds with contrast against the backdrop.",
          "Expect to touch up hair strands or glass reflections manually in professional work; fully automatic results are a starting point, not always the final asset.",
        ],
      },
      {
        h2: "Transparency and export",
        paragraphs: [
          "PNG preserves alpha channels for overlays; JPEG cannot. Choose formats based on where the asset will be composited next.",
          "Feathered edges can look haloed on dark themes—preview on multiple backgrounds before publishing.",
        ],
      },
      {
        h2: "Ethics and consent",
        paragraphs: [
          "Only process images you have rights to use. Portrait manipulation carries additional consent and policy considerations on many platforms.",
          "Avoid creating misleading depictions of people, products, or documents; many jurisdictions and app stores regulate deceptive imagery.",
        ],
      },
    ],
  },
  "resize-image": {
    pageTitle: "About resizing images",
    sections: [
      {
        h2: "Exact dimensions for layouts",
        paragraphs: [
          "Design systems specify thumbnail sizes, avatar circles, and card images. Resizing to exact pixel dimensions prevents browsers from scaling unpredictably and reduces layout shift when dimensions are known ahead of time.",
          "Maintain aspect ratio unless you intentionally crop; stretched faces and logos look unprofessional quickly.",
        ],
      },
      {
        h2: "Retina and responsive sets",
        paragraphs: [
          "Serving multiple resolutions via srcset lets crisp displays get more pixels without wasting bandwidth on low-density screens.",
          "Pair resized raster assets with vector logos when possible so icons stay sharp at any zoom.",
        ],
      },
      {
        h2: "Quality control",
        paragraphs: [
          "Upsampling cannot invent real detail; enlarging small sources produces softness. Start from the highest-quality master you have.",
          "After resizing text-heavy screenshots, zoom to 100% to confirm small type remains legible.",
        ],
      },
    ],
  },
  "pdf-to-image": {
    pageTitle: "About PDF to image conversion",
    sections: [
      {
        h2: "Slides and previews",
        paragraphs: [
          "Turning PDF pages into images helps embed previews in wikis, chat apps that do not render PDFs inline, or social posts with strict image-only uploads.",
          "Pick a resolution that matches the display context: thumbnails need fewer pixels than print-ready artwork.",
        ],
      },
      {
        h2: "Fonts and rendering",
        paragraphs: [
          "Rasterization depends on font embedding. Missing fonts can substitute alternatives and change line breaks compared to desktop viewers.",
          "When fidelity matters, open the PDF in an authoritative viewer first to confirm it looks correct before converting.",
        ],
      },
      {
        h2: "Archiving",
        paragraphs: [
          "Images lose selectable text unless you run OCR separately. Keep the original PDF when searchability or copy-paste matters.",
          "Large multi-page conversions can be heavy on memory; process in batches for big documents.",
        ],
      },
    ],
  },
  "image-to-pdf": {
    pageTitle: "About images to PDF",
    sections: [
      {
        h2: "Combining scans and photos",
        paragraphs: [
          "Many workflows require a single PDF packet: signed forms, receipts, or design exports. Ordering pages logically before conversion saves recipients from rearranging files manually.",
          "Set margins and page sizes consistently when the PDF will be printed to avoid unexpected scaling at the office printer.",
        ],
      },
      {
        h2: "Compression trade-offs",
        paragraphs: [
          "Embedded JPEGs inside PDFs inherit compression artifacts. Prefer higher-quality sources when the PDF is an archival master.",
          "If file size is critical, tune compression deliberately rather than chaining multiple lossy steps blindly.",
        ],
      },
      {
        h2: "Accessibility",
        paragraphs: [
          "Pure image PDFs are harder for screen readers unless you add text layers via OCR. For public documents, follow your organization's accessibility checklist.",
          "Descriptive file names help everyone, not only assistive technology users.",
        ],
      },
    ],
  },
  "merge-pdf": {
    pageTitle: "About merging PDFs",
    sections: [
      {
        h2: "Reliable packet assembly",
        paragraphs: [
          "Merging combines multiple PDFs into one linear document. Confirm page order against the cover sheet requirements of banks, universities, or government portals before uploading.",
          "Bookmarks and outlines may not survive merges the way you expect; reopen the result to verify navigation aids when your audience relies on them.",
        ],
      },
      {
        h2: "File size and attachments",
        paragraphs: [
          "Some merged documents balloon because every source embeds identical font subsets. Specialized PDF optimizers can deduplicate resources when that becomes a problem.",
          "Email gateways still enforce attachment limits; know your recipient's cap before sending a merged archive.",
        ],
      },
      {
        h2: "Legal and record-keeping",
        paragraphs: [
          "Electronic submissions often require unmodified originals. When in doubt, keep both the per-file exports and the merged packet with a checksum note in your records.",
          "Do not merge unrelated confidential documents if that increases exposure when sharing a single link.",
        ],
      },
    ],
  },
  "split-pdf": {
    pageTitle: "About splitting PDFs",
    sections: [
      {
        h2: "Extracting chapters or exhibits",
        paragraphs: [
          "Splitting isolates page ranges into new files. That helps when only one chapter should be emailed, or when a portal rejects files over a page count.",
          "Double-check inclusive versus exclusive range conventions in the tool you use; off-by-one errors are common under deadline pressure.",
        ],
      },
      {
        h2: "Annotations and forms",
        paragraphs: [
          "Interactive form fields and comments may behave differently after splitting depending on the library. Test the extracted file in the same viewer your audience uses.",
          "Flattening might be required before some government uploads, which changes editability—document that choice for teammates.",
        ],
      },
      {
        h2: "Naming and version control",
        paragraphs: [
          "Use descriptive filenames like contract-appendix-B-pages12-18.pdf so support threads stay readable.",
          "Binary PDFs diff poorly in Git; store them in artifact storage or LFS when teams collaborate frequently.",
        ],
      },
    ],
  },
};

/** @param {string} slug */
export function getToolEditorial(slug) {
  return EDITORIAL[slug] ?? null;
}

/** Short paragraph for meta description enrichment (plain text). */
export function getToolEditorialSummary(slug) {
  const doc = EDITORIAL[slug];
  if (!doc) return null;
  const first = doc.sections[0]?.paragraphs[0];
  const second = doc.sections[0]?.paragraphs[1];
  if (first && second) return `${first} ${second}`.slice(0, 320);
  return first ? first.slice(0, 320) : null;
}
