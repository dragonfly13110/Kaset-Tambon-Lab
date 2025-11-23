import React from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
// I am removing `type Variants` because the error indicates it's not exported.
import { motion } from 'framer-motion';
import Container from './ui/Container';

// Removed Variants type annotation to fix build error.
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // FIX: Add `as const` to help TypeScript infer a tuple type for the cubic-bezier easing array.
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="border-t border-surface-200 bg-white/50 backdrop-blur-sm py-8 text-slate-500 font-sans"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Container>
        <div className="flex flex-col items-center justify-center gap-2 text-center text-xs md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Kaset Tambon Lab • Department of Agricultural Extension</p>
          <p className="text-slate-400">Designed for Smart Agriculture</p>
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;