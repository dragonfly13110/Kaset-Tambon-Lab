import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
// I am removing `type Variants` because the error indicates it's not exported.
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import type { Project } from '../types';
import { ExternalLink } from './Icons';

// FIX: Explicitly type cardVariants with Variants to resolve type error for 'ease' property.
// Removed Variants type annotation to fix build error.
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // FIX: Add `as const` to help TypeScript infer a literal type, resolving the framer-motion type error for 'ease'.
    transition: { duration: 0.4, ease: 'easeOut' as const }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { icon, title, desc, href, tag } = project;
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], shouldReduceMotion ? [0, 0] : [6, -6]);
  const rotateY = useTransform(x, [0, 1], shouldReduceMotion ? [0, 0] : [-6, 6]);

  // FIX: Change event type to match onMouseMove handler for an anchor element.
  function handleMove(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (shouldReduceMotion) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;
    x.set(px);
    y.set(py);
  }

  function reset() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      variants={cardVariants}
      layout
    >
      <motion.a
        aria-label={`${title} — เปิดลิงก์ภายนอก`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        // FIX: Moved motion values `rotateX` and `rotateY` into the style prop to resolve TypeScript error.
        style={{
          transformPerspective: 900,
          rotateX,
          rotateY,
        }}
        whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
        // FIX: Add `as const` to `type: "spring"` to ensure TypeScript infers a literal type.
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 20 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-soft border border-surface-200 transition-all duration-300 hover:shadow-lg hover:border-agri-200 focus:outline-none overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-agri-50 text-agri-600 group-hover:bg-agri-500 group-hover:text-white transition-colors duration-300 shadow-sm">
            {icon}
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-agri-600 transition-colors duration-300">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 font-sans">{desc}</p>
        </div>
        <div className="relative z-10 mt-6 flex items-center justify-between pt-4 border-t border-surface-100">
          <div className="inline-flex items-center rounded-full bg-agri-50 px-2.5 py-0.5 text-xs font-medium text-agri-700 ring-1 ring-inset ring-agri-600/20">{tag}</div>
          <div className="flex items-center gap-2 text-xs font-medium text-agri-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open App <ExternalLink className="h-3 w-3" aria-hidden />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ProjectCard;