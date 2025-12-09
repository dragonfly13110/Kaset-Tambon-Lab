import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';
import {
  Camera,
  Satellite,
  Wind,
  FileText,
  Paintbrush,
  Sparkles,
  BarChart3,
  Component,
  Type,
  ArrowRight,
  Brain,
  Bot,
  Leaf,
} from './Icons';

interface AiToolsSectionProps {
  onNavigateToAITools?: () => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

const toolCategories = [
  {
    title: 'วินิจฉัยโรค/แมลงด้วย AI',
    description: 'Plantix, Agrio, AgroScout, Xarvio - ระบุโรคพืชจากภาพด้วยความแม่นยำ 90%+ พร้อมคำแนะนำการรักษาทันที',
    icon: Camera,
    color: 'from-emerald-500 to-teal-500',
    badge: '🔥 2025 Trending'
  },
  {
    title: 'ดาวเทียม & โดรน AI',
    description: 'FlyPix AI, Taranis, OneSoil, Farmonaut - ติดตามสุขภาพพืชเรียลไทม์ คาดการณ์ผลผลิตแม่นยำ',
    icon: Satellite,
    color: 'from-blue-500 to-cyan-500',
    badge: '🛰️ Precision Ag'
  },
  {
    title: 'พยากรณ์อากาศ AI แม่นยำ',
    description: 'GraphCast (Google), Pangu-Weather (Huawei) - พยากรณ์ 10 วันล่วงหน้าเฉพาะพื้นที่ ด้วย AI Model ล่าสุด',
    icon: Wind,
    color: 'from-sky-500 to-blue-500',
    badge: '⚡ AI Weather'
  },
  {
    title: 'Gemini 2.0 & GPT-4 Turbo',
    description: 'Cropin Sage (Gemini), Farmer.Chat (GPT-4), AgriQuery - ถามตอบ วิเคราะห์ภาพ วางแผนเกษตรได้ 24/7',
    icon: Bot,
    color: 'from-violet-500 to-purple-500',
    badge: '🤖 GenAI 2025'
  },
  {
    title: 'วิเคราะห์ดินและน้ำอัจฉริยะ',
    description: 'CropX, IBM Maximo, Gamaya - วัดสุขภาพดิน ความชื้น Carbon เพื่อ Precision Irrigation',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    badge: '💧 Smart Soil'
  },
  {
    title: 'เครื่องจักร AI อัตโนมัติ',
    description: 'John Deere See & Spray, FarmWise Titan - หุ่นยนต์กำจัดวัชพืช/เก็บเกี่ยวอัตโนมัติ ลดแรงงาน 70%',
    icon: Component,
    color: 'from-orange-500 to-red-500',
    badge: '🤖 Autonomous'
  },
  {
    title: 'Digital Twin ฟาร์มจำลอง',
    description: 'ทดสอบสถานการณ์ต่างๆ บนแบบจำลองดิจิทัล ก่อนลงมือทำจริง - เทรนด์ใหม่ปี 2025',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    badge: '🆕 New 2025'
  },
  {
    title: 'สร้างสื่อ/อินโฟกราฟิก AI',
    description: 'Canva AI, Adobe Firefly, Gamma, Ideogram - สร้างสื่อเกษตรสวยงามได้ในไม่กี่นาที',
    icon: Paintbrush,
    color: 'from-pink-500 to-rose-500',
    badge: '🎨 Design AI'
  },
  {
    title: 'AgriLLM & AI เฉพาะทาง',
    description: 'Large Language Model เฉพาะการเกษตร ให้คำแนะนำตามสภาพพื้นที่และภูมิอากาศเฉพาะ',
    icon: Brain,
    color: 'from-teal-500 to-cyan-500',
    badge: '🧠 AgriAI'
  },
];

const AiToolsSection: React.FC<AiToolsSectionProps> = ({ onNavigateToAITools }) => {
  return (
    <motion.section
      id="ai-tools"
      className="relative py-16 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <Container>
        <SectionTitle
          eyebrow="อัพเดทใหม่ ธ.ค. 2024 → 2025"
          title="คลังเครื่องมือ AI เพื่อเกษตรตำบล"
          subtitle="รวมเทคโนโลยี AI ล่าสุดที่กำลังเปลี่ยนโฉมการเกษตรทั่วโลก - ตลาดโต 26% ต่อปี"
        />

        {/* Highlight Banner */}
        <motion.div
          className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-agri-500/10 via-tech-500/10 to-purple-500/10 border border-agri-200/50 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-slate-700">
            🚀 <span className="font-semibold text-agri-700">เทรนด์ 2025:</span>{' '}
            <span className="text-tech-600 font-medium">Gemini 2.0</span>,{' '}
            <span className="text-tech-600 font-medium">GPT-4 Turbo</span>,{' '}
            <span className="text-tech-600 font-medium">Digital Twin</span>,{' '}
            <span className="text-tech-600 font-medium">Autonomous Farming</span>,{' '}
            <span className="text-tech-600 font-medium">AgriLLM</span>
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="px-4 py-2 rounded-xl bg-white/80 border border-surface-200 shadow-sm">
            <div className="text-2xl font-bold text-agri-600">$46.6B</div>
            <div className="text-xs text-slate-500">ตลาด AI เกษตร 2034</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/80 border border-surface-200 shadow-sm">
            <div className="text-2xl font-bold text-tech-600">26.3%</div>
            <div className="text-xs text-slate-500">CAGR 2025-2034</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/80 border border-surface-200 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">20-30%</div>
            <div className="text-xs text-slate-500">เพิ่มผลผลิต</div>
          </div>
        </motion.div>

        {/* Category Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-agri-200 hover:shadow-xl hover:-translate-y-2 card-shine"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Badge */}
              {category.badge && (
                <span className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-agri-50 to-tech-50 text-agri-700 border border-agri-200/50">
                  {category.badge}
                </span>
              )}

              {/* Icon */}
              <motion.div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg mb-4`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <category.icon className="h-7 w-7" />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-agri-600 transition-colors">{category.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{category.description}</p>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-agri-500/5 to-tech-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-agri-400/20 to-tech-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        {onNavigateToAITools && (
          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={onNavigateToAITools} variant="primary" className="px-10 py-4 text-base shadow-lg shadow-agri-500/30 hover:shadow-xl hover:shadow-agri-500/40 glow-agri-hover">
              <Sparkles className="h-5 w-5" />
              <span>ดูเครื่องมือ AI ทั้งหมด + ลิงก์ดาวน์โหลด</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {/* Info Note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-slate-500">
            💡 อัพเดทล่าสุด: ธันวาคม 2024 | รวมลิงก์และคู่มือการใช้งานภาษาไทย | เทรนด์สู่ปี 2025
          </p>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AiToolsSection;