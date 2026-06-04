import { NotFound } from "../components/pages/NotFound";

export const metadata = {
  title: "Page not found",
  description: "The page you requested is not available on ToolzBanana.",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
