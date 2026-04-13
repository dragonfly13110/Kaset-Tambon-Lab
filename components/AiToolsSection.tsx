import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';
import {
  Satellite,
  Wind,
  FileText,
  Paintbrush,
  Sparkles,
  BarChart3,
  Leaf,
  ArrowRight,
  Bot,
} from './Icons';

interface AiToolsSectionProps {
  onNavigateToAITools?: () => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const toolCategories = [
  {
    title: '🇹🇭 AgriNEXT (NECTEC)',
    description:
      'แพลตฟอร์มเกษตรแม่นยำจาก เนคเทค-สวทช. รวม IoT + ดาวเทียม + AI วิเคราะห์สุขภาพพืช ความชื้นดิน จุลภูมิอากาศ แนะนำน้ำ-ปุ๋ย-ยา คาดการณ์ผลผลิต ติดตาม Carbon Footprint สำหรับ ข้าว อ้อย มันสำปะหลัง ทุเรียน ยาง ปาล์ม',
    icon: Satellite,
    color: 'from-emerald-500 to-teal-500',
    badge: '🇹🇭 ไทย 2026',
  },
  {
    title: '🇹🇭 HandySense B-Farm',
    description:
      'แพลตฟอร์ม Smart Farming จาก NECTEC ใช้เซนเซอร์ IoT + AI + IoT ควบคุมฟาร์มอัตโนมัติ ลดต้นทุน เพิ่มผลผลิต เหมาะกับพืชราคาสูงและพืชสมุนไพรไทย เกษตรกรใช้ได้จริง เพิ่มคุณภาพชีวิต',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    badge: '🆕 Thailand 4.0',
  },
  {
    title: '🛰️ Farmonaut - ดาวเทียม AI',
    description:
      'ติดตามสุขภาพพืช ความชื้นดิน การให้น้ำแม่นยำ ด้วยภาพถ่ายดาวเทียม + AI มี Blockchain Traceability, Carbon Footprint, Fleet Management, Crop Insurance Verification สำหรับส่งออก',
    icon: Satellite,
    color: 'from-blue-500 to-cyan-500',
    badge: '🌍 Export Ready',
  },
  {
    title: '🌦️ GenCast (Google) พยากรณ์อากาศ',
    description:
      'AI พยากรณ์อากาศ 15 วัน 50 สถานการณ์ จาก Google DeepMind แม่นยำกว่าแบบเดิม 3-5 วัน ใช้วางแผนเพาะปลูก เตือนภัยน้ำท่วม-ภัยแล้ง ล่วงหน้า',
    icon: Wind,
    color: 'from-sky-500 to-blue-500',
    badge: '⚡ AI Weather',
  },
  {
    title: '🤖 GPT-5.4 & Gemini 3.1 Pro',
    description:
      'Agentic AI: GPT-5.4 (มี.ค. 2026), Gemini 3.1 Pro, Claude Sonnet 4.6 - วิเคราะห์ภาพโรคพืช วางแผนเกษตร 24/7 Multi-step Reasoning ตอบคำถามเกษตรกรภาษาไทย',
    icon: Bot,
    color: 'from-violet-500 to-purple-500',
    badge: '🔥 2026 Trending',
  },
  {
    title: '💧 CropX & Gamaya - วิเคราะห์ดิน',
    description:
      'วัดสุขภาพดิน ความชื้น คาร์บอน แบบเรียลไทม์ + Variable Rate Technology (VRT) ลดปุ๋ย 36-60% รักษาผลผลิต เกษตรแม่นยำระดับเซนติเมตร',
    icon: Leaf,
    color: 'from-teal-500 to-cyan-500',
    badge: '💧 Smart Soil',
  },
  {
    title: '🎨 Nano Banana 2 + Canva AI',
    description:
      'Gemini 3.1 Flash Image, Adobe Firefly 3, Canva AI - สร้างสื่อเกษตร อินโฟกราฟิก โปสเตอร์ ได้ในไม่กี่วินาที ใช้ประชาสัมพันธ์งานส่งเสริมการเกษตร',
    icon: Paintbrush,
    color: 'from-pink-500 to-rose-500',
    badge: '🎨 Nano Banana 2',
  },
  {
    title: '🧠 Digital Twin + Agentic AI',
    description:
      'AI Agent จัดการฟาร์มอัตโนมัติ end-to-end: วิเคราะห์ข้อมูล วางแผน สั่งการ ไม่ต้องป้อนคำสั่งทีละขั้น สร้าง Digital Twin ของฟาร์มจำลองสถานการณ์',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    badge: '🆕 Agentic 2026',
  },
  {
    title: '🔗 Blockchain Traceability',
    description:
      'ติดตามสินค้าเกษตรจากฟาร์มถึงผู้บริโภค กันปลอมแปลง ตรวจสอบย้อนกลับได้ ใช้รับรองมาตรฐาน GAP, Organic, GI สำหรับส่งออกข้าว ยาง ปาล์ม',
    icon: FileText,
    color: 'from-amber-500 to-orange-500',
    badge: '📦 Supply Chain',
  },
];

const AiToolsSection: React.FC<AiToolsSectionProps> = ({ onNavigateToAITools }) => {
  return (
    <motion.section
      id="ai-tools"
      className="relative py-10 md:py-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <Container>
        <SectionTitle
          eyebrow="อัพเดทใหม่ เมษายน 2026"
          title="คลังเครื่องมือ AI เพื่อเกษตรตำบล"
          subtitle="รวมเทคโนโลยี AI ล่าสุดที่กำลังเปลี่ยนโฉมการเกษตรทั่วโลก - ยุค Agentic AI, Agriculture 4.0"
        />

        {/* Highlight Banner */}
        <motion.div
          className="mt-6 p-3 rounded-2xl bg-gradient-to-r from-agri-500/10 via-tech-500/10 to-purple-500/10 border border-agri-200/50 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-slate-700">
            🇹🇭 <span className="font-semibold text-agri-700">Thailand Agriculture 4.0:</span>{' '}
            <span className="text-tech-600 font-medium">AgriNEXT (NECTEC)</span>,{' '}
            <span className="text-tech-600 font-medium">HandySense B-Farm</span>,{' '}
            <span className="text-tech-600 font-medium">GenCast AI</span>,{' '}
            <span className="text-tech-600 font-medium">Farmonaut</span>,{' '}
            <span className="text-tech-600 font-medium">Blockchain Traceability</span>
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
            <div className="text-2xl font-bold text-tech-600">70%+</div>
            <div className="text-xs text-slate-500">ฟาร์มใช้ AI พยากรณ์ 2026</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/80 border border-surface-200 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">36-60%</div>
            <div className="text-xs text-slate-500">ลดปุ๋ยด้วย VRT/AI</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/80 border border-surface-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600">🇹🇭</div>
            <div className="text-xs text-slate-500">AgriNEXT + B-Farm</div>
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
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-agri-600 transition-colors">
                {category.title}
              </h3>
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
            <Button
              onClick={onNavigateToAITools}
              variant="primary"
              className="px-10 py-4 text-base shadow-lg shadow-agri-500/30 hover:shadow-xl hover:shadow-agri-500/40 glow-agri-hover"
            >
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
            💡 อัพเดทล่าสุด: เมษายน 2026 | AgriNEXT (NECTEC), HandySense B-Farm, Farmonaut, GenCast
            AI | Agriculture 4.0 Thailand
          </p>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AiToolsSection;
