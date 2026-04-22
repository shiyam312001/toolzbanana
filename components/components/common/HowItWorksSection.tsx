import { MousePointerClick, Settings, Download } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: MousePointerClick,
      color: '#8B5CF6',
      title: 'Choose Your Tool',
      desc: 'Browse our collection and select the tool you need from 60+ options',
    },
    {
      step: 2,
      icon: Settings,
      color: '#EC4899',
      title: 'Upload & Configure',
      desc: 'Upload your file or input data and customize settings as needed',
    },
    {
      step: 3,
      icon: Download,
      color: '#FFC107',
      title: 'Download Results',
      desc: 'Process instantly and download your results in seconds',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="text-[#111] mb-3"
            style={{ fontSize: '2rem', fontWeight: 700 }}
          >
            How It Works
          </h2>
          <p
            className="text-[#666] max-w-md mx-auto"
            style={{ fontSize: '1rem' }}
          >
            Get things done in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[67%] -translate-x-1/2 w-full max-w-[20%] h-0.5 bg-gradient-to-r from-[#8B5CF6]/20 via-[#EC4899]/20 to-[#FFC107]/20" />
          <div className="hidden md:block absolute top-8 left-[33%] -translate-x-1/2 w-full max-w-[20%] h-0.5 bg-gradient-to-r from-[#8B5CF6]/20 via-[#EC4899]/20 to-[#FFC107]/20" />

          {steps.map((s) => {
            const StepIcon = s.icon;
            return (
              <div key={s.step} className="text-center relative">
                <div className="relative inline-flex mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    <StepIcon className="w-7 h-7" style={{ color: s.color }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
                    style={{
                      backgroundColor: s.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {s.step}
                  </div>
                </div>
                <h3
                  className="text-[#111] mb-2"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[#666] max-w-xs mx-auto"
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
