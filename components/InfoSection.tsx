import React from 'react';
import { motion } from 'framer-motion';
import Container from './ui/Container';

// Removed Variants type annotation to fix build error.
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // FIX: Add `as const` to help TypeScript infer a tuple type for the cubic-bezier easing array.
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
  }
};

const InfoSection: React.FC = () => {
  return (
    <section id="info" className="py-10 md:py-12">
      <Container>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">About Me</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <li><strong className="font-medium text-white/80">เกิด:</strong> 1992</li>
            <li>นักวิชาการส่งเสริมการเกษตรปฏิบัติการ</li>
            <li>เกษตรตำบล</li>
            <li><strong className="font-medium text-white/80">งานที่รับผิดชอบ:</strong> งานกลุ่มส่งเสริมและพัฒนาการผลิต, งานประชาสัมพันธ์</li>
          </ul>
        </motion.div>
      </Container>
    </section>
  );
};

export default InfoSection;
