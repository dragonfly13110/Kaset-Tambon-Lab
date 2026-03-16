import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface MonthData {
  month: string;
  short: string;
  emoji: string;
  activities: string[];
  season: 'hot' | 'rainy' | 'cool';
}

const MONTHS: MonthData[] = [
  { month: 'มกราคม', short: 'ม.ค.', emoji: '🌾', season: 'cool', activities: ['ข้าวนาปรังเจริญเติบโต', 'ปลูกอ้อยชลประทาน', 'มะขามหวาน/สตรอว์เบอร์รีออก', 'ดูแลรักษาพืชฤดูหนาว'] },
  { month: 'กุมภาพันธ์', short: 'ก.พ.', emoji: '☀️', season: 'hot', activities: ['ข้าวนาปรังเจริญเติบโต', 'ปลูกอ้อยชลประทาน', 'เริ่มปลูกผักฤดูร้อน', 'ผลไม้ภาคตะวันออกเริ่มออก'] },
  { month: 'มีนาคม', short: 'มี.ค.', emoji: '🥭', season: 'hot', activities: ['เก็บเกี่ยวข้าวนาปรัง', 'ปลูกมันสำปะหลัง (ต้นฤดูฝน)', 'มะม่วงเริ่มออก', 'ผลไม้ภาคเหนือเริ่มออก'] },
  { month: 'เมษายน', short: 'เม.ย.', emoji: '🌱', season: 'hot', activities: ['เก็บเกี่ยวข้าวนาปรัง (สุดท้าย)', 'ปลูกมันสำปะหลัง', 'ปลูกอ้อยต้นฝน', 'ลิ้นจี่ออกสู่ตลาด'] },
  { month: 'พฤษภาคม', short: 'พ.ค.', emoji: '🌾', season: 'rainy', activities: ['เริ่มปลูกข้าวนาปี', 'ปลูกมันสำปะหลัง', 'ปลูกอ้อยต้นฝน', 'ทุเรียน/เงาะ/มังคุดออก'] },
  { month: 'มิถุนายน', short: 'มิ.ย.', emoji: '🌿', season: 'rainy', activities: ['ปลูกข้าวนาปีต่อเนื่อง', 'เริ่มปลูกผักฤดูฝน', 'ผลไม้ภาคใต้เริ่มออก', 'ดูแลรักษาพืชไร่'] },
  { month: 'กรกฎาคม', short: 'ก.ค.', emoji: '🌧️', season: 'rainy', activities: ['ข้าวนาปีเจริญเติบโต', 'เตรียมดินภาคอีสาน', 'ลำไย/ลองกองเริ่มออก', 'ดูแลรักษาพืช'] },
  { month: 'สิงหาคม', short: 'ส.ค.', emoji: '🌦️', season: 'rainy', activities: ['ข้าวนาปีเจริญเติบโต', 'ดูแลรักษาพืชไร่', 'บำรุงปุ๋ยพืชยืนต้น', 'เฝ้าระวังศัตรูพืช'] },
  { month: 'กันยายน', short: 'ก.ย.', emoji: '🥔', season: 'rainy', activities: ['ข้าวนาปีใกล้เก็บเกี่ยว', 'เก็บมันสำปะหลัง (แป้งสูง)', 'ปลูกอ้อยข้ามแล้ง', 'ส้มโอเริ่มออก'] },
  { month: 'ตุลาคม', short: 'ต.ค.', emoji: '🌽', season: 'rainy', activities: ['เก็บเกี่ยวข้าวนาปี', 'เก็บข้าวโพดรอบหลัก', 'ปลูกอ้อยข้ามแล้ง', 'ส้มเขียวหวานเริ่มออก'] },
  { month: 'พฤศจิกายน', short: 'พ.ย.', emoji: '🚜', season: 'cool', activities: ['เริ่มปลูกข้าวนาปรัง', 'เก็บเกี่ยวอ้อย', 'เริ่มปลูกผักฤดูหนาว', 'ฤดูผักสลัด/กะหล่ำเริ่ม'] },
  { month: 'ธันวาคม', short: 'ธ.ค.', emoji: '❄️', season: 'cool', activities: ['ปลูกข้าวนาปรังต่อเนื่อง', 'เก็บอ้อยต่อเนื่อง', 'ผักฤดูหนาวสมบูรณ์', 'ดูแลข้าวนาปรัง'] },
];

