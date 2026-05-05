import { useState, useEffect } from 'react';
import Link from "next/link";
import { Sparkles, ArrowRight, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection({ categories = [] }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    'Search any tool..."PDF Compressor"',
    'Search any tool..."Image Resizer"',
    'Search any tool..."JSON Formatter"',
    'Search any tool..."QR Code Generator"',
    'Search any tool..."Password Generator"',
    'Search any tool..."Background Remover"',
    'Search any tool..."Word Counter"',
    'Search any tool..."Base64 Encoder"',
    'Search any tool..."Hash Generator"',
    'Search any tool..."URL Encoder"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-orange-100 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 text-yellow-800 px-4 py-2 rounded-full bg-[#fbfbfb]">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">60+ Free Tools Available</span>
        </div>

        <h1
          className="text-[#111] mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          Free Online Tools Without Login - PDF, Image &amp; SEO Tools | ToolzBanana
        </h1>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-[15px]">
          ToolzBanana is an all in one online tools website with fast and free productivity tools website access for everyone in India. Use powerful tools in seconds with no login and no signup.
        </p>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-[#FFC107]/10 border border-[#FFC107]/20 p-1.5">
            <div className="flex items-center flex-1 px-4">
              <Search className="w-5 h-5 text-[#999] mr-3 shrink-0" />
              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                className="bg-transparent border-none outline-none w-full text-[#111] placeholder-[#999] py-2"
                style={{ fontSize: '1rem' }}
              />
            </div>
            <button
              className="bg-[#FFC107] text-[#111] px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-[#FFD54F] transition-all shrink-0"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className="flex items-center gap-1.5 bg-white border border-border rounded-full px-3.5 py-1.5 shadow-sm hover:shadow-md hover:border-[#FFC107]/30 transition-all"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
              }}
            >
              <cat.icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
              <span className="text-[#444]">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools">
            <Button variant="primary" size="md">
              Browse all Tools
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="secondary" size="md">
              View Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
