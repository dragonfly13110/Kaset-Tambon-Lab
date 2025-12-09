import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { ChevronDown } from './Icons';

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 2,
  suffix = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span className="stat-number">{count.toLocaleString()}{suffix}</span>;
};

// Typing Animation Component
const TypingText: React.FC<{ texts: string[]; className?: string }> = ({ texts, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink text-agri-500">|</span>
    </span>
  );
};

const stats = [
  { label: 'เครื่องมือ AI', value: 15, suffix: '+' },
  { label: 'ผู้ใช้งาน', value: 500, suffix: '+' },
  { label: 'เกษตรกร', value: 1000, suffix: '+' },
];

const typingTexts = [
  'ด้วยเทคโนโลยีสมัยใหม่',
  'ด้วย AI และ Data',
  'ด้วยนวัตกรรมดิจิทัล',
];

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-32">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-agri-300/30 to-agri-400/20 blur-xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-tech-300/30 to-tech-400/20 blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-xl"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-4 h-4 bg-agri-400/40 rotate-45"
          animate={{ rotate: [45, 225, 45], scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-tech-400/40 rounded-full"
          animate={{ y: [0, -50, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge with Glow */}
            <motion.span
              className="inline-block rounded-full bg-gradient-to-r from-agri-50 to-tech-50 px-5 py-2 text-sm font-medium text-agri-700 ring-1 ring-inset ring-agri-600/20 mb-8 shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-2">🌾</span>
              Smart Agricultural Extension Officer
              <span className="ml-2">🤖</span>
            </motion.span>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl font-display">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                ยกระดับเกษตรกรไทย
              </motion.span>
              <motion.span
                className="block mt-2 text-shimmer"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <TypingText texts={typingTexts} />
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-lg leading-8 text-slate-600 md:text-xl max-w-2xl mx-auto font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              พื้นที่ทดลองและพัฒนานวัตกรรมดิจิทัลเพื่อการเกษตร โดยนักวิชาการส่งเสริมการเกษตร
              มุ่งเน้นการประยุกต์ใช้ AI และ Data เพื่อความยั่งยืน
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient-agri font-display">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Button
                href="#projects"
                variant="primary"
                className="shadow-lg shadow-agri-500/25 hover:shadow-agri-500/40 btn-ripple glow-agri-hover px-8 py-3"
              >
                <span className="mr-2">🚀</span>
                ดูผลงานนวัตกรรม
              </Button>
              <Button
                href="#about-me"
                variant="soft"
                className="bg-white/70 backdrop-blur-sm hover:bg-white border-gradient-animated px-8 py-3"
              >
                เกี่ยวกับผู้จัดทำ
                <span className="ml-2">→</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Decorative Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-agri-200/20 to-tech-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-agri-400/10 rounded-full blur-3xl pointer-events-none -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scroll Indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-agri-600 transition-colors group"
      >
        <span className="text-[10px] font-serif tracking-[0.2em] uppercase group-hover:text-agri-500 transition-colors">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;