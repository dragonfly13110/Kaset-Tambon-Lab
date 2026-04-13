import React from 'react';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import {
  Satellite,
  Wind,
  FileText,
  Paintbrush,
  Sparkles,
  BarChart3,
  Leaf,
  Bot,
  ExternalLink,
} from './Icons';

interface AiToolsSectionProps {
  onNavigateToAITools?: () => void;
}

const toolCategories = [
  {
    title: 'AgriNEXT (NECTEC)',
    description: 'แพลตฟอร์มเกษตรแม่นยำ IoT + ดาวเทียม + AI',
    icon: Satellite,
    href: 'https://www.nstda.or.th/home/news_post/s-and-t-implementation-agrinext/',
  },
  {
    title: 'HandySense B-Farm',
    description: 'Smart Farming จาก NECTEC ควบคุมฟาร์มอัตโนมัติ',
    icon: Leaf,
    href: 'https://www.nationthailand.com/news/general/40046572',
  },
  {
    title: 'Farmonaut',
    description: 'ดาวเทียม + AI ติดตามสุขภาพพืช Blockchain Traceability',
    icon: Satellite,
    href: 'https://farmonaut.com/',
  },
  {
    title: 'GenCast (Google)',
    description: 'AI พยากรณ์อากาศ 15 วัน จาก Google DeepMind',
    icon: Wind,
    href: 'https://deepmind.google/discover/blog/gencast-a-diffusion-model-for-accurate-weather-forecasting/',
  },
  {
    title: 'GPT-5.4 & Gemini 3.1 Pro',
    description: 'Agentic AI วิเคราะห์ภาพโรคพืช วางแผนเกษตร 24/7',
    icon: Bot,
    href: 'https://chatgpt.com/',
  },
  {
    title: 'CropX & Gamaya',
    description: 'วิเคราะห์ดินเรียลไทม์ + VRT ลดปุ๋ย 36-60%',
    icon: Leaf,
    href: 'https://www.cropx.com/',
  },
  {
    title: 'Nano Banana 2 + Canva AI',
    description: 'สร้างสื่อเกษตร อินโฟกราฟิก โปสเตอร์',
    icon: Paintbrush,
    href: 'https://www.canva.com/',
  },
  {
    title: 'Digital Twin + Agentic AI',
    description: 'AI Agent จัดการฟาร์มอัตโนมัติ end-to-end',
    icon: BarChart3,
    href: '#',
  },
  {
    title: 'Blockchain Traceability',
    description: 'ติดตามสินค้าเกษตร ฟาร์มถึงผู้บริโภค GAP, Organic',
    icon: FileText,
    href: 'https://farmonaut.com/',
  },
];

const AiToolsSection: React.FC<AiToolsSectionProps> = ({ onNavigateToAITools }) => {
  return (
    <section id="ai-tools" className="relative py-6 md:py-8">
      <Container>
        <SectionTitle
          eyebrow="เมษายน 2026"
          title="เครื่องมือ AI"
          subtitle="เทคโนโลยี AI ล่าสุดที่เปลี่ยนโฉมการเกษตร"
        />

        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-xl">
            {toolCategories.map((tool, index) => (
              <a
                key={tool.title}
                href={tool.href}
                target={tool.href.startsWith('http') ? '_blank' : undefined}
                rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-800/50 ${
                  index !== toolCategories.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-800 text-slate-400 group-hover:bg-emerald-900/30 group-hover:text-emerald-400 transition-colors">
                  <tool.icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 truncate">
                    {tool.title}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {tool.description}
                  </div>
                </div>

                <svg className="h-4 w-4 text-slate-600 group-hover:text-emerald-500 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
          </div>

          {onNavigateToAITools && (
            <div className="mt-4 text-center">
              <button
                onClick={onNavigateToAITools}
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                ดูเครื่องมือทั้งหมด
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            💡 อัพเดท: เมษายน 2026 | Agriculture 4.0 Thailand
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AiToolsSection;
