import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import { ShieldCheck, BookOpen, Sparkles } from './Icons';

// Removed Variants type annotation to fix build error.
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // FIX: Add `as const` to help TypeScript infer a tuple type for the cubic-bezier easing array.
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const, staggerChildren: 0.2 }
  }
};

// Removed Variants type annotation to fix build error.
const textBlockVariants = {
  hidden: { opacity: 0, x: -30 },
  // FIX: Add `as const` to help TypeScript infer a literal type, resolving the framer-motion type error for 'ease'.
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

// Removed Variants type annotation to fix build error.
const visualBlockVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  // FIX: Add `as const` to help TypeScript infer a literal type, resolving the framer-motion type error for 'ease'.
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const iconAnimation = {
  y: ["-4px", "4px"],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "mirror" as const,
    // FIX: Add `as const` to ensure TypeScript infers a literal type for 'easeInOut', resolving framer-motion type error.
    ease: "easeInOut" as const
  }
};

const VisionSection: React.FC = () => {
  return (
    <motion.section
      id="vision"
      className="relative py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Container>
        <SectionTitle
          eyebrow="วิสัยทัศน์ของเรา"
          title="เครื่องมือที่สร้างมาเพื่อคนทำงาน"
          subtitle="เราเชื่อว่าเทคโนโลยีที่ดีควรจะเรียบง่าย ทรงพลัง และเข้าถึงได้"
        />
        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div variants={textBlockVariants} className="space-y-4 text-slate-600 font-sans text-lg">
            <p className="leading-relaxed">
              เป้าหมายหลักของ Kaset Tambon Lab คือการเสริมศักยภาพให้เกษตรตำบลและเจ้าหน้าที่ส่งเสริมการเกษตร ด้วยเครื่องมือดิจิทัลที่ทันสมัย ใช้งานง่าย และตอบโจทย์การทำงานในพื้นที่จริง เรามุ่งมั่นที่จะลดช่องว่างระหว่างข้อมูลกับการปฏิบัติงาน ทำให้การวางแผน การให้คำแนะนำ และการตัดสินใจมีประสิทธิภาพมากยิ่งขึ้น
            </p>
            <p className="leading-relaxed">
              เครื่องมือทุกชิ้นถูกออกแบบโดยคำนึงถึงความเร็วและความสะดวกในการเข้าถึง ไม่ว่าจะผ่านคอมพิวเตอร์หรือโทรศัพท์มือถือ เพื่อให้คุณสามารถทำงานได้อย่างราบรื่นทุกที่ทุกเวลา เราต้องการสร้างประสบการณ์ที่ดีที่สุด ลดความซับซ้อนที่ไม่จำเป็น และทำให้เทคโนโลยีเป็นผู้ช่วยที่แท้จริงของคุณ
            </p>
            <p className="font-display font-medium text-agri-600 border-l-4 border-agri-400 pl-4 bg-agri-50/50 py-2 rounded-r-lg">
              นี่คือโปรเจกต์ที่พัฒนาอย่างต่อเนื่อง โดยรับฟังเสียงจากผู้ใช้งานจริงเพื่อปรับปรุงและสร้างสรรค์สิ่งใหม่ๆ ที่สร้างผลกระทบเชิงบวกให้กับการเกษตรไทย
            </p>
          </motion.div>
          <motion.div variants={visualBlockVariants} className="relative flex h-64 items-center justify-center rounded-3xl border border-surface-200 bg-white p-6 shadow-soft md:h-80 overflow-hidden">
            {/* Modern Gradient Background */}
            <div
              className="absolute inset-0 opacity-30 blur-2xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15), transparent 60%)",
              }}
            />

            <motion.div animate={iconAnimation} className="absolute top-8 left-12 grid h-16 w-16 place-items-center rounded-2xl bg-surface-50 text-slate-400 ring-1 ring-inset ring-surface-200 shadow-sm">
              <BookOpen className="h-7 w-7" />
            </motion.div>

            <motion.div animate={{ ...iconAnimation, transition: { ...iconAnimation.transition, delay: 0.5 } }} className="z-10 grid h-20 w-20 place-items-center rounded-2xl bg-white text-agri-500 ring-1 ring-inset ring-agri-100 shadow-lg border border-surface-100">
              <ShieldCheck className="h-10 w-10" />
            </motion.div>

            <motion.div animate={{ ...iconAnimation, transition: { ...iconAnimation.transition, delay: 0.2 } }} className="absolute bottom-8 right-12 grid h-16 w-16 place-items-center rounded-2xl bg-surface-50 text-slate-400 ring-1 ring-inset ring-surface-200 shadow-sm">
              <Sparkles className="h-7 w-7" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default VisionSection;
