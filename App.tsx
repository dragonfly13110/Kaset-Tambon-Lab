import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'news'>('home');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothedMouseX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const smoothedMouseY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="min-h-screen bg-[#060912] text-slate-200 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute top-[-10rem] left-[-10rem] h-[25rem] w-[25rem] rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          // FIX: Add `as const` to string literals to fix type inference issues.
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror' as const,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          className="absolute bottom-[-10rem] right-[-15rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
          }}
          // FIX: Add `as const` to string literals to fix type inference issues.
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'mirror' as const,
            ease: 'easeInOut' as const,
          }}
        />
         <motion.div
          className="absolute bottom-[5rem] left-[-5rem] h-[20rem] w-[20rem] rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            rotate: [0, 15, 0]
          }}
          // FIX: Add `as const` to string literals to fix type inference issues.
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'mirror' as const,
            ease: 'easeInOut' as const,
          }}
        />
      </div>

      {/* Spotlight Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 -z-10 rounded-full opacity-40 blur-3xl"
        // FIX: Moved motion values `x` and `y` into the style prop to resolve TypeScript error.
        style={{
          width: '400px',
          height: '400px',
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0) 60%)',
          x: smoothedMouseX,
          y: smoothedMouseY,
        }}
      />

      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        ข้ามไปยังโปรเจกต์
      </a>

      <Header page={page} setPage={setPage} />

      {page === 'home' ? (
        <>
          <main>
            <Hero />
            <Projects />
            <NewsSection onNavigateToNews={() => setPage('news')} />
            <VisionSection />
            <AiToolsSection />
            <WeatherSection />
            <AboutMeSection />
          </main>
          <div className="fixed bottom-5 right-5 z-[60] hidden flex-col gap-2 md:flex" aria-label="เมนูลัด">
            <a
              href="#projects"
              className="rounded-2xl bg-emerald-500/90 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur hover:bg-emerald-400 transition-transform duration-200 hover:scale-105"
              aria-label="ไปยังโปรเจกต์"
            >
              โปรเจกต์
            </a>
             <a
              href="#news-section"
              className="rounded-2xl bg-emerald-500/90 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur hover:bg-emerald-400 transition-transform duration-200 hover:scale-105"
              aria-label="ไปยังข่าวสาร"
            >
              ข่าวสาร
            </a>
            <a
              href="#about-me"
              className="rounded-2xl bg-emerald-500/90 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur hover:bg-emerald-400 transition-transform duration-200 hover:scale-105"
              aria-label="ไปยังเกี่ยวกับฉัน"
            >
              เกี่ยวกับฉัน
            </a>
          </div>
        </>
      ) : (
        <NewsPage onNavigateHome={() => setPage('home')} />
      )}
      
      <Footer />
    </div>
  );
};

export default App;