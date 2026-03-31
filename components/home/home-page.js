import { Hero } from "./sections/hero";
import { PopularTools } from "./sections/popular-tools";
import { ToolCategories } from "./sections/tool-categories";
import { TrendingTools } from "./sections/trending-tools";
import { HowItWorks } from "./sections/how-it-works";
import { WhyUse } from "./sections/why-use";
import { LatestArticles } from "./sections/latest-articles";
import { Footer } from "./sections/footer";

export function HomePage() {
  return (
    <main>
      <Hero />
      <PopularTools />
      <ToolCategories />
      <TrendingTools />
      <HowItWorks />
      <WhyUse />
      <LatestArticles />
      <Footer />
    </main>
  );
}

