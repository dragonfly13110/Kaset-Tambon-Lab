import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { ArrowLeft, ChevronDown } from '../components/Icons';
import SEO from '../components/SEO';

interface FAQPageProps {
  onNavigateHome: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด', emoji: '📋' },
  { id: 'registration', label: 'ทะเบียนเกษตรกร', emoji: '📝' },
  { id: 'farmbook', label: 'แอป Farmbook', emoji: '📱' },
  { id: 'subsidy', label: 'เงินช่วยเหลือ', emoji: '💰' },
  { id: 'general', label: 'ทั่วไป', emoji: '❓' },
];

const FAQ_DATA: FAQItem[] = [
  {
    category: 'registration',
    question: 'ทะเบียนเกษตรกรคืออะไร? ทำไมต้องขึ้นทะเบียน?',
    answer: 'ทะเบียนเกษตรกรคือข้อมูลแสดงสถานภาพและการประกอบอาชีพเกษตรของครัวเรือน จำเป็นสำหรับ: เข้าร่วมโครงการช่วยเหลือจากรัฐ, รับเงินชดเชยกรณีภัยพิบัติ, ประกันภัยข้าวนาปี/ข้าวโพด, รับเงินสนับสนุนต้นทุนการผลิต (ไร่ละ 1,000-2,000 บาท)',
  },
  {
    category: 'registration',
    question: 'ใครขึ้นทะเบียนเกษตรกรได้บ้าง?',
    answer: 'บุคคลธรรมดา สัญชาติไทย บรรลุนิติภาวะ ประกอบอาชีพเกษตรเป็นอาชีพหลักหรือรองก็ได้ โดย 1 ทะเบียนบ้าน = 1 ครัวเรือน = ตัวแทน 1 คน ทำเกษตรบนที่ดินผู้อื่นก็ขึ้นทะเบียนได้ ต้องมีรายได้จากเกษตรเกิน 8,000 บาท/ปี',
  },
  {
    category: 'registration',
    question: 'ขึ้นทะเบียนได้ที่ไหน?',
    answer: 'รายเดิม แปลงเดิม: สนง.เกษตรอำเภอ, อปท., อกม. หรือแอป Farmbook | รายใหม่/เพิ่มแปลง: สนง.เกษตรอำเภอที่ตั้งแปลง หรือ e-Form ผ่าน efarmer.doae.go.th',
  },
  {
    category: 'registration',
    question: 'เอกสารที่ต้องเตรียมมีอะไรบ้าง?',
    answer: 'รายเดิม แปลงเดิม: บัตรประชาชนตัวจริงเท่านั้น | รายใหม่/เพิ่มแปลง: บัตรประชาชนตัวจริง + สำเนาหลักฐานการถือครองที่ดิน + แบบคำร้อง ทบก.01 (บางกรณีต้องมีผู้นำหมู่บ้านรับรอง)',
  },
  {
    category: 'registration',
    question: 'ขึ้นทะเบียนได้เมื่อไหร่?',
    answer: 'พืชอายุสั้น (ข้าว, พืชไร่, ผัก): ภายใน 15 วันหลังปลูก และไม่เกิน 60 วันก่อนเก็บเกี่ยว | ไม้ผล/ไม้ยืนต้น: หลังปลูก 30 วันขึ้นไป ปรับปรุงข้อมูลทุกปี | ⚠️ หากไม่ปรับปรุงข้อมูลติดต่อกัน 3 ปี จะถูกยกเลิกทะเบียน',
  },
  {
    category: 'farmbook',
    question: 'แอป Farmbook ใช้ทำอะไรได้?',
    answer: 'สมุดทะเบียนเกษตรกรดิจิทัล ใช้แจ้ง/ปรับปรุงข้อมูลการเพาะปลูก, ตรวจสอบสถานะการขึ้นทะเบียน, ตรวจสอบสิทธิ์โครงการช่วยเหลือจากภาครัฐ, สำรวจสมาชิกในครัวเรือน รองรับทั้ง Android และ iOS',
  },
  {
    category: 'farmbook',
    question: 'Farmbook ใช้ได้เฉพาะรายเดิมใช่ไหม?',
    answer: 'ใช่ — แอป Farmbook ใช้ได้เฉพาะรายเดิม แปลงเดิมเท่านั้น หากเป็นรายใหม่หรือเพิ่มแปลงใหม่ ต้องไปที่สำนักงานเกษตรอำเภอ หรือใช้ e-Form ผ่านเว็บ efarmer.doae.go.th',
  },
  {
    category: 'farmbook',
    question: 'ใช้ Farmbook แล้วมีปัญหา ทำอย่างไร?',
    answer: 'ปัญหาที่พบบ่อย: ข้อมูลไม่อัปเดตทันที (รอเจ้าหน้าที่ตรวจสอบ), ภาพถ่ายขนาดใหญ่อัปโหลดช้า | ติดต่อสอบถาม: Facebook @digitaldoae / Line @yzd6514b / โทร 02-579-3926 ในวัน-เวลาราชการ',
  },
  {
    category: 'subsidy',
    question: 'เงินช่วยเหลือชาวนาไร่ละ 1,000 บาท ต้องทำอะไรบ้าง?',
    answer: 'เงื่อนไข: 1) ขึ้นทะเบียนเกษตรกรผู้ปลูกข้าว (นาปี/นาปรัง) 2) ปรับปรุงทะเบียนให้เป็นปีการผลิต 2568/69 3) มีบัญชี ธ.ก.ส. ตรงชื่อกับทะเบียนเกษตรกร (เคลื่อนไหวภายใน 6 เดือน) 4) ผ่านการทำประชาคมหมู่บ้าน | สูงสุด: 10 ไร่ = 10,000 บาท/ครัวเรือน',
  },
  {
    category: 'subsidy',
    question: 'ตรวจสอบสิทธิ์รับเงินช่วยเหลือได้ที่ไหน?',
    answer: 'ตรวจสอบได้ 3 ช่องทาง: 1) แอป BAAC Mobile ของ ธ.ก.ส. 2) เว็บ chongkho.inbaac.com 3) เว็บ efarmer.doae.go.th/checkFarmer — ทุกช่องทางใช้เลขบัตรประชาชน 13 หลัก',
  },
  {
    category: 'subsidy',
    question: 'ประสบภัยพิบัติ (น้ำท่วม/แล้ง) ได้ชดเชยเท่าไหร่?',
    answer: 'อัตราชดเชย (ไม่เกิน 30 ไร่ต่อครัวเรือน): ข้าว 1,340 บาท/ไร่ | พืชไร่/พืชผัก 1,980 บาท/ไร่ | ไม้ผล/ไม้ยืนต้น 4,048 บาท/ไร่ | เงื่อนไข: ต้องขึ้นทะเบียนก่อนเกิดภัย + แจ้ง สนง.เกษตรอำเภอภายใน 15 วันหลังภัยสงบ',
  },
  {
    category: 'subsidy',
    question: 'โครงการประกันภัยข้าวนาปีคืออะไร?',
    answer: 'รัฐบาลอุดหนุนค่าเบี้ยประกันให้เกษตรกรผู้ปลูกข้าว หากประสบภัย (น้ำท่วม/ภัยแล้ง/ศัตรูพืช) จะได้รับเงินชดเชยตามกรมธรรม์ ต้องขึ้นทะเบียนเกษตรกรก่อน ขณะนี้กำลังศึกษาขยายไปยังมันสำปะหลังและพืชอื่น',
  },
  {
    category: 'general',
    question: 'ทะเบียนบ้านอยู่คนละอำเภอกับแปลง ต้องทำอย่างไร?',
    answer: 'ให้ยื่นที่สำนักงานเกษตรอำเภอที่ตั้งแปลงหลัก (อำเภอที่มีจำนวนแปลงมากที่สุด) ไม่จำเป็นต้องมีทะเบียนบ้านอยู่ในอำเภอเดียวกัน',
  },
  {
    category: 'general',
    question: 'ที่ดินไม่มีเอกสารสิทธิ์ ขึ้นทะเบียนได้ไหม?',
    answer: 'ได้ — สามารถขึ้นทะเบียนได้ทั้งในพื้นที่ที่มีและไม่มีเอกสารสิทธิ์ รวมถึงทุกรูปแบบการถือครอง (ที่ตัวเอง / เช่า / ทำฟรี / ที่สาธารณประโยชน์)',
  },
  {
    category: 'general',
    question: 'มาตรการพักชำระหนี้ ธ.ก.ส. มีเงื่อนไขอย่างไร?',
    answer: 'มาตรการพักชำระหนี้เงินต้นและดอกเบี้ย สำหรับลูกหนี้รายย่อยที่มีหนี้ไม่เกิน 300,000 บาท (ณ 30 ก.ย. 2566) โดย ธ.ก.ส. จะให้คำแนะนำพัฒนาอาชีพควบคู่ไปด้วย',
  },
];

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

const FAQAccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void; index: number }> = ({ item, isOpen, onClick, index }) => {
  const categoryEmoji = FAQ_CATEGORIES.find(c => c.id === item.category)?.emoji || '❓';

  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-agri-300 bg-white shadow-lg ring-1 ring-agri-100'
          : 'border-surface-200 bg-white/80 hover:border-agri-200 hover:shadow-sm'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        onClick={onClick}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-shrink-0 mt-0.5 text-lg">{categoryEmoji}</span>
        <span className="flex-1 text-sm font-semibold text-slate-800 font-display leading-snug pr-2">
          {item.question}
        </span>
        <motion.span
          className="flex-shrink-0 mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-5 w-5 transition-colors ${isOpen ? 'text-agri-500' : 'text-slate-400'}`} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="ml-8 border-l-2 border-agri-200 pl-4">
                <p className="text-sm text-slate-600 font-sans leading-relaxed whitespace-pre-line">
                  {item.answer.split(' | ').map((part, i) => (
                    <span key={i}>
                      {i > 0 && <><br /><br /></>}
                      {part}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPage: React.FC<FAQPageProps> = ({ onNavigateHome }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFAQs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO
        title="FAQ สำหรับเกษตรกร - Kaset Tambon Lab"
        description="คำถามที่พบบ่อยสำหรับเกษตรกร เรื่องทะเบียนเกษตรกร แอป Farmbook เงินช่วยเหลือ สิทธิประโยชน์ และข้อมูลทั่วไป"
        keywords="FAQ เกษตรกร, ทะเบียนเกษตรกร, Farmbook, เงินช่วยเหลือ, ประกันภัยข้าว, ชดเชยภัยพิบัติ"
      />
      <motion.div variants={pageVariants} initial="hidden" animate="visible" className="relative min-h-screen z-10">

        <div className="relative py-8">
          <Container>
            <div className="inline-block rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/30 p-1">
              <Button onClick={onNavigateHome} variant="soft">
                <ArrowLeft className="h-4 w-4" />
                <span>กลับหน้าหลัก</span>
              </Button>
            </div>
          </Container>
        </div>

        <main className="relative pb-20">
          <Container>
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 p-8 mb-10">
              <SectionTitle
                eyebrow="คำถามที่พบบ่อย"
                title="FAQ เกษตร"
                subtitle="รวมคำตอบจากคำถามที่เกษตรกรถามบ่อยที่สุด"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FAQ_CATEGORIES.map((cat) => {
                const count = cat.id === 'all' ? FAQ_DATA.length : FAQ_DATA.filter(f => f.category === cat.id).length;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                      activeCategory === cat.id
                        ? 'bg-white text-agri-700 shadow-md border-agri-300 ring-2 ring-agri-100'
                        : 'bg-white/60 text-slate-500 hover:bg-white hover:text-slate-700 border-surface-200 hover:border-agri-200'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeCategory === cat.id ? 'bg-agri-100 text-agri-700' : 'bg-surface-100 text-slate-400'
                    }`}>{count}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              <AnimatePresence mode="sync">
                {filteredFAQs.map((faq, index) => (
                  <FAQAccordionItem
                    key={`${activeCategory}-${faq.question}`}
                    item={faq}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Help Note */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-agri-500/10 via-tech-500/10 to-purple-500/10 border border-agri-200/50 px-6 py-3">
                <span className="text-lg">💬</span>
                <p className="text-sm text-slate-600">
                  มีคำถามเพิ่มเติม?{' '}
                  <a
                    href="https://www.facebook.com/RebelliousKasetTambon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-agri-600 hover:text-agri-700 underline underline-offset-2 transition-colors"
                  >
                    ติดต่อผ่าน Facebook
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Source */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-slate-400">
                📊 อ้างอิง: กรมส่งเสริมการเกษตร (doae.go.th) | ธ.ก.ส. | สำนักงานเศรษฐกิจการเกษตร | อัปเดต มี.ค. 2568
              </p>
            </motion.div>
          </Container>
        </main>
      </motion.div>
    </div>
  );
};

export default FAQPage;
