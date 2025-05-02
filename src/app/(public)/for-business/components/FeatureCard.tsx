import type React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, TrendingUp, PieChart, CheckCircle2, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bulletPoints: string[];
  ctaText: string;
  ctaLink: string;
  contactNumber?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  bulletPoints,
  ctaText,
  ctaLink,
  contactNumber,
}: FeatureCardProps) {
  const icons: Record<string, React.ReactNode> = {
    rocket: <Rocket className="h-6 w-6 text-black" />,
    'trending-up': <TrendingUp className="h-6 w-6 text-black" />,
    'pie-chart': <PieChart className="h-6 w-6 text-black" />,
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="rounded-lg border bg-white text-black shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            {icons[icon] || <Rocket className="h-6 w-6 text-white" />}
          </div>
          <h3 className="text-xl font-semibold text-black">{title}</h3>
        </div>

        <p className="text-black mb-6">{description}</p>

        <ul className="space-y-2 mb-6">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-black mt-0.5 shrink-0" />
              <span className="text-black">{point}</span>
            </li>
          ))}
        </ul>

        {contactNumber && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-black">
              <Phone className="h-4 w-4 text-black" />
              <span>{contactNumber}</span>
            </div>
            <h6>Үргэлж нээлттэй</h6>
          </div>
        )}
      </div>
    </motion.section>
  );
}
