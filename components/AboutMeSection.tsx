import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Button from './ui/Button';
import { SKILLS, CONTACTS } from '../constants';
import type { Skill, SkillLevel } from '../types';
import { ArrowRight, X } from './Icons';

// --- Animation Variants ---

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

// --- Skill Components ---

const levelColorMap: Record<SkillLevel, string> = {
  "สอนเพื่อนได้": "bg-agri-50 text-agri-700 ring-agri-600/20",
  "พอตัว": "bg-tech-50 text-tech-700 ring-tech-600/20",
  "พอใช้": "bg-slate-50 text-slate-600 ring-slate-400/20",
  "พอเอาตัวรอด": "bg-slate-50 text-slate-500 ring-slate-300/20",
};

const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { icon: Icon, name, level, details } = skill;
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-x-6 gap-y-2 border-b border-surface-200 py-3 last:border-b-0"
    >
      <div className="flex items-center gap-4 md:col-span-4">
        <Icon className="h-6 w-6 flex-shrink-0 text-agri-500" aria-hidden />
        <h3 className="font-semibold font-display text-slate-800">{name}</h3>
      </div>
      <div className="pl-10 md:pl-0 md:col-span-3">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${levelColorMap[level]}`}>
          {level}
        </span>
      </div>
      <div className="pl-10 md:pl-0 md:col-span-5">
        <p className="text-sm text-slate-600 font-sans">{details}</p>
      </div>
    </motion.div>
  );
};

const SkillsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' as const }}
      >
        <div className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-2xl">
          <div className="flex flex-shrink-0 items-center justify-between border-b border-surface-200 p-4 md:p-6 bg-surface-50/80 backdrop-blur-sm relative z-10">
            <h2 id="skill-modal-title" className="text-xl font-bold font-display text-slate-800">
              ทักษะและความสามารถ
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 transition hover:bg-surface-200 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-agri-500"
              aria-label="ปิด"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <motion.div
            className="flex-1 overflow-y-auto p-4 md:p-6 relative z-10"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {SKILLS.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};


const AboutMeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.section
      id="about-me"
      className="relative scroll-mt-24 py-14 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Container>
        <SectionTitle
          eyebrow="เกี่ยวกับผู้จัดทำ"
          title="ทักษะและเครื่องมือ (Skill Set and Tools)"
          subtitle="ทักษะที่สั่งสมจากประสบการณ์ทำงานจริงในบทบาทเกษตรตำบล"
        />
        <div className="mt-6 text-center">
          <Button variant="soft" onClick={() => setIsModalOpen(true)}>
            <span>คลิกเพื่อดูว่าเกษตรตำบลช่วยอะไรท่านได้บ้าง</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-surface-200 bg-white p-6 shadow-soft md:p-8">
          {/* Modern Gradient Background */}
          <div
            className="absolute inset-0 opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(circle at 10% 10%, rgba(16,185,129,0.1), transparent 50%), radial-gradient(circle at 90% 90%, rgba(56,189,248,0.1), transparent 50%)",
            }}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 relative z-10">
            {/* About Me Info */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-lg font-bold font-display text-slate-800 mb-4">ข้อมูลผู้จัดทำ</h3>
              <ul className="space-y-2 text-sm text-slate-600 font-sans">
                <li><strong className="font-bold text-agri-600">เกิด:</strong> 1992</li>
                <li>นักวิชาการส่งเสริมการเกษตรปฏิบัติการ</li>
                <li>เกษตรตำบล</li>
                <li><strong className="font-bold text-agri-600">งานที่รับผิดชอบ:</strong> งานกลุ่มส่งเสริมและพัฒนาการผลิต, งานประชาสัมพันธ์</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left border-t border-surface-200 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-surface-200 md:pl-8">
              <h3 className="text-lg font-bold font-display text-slate-800 mb-4">ช่องทางการติดต่อ</h3>
              <div className="flex justify-center md:justify-start">
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-3 text-left transition"
                    aria-label={`${contact.label}: ${contact.value}`}
                  >
                    <contact.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-agri-500 transition group-hover:text-agri-600" aria-hidden />
                    <div>
                      <div className="font-medium text-slate-700 transition group-hover:text-agri-600 font-display">{contact.label}</div>
                      <div className="text-sm text-slate-500 transition group-hover:text-slate-700 font-sans">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && <SkillsModal onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
      </Container>
    </motion.section>
  );
};

export default AboutMeSection;