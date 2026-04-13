import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from '../constants';
import type { NavItem } from '../types';

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

interface HeaderProps {
  page: 'home' | 'news' | 'aitools' | 'faq';
  setPage: (page: 'home' | 'news' | 'aitools' | 'faq') => void;
  dark: boolean;
  onToggleDark: () => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage, dark, onToggleDark }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.page) {
      setPage(item.page as 'home' | 'news' | 'aitools' | 'faq');
      window.scrollTo(0, 0);
    } else if (item.href) {
      if (page !== 'home') {
        setPage('home');
        setTimeout(() => {
          document.querySelector(item.href!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${dark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200/50'}`}>
      <Container className="flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
          className="flex items-center gap-2.5 focus:outline-none"
          aria-label="กลับหน้าหลัก"
        >
          <div className={`p-1.5 rounded-lg transition-colors ${dark ? 'bg-slate-800' : 'bg-emerald-50'}`}>
            <BrandLogo />
          </div>
          <div className="hidden sm:block">
            <div className={`text-sm font-semibold transition-colors ${dark ? 'text-slate-200' : 'text-slate-800'}`}>Kaset Tambon</div>
            <div className={`text-[9px] uppercase tracking-wider transition-colors ${dark ? 'text-slate-500' : 'text-slate-500'}`}>Lab</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="หลัก">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`text-sm transition-colors ${dark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side: Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            className={`md:hidden p-1.5 rounded-md transition-colors ${dark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          >
            {isMobileMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`md:hidden border-t transition-colors ${dark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`text-left px-4 py-2.5 text-sm transition-colors ${dark ? 'text-slate-400 hover:bg-slate-800 hover:text-emerald-400' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
