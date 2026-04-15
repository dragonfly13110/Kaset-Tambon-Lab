import React from 'react';
import { Sparkles } from '../Icons';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle, className }) => (
  <div className={`mb-8 text-center ${className}`}>
    {eyebrow && (
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-3 py-1 text-[11px] font-medium text-emerald-300">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        <span className="uppercase tracking-wide">{eyebrow}</span>
      </div>
    )}
    <h2 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-2 max-w-3xl text-sm text-slate-400 md:text-base">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
