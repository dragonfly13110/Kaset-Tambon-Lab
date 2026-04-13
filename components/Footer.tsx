import React from 'react';
import Container from './ui/Container';
import { Facebook } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Kaset Tambon Lab</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
              แพลตฟอร์มนวัตกรรมเกษตรอัจฉริยะ
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/RebelliousKasetTambon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} Kaset Tambon Lab
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
