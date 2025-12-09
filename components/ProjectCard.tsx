import React from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import type { Project } from '../types';
import { ExternalLink } from './Icons';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 }
  }
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { icon, title, desc, href, tag } = project;
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], shouldReduceMotion ? [0, 0] : [8, -8]);
  const rotateY = useTransform(x, [0, 1], shouldReduceMotion ? [0, 0] : [-8, 8]);

  // Shine position based on mouse
  const shineX = useTransform(x, [0, 1], ['-100%', '200%']);
  const shineOpacity = useTransform(x, [0, 0.5, 1], [0, 0.3, 0]);

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
      className="perspective-1000"
    >
      <motion.a
        aria-label={`${title} — เปิดลิงก์ภายนอก`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          transformPerspective: 1000,
          rotateX,
          rotateY,
        }}
        whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 20 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full flex-col justify-between rounded-2xl bg-white p-6 border border-surface-200/80 transition-all duration-500 hover:border-agri-300 overflow-hidden preserve-3d hover-lift"
      >
        {/* Animated Gradient Border on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(14,165,233,0.1))',
          }}
        />

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
            x: shineX,
            opacity: shineOpacity,
          }}
        />

        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-agri-400/20 to-tech-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />

        <div className="relative z-10">
          {/* Icon with Animation */}
          <motion.div
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-agri-50 to-agri-100 text-agri-600 group-hover:from-agri-500 group-hover:to-agri-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-agri-500/30"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-gradient-agri transition-all duration-300">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 font-sans group-hover:text-slate-600 transition-colors">
            {desc}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between pt-4 border-t border-surface-100 group-hover:border-agri-100 transition-colors">
          <motion.div
            className="inline-flex items-center rounded-full bg-gradient-to-r from-agri-50 to-tech-50 px-3 py-1 text-xs font-medium text-agri-700 ring-1 ring-inset ring-agri-600/20"
            whileHover={{ scale: 1.05 }}
          >
            {tag}
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-xs font-medium text-agri-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 5 }}
          >
            Open App
            <ExternalLink className="h-3 w-3" aria-hidden />
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ProjectCard;