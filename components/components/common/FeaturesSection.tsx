import { Zap, Shield, Smartphone } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process your files instantly with optimized performance',
      color: '#FFC107',
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your files are processed locally and never stored',
      color: '#FFC107',
    },
    {
      icon: Smartphone,
      title: 'Works Anywhere',
      description: 'Fully responsive design for all devices',
      color: '#FFC107',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
