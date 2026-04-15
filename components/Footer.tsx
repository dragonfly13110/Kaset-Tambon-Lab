import React from 'react';
import Container from './ui/Container';
import { Facebook } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-8">
      <Container>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="text-sm font-semibold text-slate-100">Kaset Tambon Lab</div>
            <div className="mt-0.5 text-xs text-slate-400">
              แพลตฟอร์มนวัตกรรมเกษตรอัจฉริยะ
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/RebelliousKasetTambon"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-700 p-2 text-slate-300 transition-colors hover:border-emerald-500/60 hover:bg-slate-800 hover:text-emerald-300"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Kaset Tambon Lab
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
