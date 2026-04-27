import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'soft';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';
  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/40 active:translate-y-0'
    : 'border border-slate-700/80 bg-slate-900/80 text-slate-200 backdrop-blur-sm hover:border-emerald-500/60 hover:text-emerald-300 hover:bg-slate-900';

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
