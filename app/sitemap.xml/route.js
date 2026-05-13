import { TOOL_CATEGORIES } from "../../components/tools-data";
import { SITE_URL } from "../../lib/site-config";
import { getAllBlogSlugs } from "../../lib/blog-posts";

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const today = toISODate(new Date());

  const toolSlugs = TOOL_CATEGORIES.flatMap((cat) =>
    cat.tools.map((t) => t.slug),
  );

  const blogSlugs = getAllBlogSlugs();

  const urls = [
    { loc: `${SITE_URL}/`, priority: 1.0, changefreq: "weekly" },
    { loc: `${SITE_URL}/tools`, priority: 0.9, changefreq: "weekly" },
    { loc: `${SITE_URL}/categories`, priority: 0.85, changefreq: "weekly" },
    { loc: `${SITE_URL}/about`, priority: 0.6, changefreq: "monthly" },
    { loc: `${SITE_URL}/contact-us`, priority: 0.6, changefreq: "monthly" },
    { loc: `${SITE_URL}/blog`, priority: 0.75, changefreq: "weekly" },
    ...blogSlugs.map((slug) => ({
      loc: `${SITE_URL}/blog/${slug}`,
      priority: 0.65,
      changefreq: "monthly",
    })),
    { loc: `${SITE_URL}/privacy-policy`, priority: 0.4, changefreq: "yearly" },
    { loc: `${SITE_URL}/terms-of-service`, priority: 0.35, changefreq: "yearly" },
    { loc: `${SITE_URL}/terms-and-conditions`, priority: 0.35, changefreq: "yearly" },
    { loc: `${SITE_URL}/tools/code`, priority: 0.75, changefreq: "weekly" },
    { loc: `${SITE_URL}/tools/image`, priority: 0.75, changefreq: "weekly" },
    { loc: `${SITE_URL}/tools/pdf`, priority: 0.75, changefreq: "weekly" },
    ...toolSlugs.map((slug) => ({
      loc: `${SITE_URL}/tools/${slug}`,
      priority: 0.8,
      changefreq: "weekly",
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
    <changefreq>${u.changefreq}</changefreq>
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
