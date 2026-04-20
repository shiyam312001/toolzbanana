import { Footer } from "../../components/home/sections/footer";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionWrapper } from "../../components/ui/SectionWrapper";

const SITE_URL = "https://toolzbanana.com";

const VALUE_CARDS = [
  {
    title: "Fast & Simple",
    body: "Our tools are designed to work instantly without complicated setups.",
  },
  {
    title: "Secure & Private",
    body: "Files are processed securely and we never store your data.",
  },
  {
    title: "Always Free",
    body: "Core tools are free with no hidden costs or surprise limitations.",
  },
  {
    title: "Community Driven",
    body: "We continuously improve tools based on real user feedback.",
  },
];

export const metadata = {
  title: "About",
  description: "Learn more about ToolzBanana and our mission.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <SectionWrapper padded="large">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-ds-primary-soft text-3xl">
              🍌
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-ds-text md:text-4xl">
              About ToolzBanana
            </h1>
            <p className="mt-3 text-base text-ds-text-secondary">
              Your one-stop platform for free online tools.
            </p>
          </div>

          <Card className="mt-8 p-6 md:p-7">
            <h2 className="font-heading text-2xl font-bold text-ds-text">Our Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-ds-text-secondary">
              At ToolzBanana, we believe productivity tools should be accessible
              to everyone. We build practical tools for daily tasks — from PDF
              and image utilities to developer workflows — with speed, privacy,
              and simplicity at the core.
            </p>
          </Card>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {VALUE_CARDS.map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="font-heading text-xl font-bold text-ds-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ds-text-secondary">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>

          <Card className="mt-5 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 md:p-7">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-heading text-4xl font-extrabold text-ds-primary">60+</div>
                <div className="mt-1 text-xs text-ds-text-muted">Free tools</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-extrabold text-ds-primary">500K+</div>
                <div className="mt-1 text-xs text-ds-text-muted">Monthly users</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-extrabold text-ds-primary">5M+</div>
                <div className="mt-1 text-xs text-ds-text-muted">Files processed</div>
              </div>
            </div>
          </Card>

          <Card className="mt-5 p-7 text-center">
            <h3 className="font-heading text-2xl font-bold text-ds-text">Get in Touch</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ds-text-secondary">
              Have a suggestion for a new tool or found a bug? We would love to
              hear from you.
            </p>
            <Button className="mt-4">Contact Us</Button>
          </Card>
        </div>
      </SectionWrapper>
      <Footer />
    </main>
  );
}
