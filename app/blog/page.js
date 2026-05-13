import Link from "next/link";
import { SITE_URL } from "../../lib/site-config";
import { BLOG_POSTS } from "../../lib/blog-posts";

export const metadata = {
  title: "Articles & guides",
  description:
    "Editorial guides from ToolzBanana on browser-based tools, privacy-minded workflows, PDF and image processing, and developer utilities.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Articles & guides · ToolzBanana",
    description:
      "Editorial guides on browser-based tools, privacy-minded workflows, and developer utilities.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="max-w-7xlmx-auto">
          <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-2">
            Blog
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Articles & guides
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Long-form articles complement our free tools. Here we explain how
            local browser processing works, how to stay safe with tokens and
            files, and how to build reliable PDF and image workflows without
            cluttering your desktop.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xlmx-auto space-y-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:border-yellow-300 transition-colors"
            >
              <p className="text-xs text-gray-500 mb-2">
                {post.date} · {post.readMinutes} min read
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-yellow-700 font-medium hover:underline"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
