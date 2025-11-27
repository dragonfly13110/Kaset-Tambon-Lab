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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

const toolCategories = [
  {
    title: 'วินิจฉัยโรค/แมลงจากภาพ',
    description: 'แอปพลิเคชันที่ช่วยระบุโรคพืช แมลง และวัชพืชเบื้องต้นจากภาพถ่าย',
    icon: Camera,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'สำรวจแปลงด้วยภาพถ่ายดาวเทียม',
    description: 'เครื่องมือสำรวจและติดตามการเปลี่ยนแปลงในแปลงเพาะปลูกจากระยะไกล',
    icon: Satellite,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'พยากรณ์-เรดาร์ฝน',
    description: 'ติดตามสภาพอากาศและกลุ่มฝนแบบเรียลไทม์',
    icon: Wind,
    color: 'from-sky-500 to-blue-500'
  },
  {
    title: 'สรุปเอกสาร-ค้นหา-แปล-ถอดเสียง',
    description: 'เครื่องมือ AI ผู้ช่วยสำหรับงานเอกสาร ลดเวลาทำงานซ้ำซ้อน',
    icon: FileText,
    color: 'from-violet-500 to-purple-500'
  },
  {
    title: 'สร้างสื่อครบวงจร',
    description: 'เครื่องมือ "ครบจบในแผ่น" สำหรับวางเลย์เอาต์และสร้างสื่ออัตโนมัติ',
    icon: Paintbrush,
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'สร้างภาพ AI สำหรับประกอบสื่อ',
    description: 'เครื่องมือ AI สำหรับสร้างและแก้ไขภาพประกอบตามคำสั่ง',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'สร้างอินโฟกราฟิก/พรีเซนต์อัตโนมัติ',
    description: 'เครื่องมือที่ใช้ AI ช่วยร่างอินโฟกราฟิก ชาร์ต และสไลด์นำเสนอ',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'ไอคอนและแอนิเมชัน',
    description: 'แหล่งรวมไอคอนและภาพเคลื่อนไหวเพื่อเสริมความน่าสนใจให้สื่อ',
    icon: Component,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'ฟอนต์ไทยแนะนำ (ฟรี)',
    description: 'ฟอนต์ภาษาไทยที่อ่านง่าย ปลอดภัย และเหมาะสำหรับงานราชการ',
    icon: Type,
    color: 'from-slate-500 to-gray-500'
  },
];

const AiToolsSection: React.FC<AiToolsSectionProps> = ({ onNavigateToAITools }) => {
  return (
    <motion.section
      id="ai-tools"
      className="relative py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <Container>
        <SectionTitle
          eyebrow="AI เสริมประสิทธิภาพ"
          title="คลังเครื่องมือ AI เพื่อเกษตรตำบล"
          subtitle="รวมแอปพลิเคชันและเว็บไซต์ที่เป็นประโยชน์ต่องานส่งเสริมการเกษตร"
        />

        {/* Category Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-agri-200 hover:shadow-lg hover:-translate-y-1"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-slate-800 mb-2">{category.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{category.description}</p>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-agri-500/5 to-tech-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        {onNavigateToAITools && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={onNavigateToAITools} variant="primary" className="px-8 py-4 text-base shadow-lg shadow-agri-500/30 hover:shadow-xl hover:shadow-agri-500/40 transform hover:scale-105 transition-all duration-300">
              <Sparkles className="h-5 w-5" />
              <span>ดูเครื่องมือ AI ทั้งหมด</span>
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
            💡 คลิกเพื่อดูรายละเอียดเครื่องมือ AI แต่ละหมวดหมู่และลิงก์ดาวน์โหลด
          </p>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AiToolsSection;