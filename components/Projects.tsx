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
      className="relative scroll-mt-24 py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">
            คลังเครื่องมือและนวัตกรรม
          </h2>
          <p className="text-slate-600 font-sans text-lg max-w-2xl mx-auto">
            เลือกหมวดหมู่เพื่อดูคลังเอกสาร เครื่องมือ และบันทึกที่ใช้ในการทำงานจริง
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2" aria-label="แถบกรองโปรเจกต์">
          {projectFilters.map((f) => (
            <motion.button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key as Category)}
              aria-pressed={filter === f.key}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${filter === f.key
                ? "bg-agri-100 text-agri-700 ring-1 ring-inset ring-agri-600/20"
                : "text-slate-600 hover:bg-slate-100"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
