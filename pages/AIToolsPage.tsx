import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import {
    ArrowLeft,
    Camera,
    Satellite,
    Wind,
    FileText,
    Paintbrush,
    GooglePlay,
    Apple,
    GitHub,
    LinkIcon,
    Globe,
    ChevronDown,
    Map,
    Sparkles,
    BarChart3,
    Component,
    Type,
} from '../components/Icons';
import SEO from '../components/SEO';

interface AIToolsPageProps {
    onNavigateHome: () => void;
}

// --- Data Structures ---

interface ToolLink {
    label: string;
    href: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface AiTool {
    name: string;
    description: string;
    links: ToolLink[];
}

interface AiToolCategory {
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    tools: AiTool[];
    usageGuide?: string;
}

// --- Data ---

const aiToolCategories: ReadonlyArray<AiToolCategory> = [
    {
        title: 'วินิจฉัยโรค/แมลงจากภาพ',
        description: 'แอปพลิเคชันที่ช่วยระบุโรคพืช แมลง และวัชพืชเบื้องต้นจากภาพถ่าย',
        icon: Camera,
        tools: [
            {
                name: 'PlantVillage Nuru',
                description: 'แอปผู้ช่วยตรวจโรค/แมลง "แบบออฟไลน์" บนมือถือ (วิจัยโดยทีม Penn State/CGIAR) เหมาะเวลาลงแปลงไม่มีเน็ต',
                links: [
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=plantvillage.nuru', icon: GooglePlay },
                    { label: 'App Store', href: 'https://apps.apple.com/app/plantvillage-nuru/id1441395371', icon: Apple },
                ],
            },
            {
                name: 'Google Lens',
                description: 'ยิงกล้องเพื่อระบุพืช/แมลง (ใช้เทียบชนิด, ตัวเบียน/ตัวห้ำ ได้คร่าวๆ ก่อนลงคู่มือ)',
                links: [{ label: 'เว็บไซต์', href: 'https://lens.google/', icon: LinkIcon }],
            },
            {
                name: 'iNaturalist / Seek',
                description: 'ชุมชนผู้เชี่ยวชาญช่วยยืนยันชนิดสิ่งมีชีวิตจากภาพ (ฟรีและได้รับความนิยมสูง)',
                links: [
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=org.inaturalist.android', icon: GooglePlay },
                    { label: 'เว็บไซต์', href: 'https://www.inaturalist.org/', icon: Globe },
                ],
            },
            {
                name: 'Pl@ntNet',
                description: 'ระบุชนิดพืชจากภาพ (งานพืชป่า/วัชพืชข้างแปลง), ฟรีและมีฐานข้อมูลใหญ่',
                links: [
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=org.plantnet', icon: GooglePlay },
                    { label: 'เว็บไซต์', href: 'https://plantnet.org/en/', icon: Globe },
                ],
            },
        ],
        usageGuide: 'ให้ Nuru ชี้ "ความเป็นไปได้" → ยืนยันด้วยอาการในแปลง/ประวัติสภาพอากาศ และถ่ายหลายใบหลายมุมก่อนสรุป',
    },
    {
        title: 'สำรวจแปลงด้วยภาพถ่ายดาวเทียม',
        description: 'เครื่องมือสำรวจและติดตามการเปลี่ยนแปลงในแปลงเพาะปลูกจากระยะไกล',
        icon: Satellite,
        tools: [
            {
                name: 'OneSoil',
                description: 'สร้างขอบเขตแปลงอัตโนมัติ, ดู NDVI/GDD/ฝนย้อนหลัง, ทำบันทึกสเกาท์ในแอปเดียว (ฟรี)',
                links: [{ label: 'เว็บไซต์', href: 'https://onesoil.ai/', icon: Globe }],
            },
            {
                name: 'Sentinel Hub EO Browser',
                description: 'เปิดภาพ Sentinel/ดาวเทียมเสรี, คำนวณ NDVI เอง, ทำไทม์แลปส์ได้ฟรี',
                links: [{ label: 'EO Browser', href: 'https://apps.sentinel-hub.com/eo-browser/', icon: LinkIcon }],
            },
            {
                name: 'NASA FIRMS (VIIRS/MODIS)',
                description: 'แผนที่จุดความร้อน/ไฟ (NRT) ส่งอีเมลแจ้งเตือนได้ เหมาะงาน "งดเผา/ติดตาม Hotspot"',
                links: [{ label: 'เว็บไซต์', href: 'https://firms.modaps.eosdis.nasa.gov/', icon: Globe }],
            },
            {
                name: 'Global Forest Watch',
                description: 'เฝ้าระวังการรบกวนพืชพรรณ/ป่า (มี DIST-ALERT ใหม่) ใช้ประกอบงานกำกับพื้นที่',
                links: [{ label: 'แผนที่', href: 'https://www.globalforestwatch.org/map/', icon: Map }],
            },
        ],
    },
    {
        title: 'พยากรณ์-เรดาร์ฝน',
        description: 'ติดตามสภาพอากาศและกลุ่มฝนแบบเรียลไทม์ เพื่อวางแผนการทำงานในแปลง',
        icon: Wind,
        tools: [
            {
                name: 'กรมอุตุนิยมวิทยา (TMD)',
                description: 'เรดาร์ฝน, Radar GIS/Composite, แอป Thai Weather (ทางการ)',
                links: [
                    { label: 'เว็บไซต์', href: 'https://www.tmd.go.th/', icon: Globe },
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.tmddev.thaiweather', icon: GooglePlay },
                    { label: 'App Store', href: 'https://apps.apple.com/app/thai-weather/id734275345', icon: Apple },
                ],
            },
            {
                name: 'Windy',
                description: 'แผนที่สภาพอากาศ/เรดาร์หลายโมเดลระดับโลก เหมาะหา "หน้าต่างพ่น/เก็บเกี่ยว"',
                links: [
                    { label: 'เว็บไซต์', href: 'https://www.windy.com/', icon: Globe },
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.windyty.android', icon: GooglePlay },
                ],
            },
            {
                name: 'meteoblue',
                description: 'พยากรณ์ละเอียด, เรดาร์/ภาพดาวเทียม, มีแอปมือถือ (ฟรี มีโฆษณา)',
                links: [
                    { label: 'เว็บไซต์', href: 'https://www.meteoblue.com/', icon: Globe },
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.meteoblue.droid', icon: GooglePlay },
                ],
            },
        ],
    },
    {
        title: 'สรุปเอกสาร-ค้นหา-แปล-ถอดเสียง',
        description: 'เครื่องมือ AI ผู้ช่วยสำหรับงานเอกสาร ลดเวลาทำงานซ้ำซ้อน และเพิ่มประสิทธิภาพ',
        icon: FileText,
        tools: [
            {
                name: 'ChatGPT (Free tier)',
                description: 'ใช้ GPT-ระดับสูงได้บนฟรีแพลน พร้อมค้นเว็บ/อัปโหลดไฟล์แบบจำกัด',
                links: [{ label: 'เว็บไซต์', href: 'https://chatgpt.com/', icon: LinkIcon }],
            },
            {
                name: 'Google Gemini',
                description: 'ผู้ช่วยฟรีจากกูเกิล ใช้ร่างเอกสาร-วางแผน-วิเคราะห์ภาพได้',
                links: [
                    { label: 'เว็บไซต์', href: 'https://gemini.google.com/', icon: LinkIcon },
                    { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.google.android.apps.bard', icon: GooglePlay },
                ],
            },
            {
                name: 'Claude (Free plan)',
                description: 'เก่งสรุปเอกสารยาว วางแผนโครงการ มีข้อจำกัดปริมาณต่ารอบ',
                links: [{ label: 'เว็บไซต์', href: 'https://claude.ai/', icon: LinkIcon }],
            },
            {
                name: 'Perplexity (Free)',
                description: 'ค้น-สรุปพร้อมอ้างอิงสด เหมาะไล่ข่าว/ระเบียบที่เปลี่ยนเร็ว',
                links: [{ label: 'เว็บไซต์', href: 'https://www.perplexity.ai/', icon: LinkIcon }],
            },
            {
                name: 'OpenAI Whisper',
                description: 'ถอดเสียงภาษาไทยแม่น ทำเซิร์ฟเวอร์ภายในหน่วยงานได้ (โอเพ่นซอร์ส)',
                links: [{ label: 'GitHub', href: 'https://github.com/openai/whisper', icon: GitHub }],
            },
            {
                name: 'DeepL (รองรับ "ไทย" แล้ว)',
                description: 'ตัวท็อปด้านแปลคุณภาพสูง มีเวอร์ชันฟรีใช้งานทั่วไป',
                links: [{ label: 'เว็บไซต์', href: 'https://www.deepl.com/', icon: Globe }],
            },
        ],
    },
    {
        title: 'สร้างสื่อครบวงจร (Layout & Automation)',
        description: 'เครื่องมือ "ครบจบในแผ่น" สำหรับวางเลย์เอาต์และสร้างสื่ออัตโนมัติ',
        icon: Paintbrush,
        tools: [
            {
                name: 'Canva (Magic Studio)',
                description: 'ใส่หัวข้อ/ไฟล์ → สร้างเทมเพลตอัตโนมัติ พร้อม Magic Write, Edit, Media. ฟรีมีโควตา AI จำกัด',
                links: [{ label: 'Canva Magic', href: 'https://www.canva.com/magic/', icon: LinkIcon }],
            },
            {
                name: 'Adobe Express',
                description: 'เทมเพลตทางการเยอะ ใช้ Generative AI (Firefly) ในตัว (มีเครดิตฟรี) เหมาะกับงานที่ห่วงเรื่องลิขสิทธิ์',
                links: [{ label: 'Adobe Express', href: 'https://www.adobe.com/express/', icon: LinkIcon }],
            },
            {
                name: 'Microsoft Designer',
                description: 'ตัวช่วยออกแบบอัตโนมัติ + text-to-image ใช้ฟรีด้วยบัญชี Microsoft เหมาะทำโพสต์/ใบประชาสัมพันธ์เร็วๆ',
                links: [{ label: 'MS Designer', href: 'https://designer.microsoft.com/', icon: LinkIcon }],
            },
        ],
    },
    {
        title: 'สร้างภาพ AI สำหรับประกอบสื่อ',
        description: 'เครื่องมือ AI สำหรับสร้างและแก้ไขภาพประกอบตามคำสั่ง (prompt)',
        icon: Sparkles,
        tools: [
            {
                name: 'Adobe Firefly',
                description: 'จุดแข็งคือ "commercially safe" และมีเครดิตฟรีรายเดือน ใช้ทำภาพ, เวกเตอร์, ข้อความเอฟเฟกต์',
                links: [{ label: 'Adobe Firefly', href: 'https://www.adobe.com/products/firefly.html', icon: LinkIcon }],
            },
            {
                name: 'Ideogram',
                description: 'เด่นเรื่อง "ตัวหนังสือบนภาพ" พิมพ์ตัวอักษรติดภาพได้เนียน เหมาะทำไตเติลใหญ่ๆ',
                links: [{ label: 'Ideogram', href: 'https://ideogram.ai/', icon: LinkIcon }],
            },
            {
                name: 'Leonardo.ai',
                description: 'มีโควตาฟรีรายวัน คุณภาพดี และมีโมเดล/พรีเซ็ตให้เลือกหลากหลาย',
                links: [{ label: 'Leonardo.ai', href: 'https://leonardo.ai/', icon: LinkIcon }],
            },
            {
                name: 'Clipdrop',
                description: 'เครื่องมือฟรีที่จำเป็น เช่น Remove Background, Cleanup, Upscale และ Text-to-Image',
                links: [{ label: 'Clipdrop', href: 'https://clipdrop.co/', icon: LinkIcon }],
            },
            {
                name: 'Recraft',
                description: 'เด่นเรื่อง AI → เวกเตอร์ (SVG/Lottie) สร้างไอคอน/โลโก้คมชัดสำหรับงานพิมพ์',
                links: [{ label: 'Recraft', href: 'https://www.recraft.ai/', icon: LinkIcon }],
            },
            {
                name: 'Krea',
                description: 'ฟรีไทร์สำหรับสร้าง/แก้ภาพแบบเรียลไทม์, อัปสเกล, และสร้างวิดีโอ',
                links: [{ label: 'Krea', href: 'https://krea.ai/', icon: LinkIcon }],
            },
        ],
    },
    {
        title: 'สร้างอินโฟกราฟิก/พรีเซนต์อัตโนมัติ',
        description: 'เครื่องมือที่ใช้ AI ช่วยร่างอินโฟกราฟิก, ชาร์ต, และสไลด์นำเสนอ',
        icon: BarChart3,
        tools: [
            {
                name: 'Piktochart AI',
                description: 'ใส่หัวข้อ/ข้อความ/ไฟล์ → ให้ AI ร่างอินโฟกราฟิก/กราฟให้ (มีเครดิตฟรี)',
                links: [{ label: 'Piktochart', href: 'https://piktochart.com/generative-ai/', icon: LinkIcon }],
            },
            {
                name: 'Infogram (AI Infographic)',
                description: 'สร้างอินโฟกราฟิก/กราฟ/แผนที่จากข้อมูล มีแผน Free และ AI ช่วยจัดวาง',
                links: [{ label: 'Infogram', href: 'https://infogram.com/', icon: LinkIcon }],
            },
            {
                name: 'Genially',
                description: 'ทำคอนเทนต์ "interactive" (อินโฟฯคลิกได้) ฟรีมีตัวช่วย AI พื้นฐาน',
                links: [{ label: 'Genially', href: 'https://genially.com/', icon: LinkIcon }],
            },
            {
                name: 'Gamma',
                description: 'สร้างสไลด์/เพจจากพรอมป์ตเร็วๆ แล้วส่งต่อไป PowerPoint/Google Slides',
                links: [{ label: 'Gamma', href: 'https://gamma.app/', icon: LinkIcon }],
            },
        ],
    },
    {
        title: 'ไอคอนและแอนิเมชัน',
        description: 'แหล่งรวมไอคอนและภาพเคลื่อนไหวเพื่อเสริมความน่าสนใจให้สื่อ',
        icon: Component,
        tools: [
            {
                name: 'LottieFiles',
                description: 'ไลบรารีแอนิเมชัน Lottie ฟรี และมี Prompt-to-Vector เพื่อทำภาพเวกเตอร์พร้อมขยับ',
                links: [{ label: 'LottieFiles', href: 'https://lottiefiles.com/', icon: LinkIcon }],
            },
            {
                name: 'Flaticon / SVG Repo',
                description: 'ไอคอนฟรีจำนวนมาก (ต้องตรวจสิทธิ์ใช้งานแต่ละรายการ)',
                links: [
                    { label: 'Flaticon', href: 'https://www.flaticon.com/', icon: LinkIcon },
                    { label: 'SVG Repo', href: 'https://www.svgrepo.com/', icon: LinkIcon },
                ],
            },
        ],
    },
    {
        title: 'ฟอนต์ไทยแนะนำ (ฟรี)',
        description: 'ฟอนต์ภาษาไทยที่อ่านง่าย ปลอดภัย และเหมาะสำหรับงานราชการ/สื่อสาธารณะ',
        icon: Type,
        tools: [
            {
                name: 'Sarabun & Noto Sans Thai',
                description: 'ฟอนต์ฟรีจาก Google Fonts ภายใต้ OFL เหมาะกับงานราชการ/อินโฟกราฟิก (ใช้ใน Canva/Express ได้)',
                links: [
                    { label: 'Sarabun', href: 'https://fonts.google.com/specimen/Sarabun', icon: LinkIcon },
                    { label: 'Noto Sans Thai', href: 'https://fonts.google.com/noto/specimen/Noto+Sans+Thai', icon: LinkIcon },
                ],
            },
        ],
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

const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const }
    }
};

const AIToolsPage: React.FC<AIToolsPageProps> = ({ onNavigateHome }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <SEO
                title="เครื่องมือ AI สำหรับเกษตร - Kaset Tambon Lab"
                description="รวมเครื่องมือ AI และแอปพลิเคชันเพื่อเกษตรกรรม วินิจฉัยโรคพืช ดาวเทียม พยากรณ์อากาศ สร้างสื่อ และอื่นๆ อีกมากมาย"
                keywords="AI เกษตร, เครื่องมือเกษตร, PlantVillage, ดาวเทียม, NDVI, พยากรณ์อากาศ, ChatGPT เกษตร, Canva, Adobe Firefly"
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
                                eyebrow="AI เสริมประสิทธิภาพ"
                                title="คลังเครื่องมือ AI เพื่อเกษตรตำบล"
                                subtitle="รวมแอปพลิเคชันและเว็บไซต์ที่เป็นประโยชน์ต่องานส่งเสริมการเกษตร (โปรดใช้วิจารณญาณในการตรวจสอบข้อมูล)"
                                align="left"
                            />
                        </div>

                        <div className="space-y-4">
                            {aiToolCategories.map((category, index) => {
                                const isExpanded = expandedIndex === index;
                                return (
                                    <motion.div
                                        key={category.title}
                                        className="overflow-hidden rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(16,185,129,0.2)] hover:border-emerald-400/30"
                                        variants={categoryVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <motion.div
                                            initial={false}
                                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                            className="flex w-full cursor-pointer items-center justify-between p-5 md:p-6 text-left hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300"
                                            role="button"
                                            aria-expanded={isExpanded}
                                            aria-controls={`ai-tools-content-${index}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                                                    <category.icon className="h-6 w-6 md:h-7 md:w-7" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-bold text-slate-800">{category.title}</h3>
                                                    <p className="text-xs md:text-sm text-slate-500 mt-1">{category.description}</p>
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="ml-4 flex-shrink-0"
                                            >
                                                <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                                            </motion.div>
                                        </motion.div>

                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.section
                                                    id={`ai-tools-content-${index}`}
                                                    key="content"
                                                    initial="collapsed"
                                                    animate="open"
                                                    exit="collapsed"
                                                    variants={{
                                                        open: { opacity: 1, height: 'auto' },
                                                        collapsed: { opacity: 0, height: 0 }
                                                    }}
                                                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 md:px-6 pb-6 pt-0 bg-gradient-to-br from-slate-50/50 to-emerald-50/30">
                                                        <div className="mb-5 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                            {category.tools.map((tool) => (
                                                                <div
                                                                    key={tool.name}
                                                                    className="flex h-full flex-col justify-between rounded-2xl bg-white/90 backdrop-blur-sm p-5 ring-1 ring-slate-200/50 shadow-sm hover:shadow-lg hover:ring-emerald-200 transition-all duration-300 hover:-translate-y-1"
                                                                >
                                                                    <div>
                                                                        <h4 className="font-bold text-slate-900 text-base">{tool.name}</h4>
                                                                        <p className="mt-2 text-xs leading-relaxed text-slate-600">{tool.description}</p>
                                                                    </div>
                                                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                                                        {tool.links.map((link) => (
                                                                            <Button
                                                                                key={link.href}
                                                                                href={link.href}
                                                                                variant="soft"
                                                                                className="px-3 py-1.5 text-xs font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-300"
                                                                            >
                                                                                <link.icon className="h-3.5 w-3.5" />
                                                                                <span>{link.label}</span>
                                                                            </Button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {category.usageGuide && (
                                                            <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 ring-1 ring-inset ring-amber-200/50 border-l-4 border-amber-500 shadow-sm">
                                                                <p className="text-xs md:text-sm font-medium text-slate-700">
                                                                    <span className="font-bold text-amber-700">💡 Usage Tip:</span> {category.usageGuide}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.section>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12 rounded-3xl bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-xl border border-amber-200/40 shadow-xl p-6"
                        >
                            <div className="flex gap-4">
                                <div className="text-amber-600 flex-shrink-0">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-900 mb-2">⚠️ ข้อควรระวัง</h4>
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        เครื่องมือ AI เหล่านี้เป็นเพียงผู้ช่วยในการทำงาน ควรใช้ร่วมกับความรู้และประสบการณ์ของท่าน
                                        สำหรับข้อมูลที่สำคัญควรตรวจสอบจากแหล่งที่เชื่อถือได้ เช่น หน่วยงานราชการ หรือผู้เชี่ยวชาญทางการเกษตร
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Container>
                </main>
            </motion.div>
        </div>
    );
};

export default AIToolsPage;
