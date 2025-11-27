

import React from 'react';
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
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60">
      <Container className="flex items-center justify-between py-4">
        <button
          onClick={() => {
            setPage('home');
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="กลับหน้าหลัก"
        >
          <div className="relative p-1.5 rounded-xl bg-gradient-to-br from-agri-50 to-tech-50 shadow-inner group-hover:shadow-md transition-all duration-300">
            <BrandLogo />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold font-display text-slate-800 tracking-tight group-hover:text-agri-600 transition-colors">Kaset Tambon</div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-semibold group-hover:text-tech-500 transition-colors">Smart Lab</div>
          </div>
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="หลัก">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="relative text-sm font-medium text-slate-600 transition-all duration-300 hover:text-agri-600"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-agri-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button
            onClick={() => handleNavClick({ href: '#projects', label: 'ดูทั้งหมด' })}
            variant="primary"
            className="font-medium shadow-lg shadow-agri-500/20 hover:shadow-agri-500/30"
          >
            View Archives
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;