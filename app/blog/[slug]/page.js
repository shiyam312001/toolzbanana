import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "../../../lib/site-config";
import { getBlogPost, getAllBlogSlugs } from "../../../lib/blog-posts";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = typeof p?.slug === "string" ? p.slug : "";
  const post = getBlogPost(slug);
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} · ToolzBanana`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · ToolzBanana`,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const p = await params;
  const slug = typeof p?.slug === "string" ? p.slug : "";
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 mb-2">
            <Link href="/blog" className="text-yellow-700 hover:underline">
              Blog
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            {post.date} · {post.readMinutes} min read
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.description}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-lg prose-gray max-w-none">
        {post.sections.map((sec) => (
          <section key={sec.heading} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{sec.heading}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={`${sec.heading}-${i}`} className="text-gray-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <Link
          href="/blog"
          className="inline-flex text-yellow-700 font-medium hover:underline"
        >
          ← All articles
        </Link>
      </div>
    </article>
  );
}
