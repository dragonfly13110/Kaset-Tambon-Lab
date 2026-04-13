import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { ChevronDown } from './Icons';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden py-12 md:py-20">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <motion.span
            className="inline-block rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            🌾 นักส่งเสริมการเกษตร
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl font-display"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            ยกระดับเกษตรกรไทย
            <span className="block mt-0.5 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              ด้วยเทคโนโลยี
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-3 text-base text-slate-500 dark:text-slate-400 md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            ทดลองและพัฒนานวัตกรรมดิจิทัลเพื่อการเกษตร โดยประยุกต์ใช้ AI และ Data
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Button href="#projects" variant="primary" className="px-6 py-2 text-sm">
              ดูผลงาน
            </Button>
            <Button href="#about-me" variant="soft" className="px-6 py-2 text-sm">
              เกี่ยวกับเรา
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
