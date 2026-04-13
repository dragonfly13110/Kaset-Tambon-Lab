import React from 'react';
import { Sparkles } from '../Icons';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle, className }) => (
  <div className={`mb-6 text-center ${className}`}>
    {eyebrow && (
      <div className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        <span className="uppercase tracking-wide">{eyebrow}</span>
      </div>
    )}
    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl">{title}</h2>
    {subtitle && (
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
