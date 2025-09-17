import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "soft";
  children: React.ReactNode;
  className?: string;
}

// Helper: detect if link is in-page anchor
function isHashLink(href?: string) {
  return typeof href === "string" && href.startsWith("#");
}

const Button: React.FC<ButtonProps> = ({ href, onClick, variant = "primary", children, className = "" }) => {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70";
  
  const styles = {
    primary: "bg-emerald-500 text-slate-900 hover:bg-emerald-400 active:bg-emerald-300",
    soft: "bg-white/5 text-white ring-1 ring-inset ring-white/10 hover:bg-white/10",
    ghost: "text-emerald-300 hover:text-white hover:opacity-90"
  };

  // FIX: Refactor to conditionally render `motion.a` or `motion.button` to avoid type conflicts with props.
  const commonProps = {
    onClick,
    className: `${base} ${styles[variant]} ${className}`,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    // FIX: Add `as const` to ensure TypeScript infers a literal type for 'spring', resolving framer-motion type error.
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 }
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
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...commonProps}
      type="button"
    >
      {children}
    </motion.button>
  );
};

export default Button;