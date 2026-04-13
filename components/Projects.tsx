import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';
import type { Category } from '../types';

const projectFilters = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'tool', label: 'เครื่องมือ' },
  { key: 'knowledge', label: 'องค์ความรู้' },
  { key: 'dashboard', label: 'แดชบอร์ด' },
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      id="projects"
      className="relative scroll-mt-16 py-6 md:py-8"
      initial={{ opacity: 1 }}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:text-2xl">ผลงาน</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">เครื่องมือและแพลตฟอร์มที่พัฒนาขึ้นสำหรับเกษตรตำบล</p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
          {projectFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveCategory(f.key as Category)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === f.key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Projects;
