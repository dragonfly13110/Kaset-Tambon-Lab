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
      className="border-t border-white/10 py-8 text-slate-400"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Container>
        <div className="text-center text-xs">
          © {new Date().getFullYear()} Kaset Tambon Lab • Department of Agricultural Extension
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;