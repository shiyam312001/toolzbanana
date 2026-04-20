import { Hero } from "./sections/hero";
import { FeatureStrip } from "./sections/feature-strip";
import { PopularTools } from "./sections/popular-tools";
import { ToolCategories } from "./sections/tool-categories";
import { TrendingTools } from "./sections/trending-tools";
import { HowItWorks } from "./sections/how-it-works";
import { WhyUse } from "./sections/why-use";
import { LatestArticles } from "./sections/latest-articles";
import { Footer } from "./sections/footer";
import { AdBlock } from "../ui/AdBlock";

export function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureStrip />
      <section className="py-8 lg:py-10">
        <div className="ds-container">
          <AdBlock size="728x90" />
        </div>
      </section>
      <PopularTools />
      <ToolCategories />
      <TrendingTools />
      <HowItWorks />
      <section className="py-6 lg:py-8">
        <div className="ds-container">
          <AdBlock size="728x90" />
        </div>
      </section>
      <Footer />
    </main>
  );
}

