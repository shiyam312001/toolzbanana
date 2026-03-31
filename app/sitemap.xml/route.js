import { TOOL_CATEGORIES } from "../../components/tools-data";

const SITE_URL = "https://toolzbanana.com";

function toISODate(d) {
  // YYYY-MM-DD
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const today = toISODate(new Date());

  const toolSlugs = TOOL_CATEGORIES.flatMap((cat) =>
    cat.tools.map((t) => t.slug),
  );

  const urls = [
    { loc: `${SITE_URL}/`, priority: 1.0 },
    { loc: `${SITE_URL}/tools`, priority: 0.9 },
    { loc: `${SITE_URL}/privacy-policy`, priority: 0.3 },
    { loc: `${SITE_URL}/terms-and-conditions`, priority: 0.3 },
    ...toolSlugs.map((slug) => ({
      loc: `${SITE_URL}/tools/${slug}`,
      priority: 0.8,
    })),
  ];

  const uniqueUrls = Array.from(new Map(urls.map((u) => [u.loc, u])).values());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

