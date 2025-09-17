
import React from 'react';
import { Sparkles } from '../Icons';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle, align = "center" }) => (
  <div className={`mb-8 ${align === "center" ? "text-center" : "text-left"}`}>
    {eyebrow && (
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
        <Sparkles className="h-4 w-4" aria-hidden />
        <span>{eyebrow}</span>
      </div>
    )}
    <h2 className="text-2xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mt-3 text-balance text-sm leading-relaxed text-slate-300 md:text-base">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
