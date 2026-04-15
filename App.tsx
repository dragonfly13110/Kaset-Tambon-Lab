import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import NewsSection from './components/NewsSection';
import VisionSection from './components/VisionSection';
import AiToolsSection from './components/AiToolsSection';
import AgriCalendarSection from './components/AgriCalendarSection';
import Footer from './components/Footer';
import AboutMeSection from './components/AboutMeSection';
import NewsPage from './pages/NewsPage';
import AIToolsPage from './pages/AIToolsPage';
import FAQPage from './pages/FAQPage';

import SEO from './components/SEO';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'news' | 'aitools' | 'faq'>('home');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothedMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothedMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('scroll-smooth', page === 'home');
  }, [page]);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-emerald-200/40 selection:text-emerald-900 dark bg-slate-950">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[28%] w-[28%] rounded-full bg-emerald-900/25 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[28%] w-[28%] rounded-full bg-sky-900/25 blur-3xl" />
        <div className="absolute left-[35%] top-[15%] h-[24%] w-[24%] rounded-full bg-cyan-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header page={page} setPage={setPage} dark={true} onToggleDark={() => {}} />

        {page === 'home' ? (
          <>
            <SEO
              title="Kaset Tambon Lab - Smart Agricultural Extension Officer"
              description="ห้องปฏิบัติการเกษตรตำบลยุคใหม่ รวมเครื่องมือ AI เทคโนโลยี และนวัตกรรมเพื่อนักส่งเสริมการเกษตร"
              keywords="เกษตรตำบล, Smart Agriculture, AgTech, AI เกษตร"
            />
            <main className="flex-grow">
              <Hero />
              <div>
                <Projects />
              </div>
              <NewsSection onNavigateToNews={() => setPage('news')} />
              <div>
                <AiToolsSection onNavigateToAITools={() => setPage('aitools')} />
              </div>
              <VisionSection />
              <div>
                <AgriCalendarSection />
              </div>
              <AboutMeSection />
            </main>
          </>
        ) : page === 'news' ? (
          <NewsPage onNavigateHome={() => setPage('home')} />
        ) : page === 'faq' ? (
          <FAQPage onNavigateHome={() => setPage('home')} />
        ) : (
          <AIToolsPage onNavigateHome={() => setPage('home')} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;
