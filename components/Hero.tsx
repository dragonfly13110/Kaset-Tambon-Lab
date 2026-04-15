import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { ChevronDown } from './Icons';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden py-14 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(800px circle at 20% 5%, rgba(16,185,129,.18), transparent 48%), radial-gradient(700px circle at 85% 30%, rgba(14,165,233,.14), transparent 48%)',
        }}
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.span
            className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-900/30 px-3.5 py-1 text-xs font-medium text-emerald-300"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            🌾 นักส่งเสริมการเกษตร
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="font-display text-3xl font-bold tracking-tight text-slate-100 md:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            ยกระดับเกษตรกรไทย
            <span className="mt-1 block bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              ด้วยเทคโนโลยี
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            ทดลองและพัฒนานวัตกรรมดิจิทัลเพื่อการเกษตร โดยประยุกต์ใช้ AI และ Data
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-7 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Button href="#projects" variant="primary" className="px-6 py-2.5 text-sm">
              ดูผลงาน
            </Button>
            <Button href="#about-me" variant="soft" className="px-6 py-2.5 text-sm">
              เกี่ยวกับเรา
            </Button>
          </motion.div>
          <motion.div
            className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-2 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
              <div className="text-sm font-semibold text-emerald-300">AI + Data</div>
              <div className="text-[11px] text-slate-400">แนวทางทำงาน</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
              <div className="text-sm font-semibold text-emerald-300">AgTech</div>
              <div className="text-[11px] text-slate-400">เครื่องมือจริง</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
              <div className="text-sm font-semibold text-emerald-300">Field-ready</div>
              <div className="text-[11px] text-slate-400">ใช้ได้ในพื้นที่</div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-500 hover:text-emerald-400 transition-colors"
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
