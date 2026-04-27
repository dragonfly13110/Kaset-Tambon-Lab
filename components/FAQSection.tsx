import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

interface FAQSectionProps {
  onNavigateToFAQ: () => void;
}

const TOP_QUESTIONS = [
  { emoji: '📝', question: 'ทะเบียนเกษตรกรคืออะไร? ทำไมต้องขึ้นทะเบียน?' },
  { emoji: '📱', question: 'แอป Farmbook ใช้ทำอะไรได้?' },
  { emoji: '💰', question: 'เงินช่วยเหลือชาวนาไร่ละ 1,000 บาท ต้องทำอะไรบ้าง?' },
  { emoji: '🌾', question: 'ประสบภัยพิบัติ (น้ำท่วม/แล้ง) ได้ชดเชยเท่าไหร่?' },
];

const FAQSection: React.FC<FAQSectionProps> = ({ onNavigateToFAQ }) => {
  return (
    <motion.section
      id="faq"
      className="relative py-6 md:py-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <Container>
        <SectionTitle
          eyebrow="คำถามที่พบบ่อย"
          title="FAQ สำหรับเกษตรกร"
          subtitle="รวมคำตอบจากคำถามที่เกษตรกรถามบ่อยที่สุด เรื่องทะเบียนเกษตรกร เงินช่วยเหลือ และสิทธิประโยชน์ต่างๆ"
        />

        {/* Preview Questions */}
        <div className="mx-auto max-w-3xl space-y-2 mb-6">
          {TOP_QUESTIONS.map((q, index) => (
            <motion.div
              key={q.question}
              className="flex items-center gap-3 p-3 rounded-2xl border border-surface-200 bg-white/80 hover:border-agri-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
              onClick={onNavigateToFAQ}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <span className="flex-shrink-0 text-lg">{q.emoji}</span>
              <span className="flex-1 text-sm font-semibold text-slate-700 font-display">{q.question}</span>
              <span className="flex-shrink-0 text-slate-400 text-xs">→</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            onClick={onNavigateToFAQ}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-agri-500 to-agri-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-agri-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-agri-500/40 hover:-translate-y-0.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>💬</span>
            <span>ดู FAQ ทั้งหมด 15 ข้อ</span>
          </motion.button>
        </div>
      </Container>
    </motion.section>
  );
};

export default FAQSection;
