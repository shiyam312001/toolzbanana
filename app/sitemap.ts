import type { MetadataRoute } from "next";
import { TOOL_CATEGORIES } from "../components/tools-data";
import { BLOG_POSTS } from "../lib/blog-posts";
import { SITE_URL } from "../lib/site-config";

const TOOL_HUB_PATHS = ["/tools/code", "/tools/image", "/tools/pdf"];

function toAbsolute(path: string): string {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: toAbsolute("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: toAbsolute("/tools"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: toAbsolute("/categories"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: toAbsolute("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: toAbsolute("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: toAbsolute("/contact-us"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const toolHubPages: MetadataRoute.Sitemap = TOOL_HUB_PATHS.map((path) => ({
    url: toAbsolute(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOL_CATEGORIES.flatMap((category) =>
    category.tools.map((tool) => ({
      url: toAbsolute(`/tools/${tool.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  );

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: toAbsolute(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const allEntries = [...staticPages, ...toolHubPages, ...toolPages, ...blogPages];

  // Deduplicate by canonical URL in case multiple data sources overlap.
  return Array.from(new Map(allEntries.map((entry) => [entry.url, entry])).values());
}