interface CropInfo {
  name: string;
  emoji: string;
  color: string;
  plantMonths: string;
  harvestMonths: string;
  note: string;
}

const CROPS: CropInfo[] = [
  { name: 'ข้าวนาปี', emoji: '🌾', color: 'from-green-500 to-emerald-500', plantMonths: 'พ.ค. - ต.ค.', harvestMonths: 'ต.ค. - ม.ค.', note: 'ฤดูฝน อาศัยน้ำฝน — ช่วงเวลาแล้วแต่พื้นที่ ดูหลักเกณฑ์ทะเบียนเกษตรกร' },
  { name: 'ข้าวนาปรัง', emoji: '🌾', color: 'from-amber-500 to-yellow-500', plantMonths: 'พ.ย. - เม.ย.', harvestMonths: 'มี.ค. - เม.ย.', note: 'ฤดูแล้ง ใช้น้ำชลประทาน — ช่วงเวลาแล้วแต่พื้นที่ ดูคู่มือทะเบียนเกษตรกร' },
  { name: 'อ้อย', emoji: '🎋', color: 'from-lime-500 to-green-500', plantMonths: 'ต.ค. - มิ.ย.', harvestMonths: 'พ.ย. - มี.ค.', note: '3 ฤดูปลูก อายุ 10-18 เดือน' },
  { name: 'มันสำปะหลัง', emoji: '🥔', color: 'from-orange-500 to-amber-500', plantMonths: 'มี.ค. - พ.ค.', harvestMonths: '8-18 เดือน', note: 'แป้งสูงสุด ก.ย.-พ.ย.' },
  { name: 'มะม่วง', emoji: '🥭', color: 'from-yellow-500 to-orange-500', plantMonths: 'ยืนต้น', harvestMonths: 'มี.ค. - พ.ค.', note: 'น้ำดอกไม้สีทองบางคล้า (GI)' },
  { name: 'มะพร้าว', emoji: '🥥', color: 'from-emerald-500 to-teal-500', plantMonths: 'ยืนต้น', harvestMonths: 'ตลอดปี', note: 'น้ำหอมบางคล้า เอกลักษณ์' },
];

const seasonColors: Record<string, string> = {
  hot: 'bg-orange-100 text-orange-700 ring-orange-300/50',
  rainy: 'bg-blue-100 text-blue-700 ring-blue-300/50',
  cool: 'bg-violet-100 text-violet-700 ring-violet-300/50',
};

const seasonLabels: Record<string, string> = {
  hot: '☀️ ฤดูร้อน',
  rainy: '🌧️ ฤดูฝน',
  cool: '❄️ ฤดูหนาว',
};

type ViewMode = 'calendar' | 'crops';

