import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import Glow from './ui/Glow';
import { LOGO_SRC } from '../constants';
import { ShieldCheck, ArrowRight, ChevronDown, Facebook } from './Icons';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-agri-50 px-4 py-1.5 text-sm font-medium text-agri-700 ring-1 ring-inset ring-agri-600/20 mb-6">
              Smart Agricultural Extension Officer
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl font-display">
              <span className="block">ยกระดับเกษตรกรไทย</span>
              <span className="block mt-2 text-gradient-agri">ด้วยเทคโนโลยีสมัยใหม่</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl max-w-2xl mx-auto font-sans">
              พื้นที่ทดลองและพัฒนานวัตกรรมดิจิทัลเพื่อการเกษตร โดยนักวิชาการส่งเสริมการเกษตร
              มุ่งเน้นการประยุกต์ใช้ AI และ Data เพื่อความยั่งยืน
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href="#projects" variant="primary" className="shadow-lg shadow-agri-500/25 hover:shadow-agri-500/40">
                ดูผลงานนวัตกรรม
              </Button>
              <Button href="#about-me" variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white">
                เกี่ยวกับผู้จัดทำ
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-agri-200/20 to-tech-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agri-400/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-agri-600 transition-colors"
      >
        <span className="text-[10px] font-serif tracking-[0.2em] uppercase">Scroll to Explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section >
  );
};

export default Hero;