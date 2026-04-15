import React from 'react';
import { ExternalLink } from './Icons';

interface ProjectCardProps {
  project: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    href: string;
    tag?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { icon, title, desc, href, tag } = project;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/30"
      aria-label={title}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(700px circle at 0% 0%, rgba(16,185,129,.12), transparent 45%)' }}
      />
      <div>
        <div className="mb-2 flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors group-hover:border-emerald-500/50 group-hover:bg-emerald-900/30 group-hover:text-emerald-300">
            <div className="h-5 w-5">{icon}</div>
          </div>
          <h3 className="text-sm font-semibold leading-snug text-slate-100 transition-colors group-hover:text-emerald-300">
            {title}
          </h3>
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">
          {desc}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
        {tag && (
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-300">
            {tag}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400 transition-colors group-hover:text-emerald-300">
          เปิด
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
