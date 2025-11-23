
import React from 'react';
import { Sparkles } from '../Icons';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle, align = "center", className }) => (
  <div className={`mb-10 text-center md:mb-16 ${className}`}>
    {eyebrow && (
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-agri-50 px-3 py-1 text-xs font-medium text-agri-700 ring-1 ring-inset ring-agri-600/20">
        <Sparkles className="h-4 w-4 text-agri-500" aria-hidden />
        <span className="uppercase tracking-wide font-display">{eyebrow}</span>
      </div>
    )}
    <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl font-display">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 font-sans md:text-lg">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