const AgriCalendarSection: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  const currentMonthData = MONTHS[selectedMonth];

  return (
    <motion.section
      id="agri-calendar"
      className="relative py-16 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <Container>
        <SectionTitle
          eyebrow="ปฏิทินการเกษตร"
          title="กิจกรรมเกษตรรายเดือน"
          subtitle="วางแผนการเพาะปลูกและเก็บเกี่ยวตลอดทั้งปี สำหรับพืชเศรษฐกิจสำคัญในพื้นที่"
        />

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-surface-100 p-1 ring-1 ring-surface-200">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'calendar'
                  ? 'bg-white text-agri-700 shadow-sm ring-1 ring-surface-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              📅 ปฏิทินรายเดือน
            </button>
            <button
              onClick={() => setViewMode('crops')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'crops'
                  ? 'bg-white text-agri-700 shadow-sm ring-1 ring-surface-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🌱 ข้อมูลพืชสำคัญ
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Month Selector */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-8">
                {MONTHS.map((m, idx) => (
                  <motion.button
                    key={m.month}
                    onClick={() => setSelectedMonth(idx)}
                    className={`relative flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium transition-all duration-200 border ${
                      selectedMonth === idx
                        ? 'bg-white text-agri-700 shadow-lg border-agri-300 ring-2 ring-agri-200'
                        : 'bg-white/50 text-slate-500 hover:bg-white hover:shadow-sm border-surface-200 hover:border-agri-200'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <span className="font-display">{m.short}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      m.season === 'hot' ? 'bg-orange-400' :
                      m.season === 'rainy' ? 'bg-blue-400' : 'bg-violet-400'
                    }`} />
                  </motion.button>
                ))}
              </div>

              {/* Selected Month Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMonth}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl border border-surface-200 bg-white p-6 md:p-8 shadow-soft"
                >
                  {/* Background Gradient */}
                  <div
                    className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-30 blur-xl"
                    style={{
                      background: currentMonthData.season === 'hot'
                        ? 'radial-gradient(350px circle at 10% 10%, rgba(251,146,60,.15), transparent 40%)'
                        : currentMonthData.season === 'rainy'
                        ? 'radial-gradient(350px circle at 10% 10%, rgba(56,189,248,.15), transparent 40%)'
                        : 'radial-gradient(350px circle at 10% 10%, rgba(139,92,246,.15), transparent 40%)',
                    }}
                  />

                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Month Header */}
                    <div className="flex-shrink-0 text-center md:text-left md:w-48">
                      <div className="text-5xl mb-2">{currentMonthData.emoji}</div>
                      <h3 className="text-2xl font-bold font-display text-slate-800">{currentMonthData.month}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${seasonColors[currentMonthData.season]}`}>
                        {seasonLabels[currentMonthData.season]}
                      </span>
                    </div>

                    {/* Activities */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold font-display text-slate-700 mb-4 uppercase tracking-wide">กิจกรรมเกษตรหลัก</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentMonthData.activities.map((activity, idx) => (
                          <motion.div
                            key={activity}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-surface-50 border border-surface-200"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-agri-100 text-agri-600 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                            <span className="text-sm text-slate-700 font-sans leading-snug">{activity}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Season Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400" /> ฤดูร้อน (ก.พ.-พ.ค.)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400" /> ฤดูฝน (พ.ค.-ต.ค.)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-400" /> ฤดูหนาว (พ.ย.-ม.ค.)</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="crops"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Crops Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CROPS.map((crop, index) => (
                  <motion.div
                    key={crop.name}
                    className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-agri-200 hover:shadow-xl hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Icon Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${crop.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {crop.emoji}
                      </div>
                      <h3 className="text-lg font-bold font-display text-slate-800 group-hover:text-agri-600 transition-colors">{crop.name}</h3>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600 w-16 flex-shrink-0">ปลูก</span>
                        <span className="text-slate-600">{crop.plantMonths}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-amber-600 w-16 flex-shrink-0">เก็บเกี่ยว</span>
                        <span className="text-slate-600">{crop.harvestMonths}</span>
                      </div>
                    </div>

                    {/* Note Badge */}
                    <div className="mt-4 px-3 py-2 rounded-lg bg-agri-50/50 border border-agri-100/50">
                      <p className="text-xs text-agri-700 font-medium">💡 {crop.note}</p>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-agri-400/20 to-tech-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                  </motion.div>
                ))}
              </div>


            </motion.div>
          )}
        </AnimatePresence>

        {/* Source Note */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-slate-400">
            📊 แหล่งข้อมูล: สำนักงานเศรษฐกิจการเกษตร (สศก.) | กรมส่งเสริมการเกษตร | กระทรวงพาณิชย์
          </p>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default AgriCalendarSection;
