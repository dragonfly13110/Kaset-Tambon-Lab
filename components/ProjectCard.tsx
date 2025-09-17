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
        className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm hover:border-emerald-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
      >
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(480px circle at 0 0, rgba(16,185,129,.25), transparent 40%), radial-gradient(480px circle at 100% 0, rgba(99,102,241,.20), transparent 40%)",
          }}
          aria-hidden
        />

        <div>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-inset ring-emerald-400/20">{tag}</div>
          <ExternalLink className="h-5 w-5 text-slate-300 transition group-hover:text-white" aria-hidden />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ProjectCard;