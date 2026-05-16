import Link from "next/link";
import { articles } from "../home-data";
import { Card } from "../../ui/Card";
import { SectionWrapper } from "../../ui/SectionWrapper";

export function LatestArticles() {
  return (
    <SectionWrapper id="articles">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="ds-section-title">Latest articles</h2>
          <p className="ds-section-subtitle">
            Updates, tips, and quick guides.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-sm font-semibold text-ds-primary hover:text-ds-primary-hover"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((a) => (
          <Card key={a.title} className="flex flex-col overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-ds-bg-subtle via-ds-bg-warm to-ds-bg" />
            <div className="flex flex-1 flex-col p-5">
              <div className="inline-flex w-fit rounded-full bg-ds-bg-subtle px-3 py-1 text-xs font-semibold text-ds-text-secondary">
                {a.tag}
              </div>
              <h3 className="font-heading mt-3 text-base font-bold text-ds-text">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ds-text-muted">
                {a.excerpt}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
