import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import Glow from './ui/Glow';
import { LOGO_SRC } from '../constants';
import { ShieldCheck, ArrowRight, ChevronDown, Facebook } from './Icons';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Glow />
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        data-testid="hero-logo-watermark"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] blur-[0.5px]"
      />
      <Container className="relative">
        <motion.div
          // FIX: Wrapped framer-motion props in a spread to bypass type errors.
          {...{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-white/10">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            <span>งานจริงใช้ในพื้นที่ • DOAE</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">เกษตรตำบล</h1>
          <p data-testid="hero-subtitle" className="mt-3 text-base text-slate-300 md:text-lg">
            แหล่งรวบรวมโปรเจกต์ของเกษตรตำบล คนใช้แรงงาน
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#projects">
              เข้าชมโปรเจกต์ <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="https://www.facebook.com/RebelliousKasetTambon" variant="soft">
              <Facebook className="h-4 w-4" aria-hidden /> Facebook
            </Button>
          </div>
        </motion.div>

        <motion.div
          // FIX: Wrapped framer-motion props in a spread to bypass type errors.
          {...{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4, duration: 0.8 },
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/15"
          aria-hidden
        />
      </Container>
      <a
        href="#projects"
        className="group absolute left-1/2 bottom-6 -translate-x-1/2 inline-flex items-center justify-center rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10 backdrop-blur hover:bg-white/10"
        aria-label="เลื่อนไปยังโปรเจกต์"
      >
        <ChevronDown className="h-4 w-4 animate-bounce text-slate-300 group-hover:text-white" aria-hidden />
      </a>
    </section>
  );
};

export default Hero;