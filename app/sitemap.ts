import type { MetadataRoute } from "next";
import { TOOL_CATEGORIES } from "../components/tools-data";
import { BLOG_POSTS } from "../lib/blog-posts";
import { SITE_URL } from "../lib/site-config";

const TOOL_HUB_PATHS = ["/tools/code", "/tools/image", "/tools/pdf"];

const SITE_LAST_MODIFIED = new Date("2026-06-04");

function toAbsolute(path: string): string {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: toAbsolute("/"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toAbsolute("/tools"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: toAbsolute("/categories"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: toAbsolute("/blog"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: toAbsolute("/about"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: toAbsolute("/contact-us"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: toAbsolute("/privacy-policy"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: toAbsolute("/terms-of-service"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: toAbsolute("/cookie-policy"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const toolHubPages: MetadataRoute.Sitemap = TOOL_HUB_PATHS.map((path) => ({
    url: toAbsolute(path),
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOL_CATEGORIES.flatMap(
    (category) =>
      category.tools.map((tool) => ({
        url: toAbsolute(`/tools/${tool.slug}`),
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: toAbsolute(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const allEntries = [
    ...staticPages,
    ...toolHubPages,
    ...toolPages,
    ...blogPages,
  ];

  return Array.from(
    new Map(allEntries.map((entry) => [entry.url, entry])).values()
  );
}