

import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import Button from './ui/Button';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from '../constants';
import type { NavItem } from '../types';

interface HeaderProps {
  page: 'home' | 'news' | 'aitools';
  setPage: (page: 'home' | 'news' | 'aitools') => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  const handleNavClick = (item: NavItem) => {
    if (item.page) {
      setPage(item.page as 'home' | 'news' | 'aitools');
      window.scrollTo(0, 0);
    } else if (item.href) {
      if (page !== 'home') {
        setPage('home');
        // Use a short delay to allow the home page to render before scrolling
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
              Smart Lab
            </div>
          </div>
        </motion.button>

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
            View Archives
          </Button>
        </motion.div>
      </Container>
    </motion.header>
  );
};

export default Header;