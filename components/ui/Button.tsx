import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "soft" | "outline";
  children: React.ReactNode;
  className?: string;
}

// Helper: detect if link is in-page anchor
function isHashLink(href?: string) {
  return typeof href === "string" && href.startsWith("#");
}

const Button: React.FC<ButtonProps> = ({ href, onClick, variant = "primary", children, className = "" }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-agri-400/70 btn-ripple relative overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-agri-600 to-agri-500 text-white hover:from-agri-500 hover:to-agri-600 shadow-lg shadow-agri-600/25 font-medium font-display",
    soft: "bg-gradient-to-r from-agri-50 to-tech-50 text-agri-700 ring-1 ring-inset ring-agri-600/20 hover:from-agri-100 hover:to-tech-100 font-medium font-display",
    ghost: "text-slate-600 hover:text-agri-600 hover:bg-agri-50 font-medium font-display",
    outline: "bg-white text-agri-600 ring-2 ring-agri-500/50 hover:ring-agri-600 hover:bg-agri-50/50 font-medium font-display hover:shadow-lg hover:shadow-agri-500/20"
  };

  const commonProps = {
    onClick,
    className: `${base} ${variants[variant]} ${className}`,
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
  };

  if (href) {
    const anchorProps = isHashLink(href)
      ? { href }
      : { href, target: "_blank", rel: "noopener noreferrer" };

    return (
      <motion.a
        {...commonProps}
        {...anchorProps}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      {...commonProps}
      type="button"
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;