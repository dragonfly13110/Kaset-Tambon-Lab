import React, { useState } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
// I am removing `type Variants` because the error indicates it's not exported.
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';
import type { Category } from '../types';
import { Filter } from './Icons';

const projectFilters = [
  { key: "all", label: "ทั้งหมด" },
  { key: "tool", label: "เครื่องมือ" },
  { key: "knowledge", label: "องค์ความรู้" },
  { key: "dashboard", label: "แดชบอร์ด" },
];

// Removed Variants type annotation to fix build error.
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // FIX: Add `as const` to help TypeScript infer a tuple type for the cubic-bezier easing array.
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

// FIX: Explicitly type gridVariants with Variants to ensure type correctness.
// Removed Variants type annotation to fix build error.
const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>("all");
  const filteredProjects = PROJECTS.filter((p) => (filter === "all" ? true : p.category === filter));

  return (
    <motion.section 
      id="projects" 
      className="relative scroll-mt-24 py-14 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Container>
        <SectionTitle
          eyebrow="โปรเจกต์หลัก"
          title="คลิกเพื่อไปยังระบบที่ใช้งานจริง"
          subtitle="ลิงก์ภายนอกจะเปิดในแท็บใหม่ — รองรับทั้งมือถือและเดสก์ท็อป พัฒนาโดยเกษตรตำบล คนใช้แรงงาน"
          align="left"
        />

        <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="แถบกรองโปรเจกต์">
          <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-inset ring-white/10">
            <Filter className="h-4 w-4 text-emerald-300" aria-hidden />
            <span className="text-xs text-slate-300">กรองโปรเจกต์</span>
          </div>
          {projectFilters.map((f) => (
            <motion.button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key as Category)}
              aria-pressed={filter === f.key}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition ${
                filter === f.key
                  ? "bg-emerald-500 text-slate-900 ring-emerald-400"
                  : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Projects;
