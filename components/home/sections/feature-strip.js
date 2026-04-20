import { SectionWrapper } from "../../ui/SectionWrapper";

// Using lucide-style SVG outlines to match the screenshot icons
const features = [
  {
    title: "Lightning Fast",
    body: "Process your files instantly with optimized performance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "100% Secure",
    body: "Your files are processed locally and never stored.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Works Anywhere",
    body: "Fully responsive design for all devices.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];

export function FeatureStrip() {
  return (
    <SectionWrapper className="border-b border-gray-100 bg-white" padded="small">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center py-4 text-center">
            {/* Icon circle — amber tinted, small */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-500">
              {f.icon}
            </div>
            <h3 className="mt-3 text-[13px] font-bold text-gray-900">{f.title}</h3>
            <p className="mt-1 max-w-[160px] text-[11px] leading-relaxed text-gray-400">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}