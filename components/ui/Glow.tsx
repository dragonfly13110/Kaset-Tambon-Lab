
import type React from 'react';

interface GlowProps {
  className?: string;
}

const Glow: React.FC<GlowProps> = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    aria-hidden
  >
    <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
    <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
    <div className="absolute -right-24 top-52 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
  </div>
);

export default Glow;
