import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import WeatherSection from './components/WeatherSection';
import Projects from './components/Projects';
import NewsSection from './components/NewsSection';
import VisionSection from './components/VisionSection';
import AiToolsSection from './components/AiToolsSection';
import Footer from './components/Footer';
import AboutMeSection from './components/AboutMeSection';
import NewsPage from './pages/NewsPage';
import AIToolsPage from './pages/AIToolsPage';

import SEO from './components/SEO';

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Wave Divider Component
const WaveDivider: React.FC<{ flip?: boolean; color?: string }> = ({ flip = false, color = "#f8fafc" }) => (
  <div className={`wave-divider ${flip ? 'rotate-180' : ''}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <motion.path
        d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
        fill={color}
        initial={{ d: "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" }}
        animate={{
          d: [
            "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
            "M0,80 C300,30 600,100 900,40 C1050,70 1150,50 1200,80 L1200,120 L0,120 Z",
            "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'news' | 'aitools'>('home');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothedMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothedMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Cursor glow opacity based on movement
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorActive(true);
    };

    const handleMouseLeave = () => {
      setCursorActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Update body class based on current page to handle scroll-smooth
  useEffect(() => {
    if (page === 'home') {
      document.documentElement.classList.add('scroll-smooth');
    } else {
      document.documentElement.classList.remove('scroll-smooth');
    }
  }, [page]);


  return (
    <div className="min-h-screen bg-surface-50 text-slate-900 relative overflow-hidden font-sans selection:bg-agri-500/30 selection:text-agri-900">
      {/* Cursor Glow Effect */}
      <motion.div
        className="cursor-glow hidden md:block"
        style={{
          x: smoothedMouseX,
          y: smoothedMouseY,
          opacity: cursorActive ? 1 : 0,
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Modern Gradient Background with Animation */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-agri-200/40 to-agri-300/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-tl from-tech-200/40 to-tech-300/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Additional Orb */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[30%] h-[30%] bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl opacity-40 mix-blend-multiply filter"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(248,250,252,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header page={page} setPage={setPage} />

        {page === 'home' ? (
          <>
            <SEO
              title="Kaset Tambon Lab - Smart Agricultural Extension Officer"
              description="ห้องปฏิบัติการเกษตรตำบลยุคใหม่ รวมเครื่องมือ AI เทคโนโลยี และนวัตกรรมเพื่อนักส่งเสริมการเกษตร พัฒนาอาชีพเกษตรกร สู่ Smart Agriculture"
              keywords="เกษตรตำบล, นักส่งเสริมการเกษตร, Smart Agriculture, AgTech, AI เกษตร, เทคโนโลยีการเกษตร, นวัตกรรมเกษตร, เครื่องมือเกษตร"
            />
            <main className="flex-grow space-y-0 pb-12 pt-12 md:space-y-0 md:pt-12">
              <Hero />
              <WaveDivider color="#ffffff" />
              <WeatherSection />
              <WaveDivider flip color="#f8fafc" />
              <Projects />
              <WaveDivider color="#ffffff" />
              <NewsSection onNavigateToNews={() => setPage('news')} />
              <WaveDivider flip color="#f8fafc" />
              <VisionSection />
              <WaveDivider color="#ffffff" />
              <AiToolsSection onNavigateToAITools={() => setPage('aitools')} />
              <WaveDivider flip color="#f8fafc" />
              <AboutMeSection />
            </main>
            <div className="fixed bottom-5 right-5 z-[60] hidden flex-col gap-2 md:flex" aria-label="เมนูลัด">
              <motion.a
                href="#projects"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 border border-white/20 glow-agri-hover"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="ไปยังโปรเจกต์"
              >
                โปรเจกต์
              </motion.a>
              <motion.a
                href="#news-section"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 border border-white/20 glow-agri-hover"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="ไปยังข่าวสาร"
              >
                ข่าวสาร
              </motion.a>
              <motion.a
                href="#about-me"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 border border-white/20 glow-agri-hover"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="ไปยังเกี่ยวกับฉัน"
              >
                เกี่ยวกับฉัน
              </motion.a>
            </div>
          </>
        ) : page === 'news' ? (
          <NewsPage onNavigateHome={() => setPage('home')} />
        ) : (
          <AIToolsPage onNavigateHome={() => setPage('home')} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;