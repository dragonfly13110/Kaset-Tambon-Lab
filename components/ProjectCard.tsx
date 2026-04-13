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
      className="group flex h-full flex-col justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 transition-colors hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10"
      aria-label={title}
    >
      <div>
        <div className="flex items-start gap-3 mb-2">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            <div className="h-5 w-5">{icon}</div>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {desc}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        {tag && (
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400">
            {tag}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          เปิด
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
};

export default ProjectCard;
