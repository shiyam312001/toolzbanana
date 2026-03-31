import Link from "next/link";
import {
  TOOL_CATEGORIES,
} from "../../components/tools-data";
import JsonFormatterTool from "../../components/dev-tools/JsonFormatterTool";
import JwtDecoderTool from "../../components/dev-tools/JwtDecoderTool";
import Base64EncodeTool from "../../components/dev-tools/Base64EncodeTool";
import Base64DecodeTool from "../../components/dev-tools/Base64DecodeTool";
import UuidGeneratorTool from "../../components/dev-tools/UuidGeneratorTool";
import ApiTesterTool from "../../components/dev-tools/ApiTesterTool";
import RegexTesterTool from "../../components/dev-tools/RegexTesterTool";
import SqlFormatterTool from "../../components/dev-tools/SqlFormatterTool";
import HtmlBeautifierTool from "../../components/dev-tools/HtmlBeautifierTool";
import CssMinifierTool from "../../components/dev-tools/CssMinifierTool";
import JsMinifierTool from "../../components/dev-tools/JsMinifierTool";
import TimestampConverterTool from "../../components/dev-tools/TimestampConverterTool";

const DEV_CATEGORY =
  TOOL_CATEGORIES.find((cat) => cat.id === "developer") ?? TOOL_CATEGORIES[0];

const DEV_TOOL_COMPONENTS = {
  "json-formatter": JsonFormatterTool,
  "jwt-decoder": JwtDecoderTool,
  "base64-encode": Base64EncodeTool,
  "base64-decode": Base64DecodeTool,
  "uuid-generator": UuidGeneratorTool,
  "api-tester": ApiTesterTool,
  "regex-tester": RegexTesterTool,
  "sql-formatter": SqlFormatterTool,
  "html-beautifier": HtmlBeautifierTool,
  "css-minifier": CssMinifierTool,
  "js-minifier": JsMinifierTool,
  "timestamp-converter": TimestampConverterTool,
};

const SITE_URL = "https://toolzbanana.com";

export const metadata = {
  title: "Developer Tools",
  description:
    "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    url: `${SITE_URL}/tools`,
  },
  twitter: {
    title: "Developer Tools · ToolzBanana",
    description:
      "Explore developer utilities: JSON formatter, JWT decoder, Base64 tools, UUID generator, API tester, regex tester, SQL formatter, and more.",
  },
};

export default function ToolsDashboardPage() {
  const tools = DEV_CATEGORY.tools ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:py-10">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Developer Toolkit
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">
          Developer Tools Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-slate-500">
          A focused collection of everyday developer utilities — JSON,
          encoding, APIs, regex, SQL, and more — in a clean, minimal interface.
        </p>
      </header>

      <section className="mt-6 flex flex-col gap-6 lg:flex-row">
        <aside className="order-last w-full lg:order-first lg:w-56">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Tools
            </p>
            <nav aria-label="Developer tool list" className="space-y-1 text-sm">
              <ul className="space-y-1">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="flex items-center justify-between rounded-full px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                      aria-label={`Open ${tool.name}`}
                    >
                      <span className="truncate">{tool.name}</span>
                      {tool.badge && (
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-500">
                          {tool.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <section className="order-first grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Component = DEV_TOOL_COMPONENTS[tool.slug];
            if (!Component) return null;
            return <Component key={tool.slug} />;
          })}
        </section>
      </section>
    </main>
  );
}

