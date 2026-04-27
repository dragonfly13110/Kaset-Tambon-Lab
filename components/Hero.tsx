import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import { ChevronDown } from './Icons';
import { HERO_STATS, HERO_TYPING_TEXTS } from '../constants';

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
                <TypingText texts={HERO_TYPING_TEXTS} />
              </motion.span>
            </h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            ทดลองและพัฒนานวัตกรรมดิจิทัลเพื่อการเกษตร โดยประยุกต์ใช้ AI และ Data
          </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {HERO_STATS.map((stat, index) => (
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
