import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
}

export function SectionHeader({ title, subtitle, center }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-3 ${center ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-gold-500" />
        <span className="h-px w-16 bg-wood-300" />
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
