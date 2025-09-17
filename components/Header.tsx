

import React from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import BrandLogo from './BrandLogo';
import { NAV_ITEMS } from '../constants';
import type { NavItem } from '../types';

interface HeaderProps {
  page: 'home' | 'news';
  setPage: (page: 'home' | 'news') => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  const handleNavClick = (item: NavItem) => {
    if (item.page) {
      setPage(item.page as 'home' | 'news');
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <button
          onClick={() => {
            setPage('home');
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="กลับหน้าหลัก"
        >
          <BrandLogo />
          <div>
            <div className="text-sm font-bold tracking-wide text-white">Kaset Tambon Lab</div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-300/85">DOAE • Portfolio</div>
          </div>
        </button>
        <nav className="hidden items-center gap-6 md:flex" aria-label="หลัก">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="relative text-sm text-slate-300 transition hover:text-white"
            >
              <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => handleNavClick({ href: '#projects', label: 'ดูทั้งหมด' })}>ดูทั้งหมด</Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;