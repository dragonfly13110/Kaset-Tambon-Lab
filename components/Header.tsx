import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from '../constants';
import type { NavItem } from '../types';
import { X } from './Icons';

// Hamburger Menu Icon
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

interface HeaderProps {
  page: 'home' | 'news' | 'aitools';
  setPage: (page: 'home' | 'news' | 'aitools') => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.page) {
      setPage(item.page as 'home' | 'news' | 'aitools');
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
    <motion.header
      className="sticky top-0 z-50 glass-premium"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-agri-400/50 to-transparent" />

      <Container className="flex items-center justify-between py-4">
        <motion.button
          onClick={() => {
            setPage('home');
            setIsMobileMenuOpen(false);
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="กลับหน้าหลัก"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="relative p-2 rounded-xl bg-gradient-to-br from-agri-50 to-tech-50 shadow-inner group-hover:shadow-lg transition-all duration-300"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-agri-400/20 to-tech-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            <BrandLogo />
          </motion.div>
          <div className="text-left">
            <div className="text-xl font-bold font-display text-slate-800 tracking-tight group-hover:text-gradient-agri transition-all duration-300">
              Kaset Tambon
            </div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-semibold group-hover:text-tech-500 transition-colors">
              ห้องปฏิบัติการอัจฉริยะ
            </div>
          </div>
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="หลัก">
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="relative text-sm font-medium text-slate-600 transition-all duration-300 hover:text-agri-600 link-underline py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button
            onClick={() => handleNavClick({ href: '#projects', label: 'ดูทั้งหมด' })}
            variant="primary"
            className="font-medium shadow-lg shadow-agri-500/20 hover:shadow-agri-500/40 btn-ripple glow-agri-hover"
          >
            <span className="mr-1">📁</span>
            ดูผลงาน
          </Button>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-surface-100 hover:text-agri-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-agri-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-surface-200 bg-white/95 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="py-4">
              <nav className="flex flex-col gap-1" aria-label="เมนูมือถือ">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-agri-50 hover:text-agri-700 transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="mt-2 pt-2 border-t border-surface-200">
                  <Button
                    onClick={() => handleNavClick({ href: '#projects', label: 'ดูทั้งหมด' })}
                    variant="primary"
                    className="w-full font-medium shadow-lg shadow-agri-500/20 btn-ripple"
                  >
                    <span className="mr-1">📁</span>
                    ดูผลงาน
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;