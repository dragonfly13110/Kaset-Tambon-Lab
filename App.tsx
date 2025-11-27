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
import AIToolsPage from './pages/AIToolsPage';
import InfoSection from './components/InfoSection';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'news' | 'aitools'>('home');
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
    <div className="min-h-screen bg-surface-50 text-slate-900 relative overflow-hidden font-sans selection:bg-agri-500/30 selection:text-agri-900">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Modern Gradient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-agri-200/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tech-200/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter animate-float" style={{ animationDelay: '2s' }} />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header page={page} setPage={setPage} />

        {page === 'home' ? (
          <>
            <main className="flex-grow space-y-0 pb-12 pt-12 md:space-y-0 md:pt-12">
              <Hero />
              <Projects />
              <NewsSection onNavigateToNews={() => setPage('news')} />
              <VisionSection />
              <AiToolsSection onNavigateToAITools={() => setPage('aitools')} />
              <WeatherSection />
              <AboutMeSection />
              <InfoSection />
            </main>
            <div className="fixed bottom-5 right-5 z-[60] hidden flex-col gap-2 md:flex" aria-label="เมนูลัด">
              <a
                href="#projects"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 hover:scale-105 border border-white/20"
                aria-label="ไปยังโปรเจกต์"
              >
                โปรเจกต์
              </a>
              <a
                href="#news-section"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 hover:scale-105 border border-white/20"
                aria-label="ไปยังข่าวสาร"
              >
                ข่าวสาร
              </a>
              <a
                href="#about-me"
                className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur hover:bg-white hover:text-agri-600 transition-all duration-200 hover:scale-105 border border-white/20"
                aria-label="ไปยังเกี่ยวกับฉัน"
              >
                เกี่ยวกับฉัน
              </a>
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