/**
 * Canonical origin for metadata, sitemap, robots, and JSON-LD.
 * Override on Vercel with NEXT_PUBLIC_SITE_URL when you attach a custom domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL
    ? String(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "")
    : "https://toolzbanana.vercel.app"
);
