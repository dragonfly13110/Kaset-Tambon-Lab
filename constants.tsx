

import React from 'react';
import type { Project, NavItem, Contact, Skill } from './types';
import {
  Calculator,
  BookOpen,
  Map,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  LinkIcon,
  FileText,
  Users,
  Globe,
  BrainCircuit,
  Paintbrush,
  Layers,
  BarChart3,
  Bot,
  CodeXml,
  Component,
  Sparkles,
  Facebook,
} from './components/Icons';

export const LOGO_SRC = "https://res.cloudinary.com/dzksawh1d/image/upload/v1758098508/kaset-tambon-logo_vptuy4.png";

export const CONTACTS: ReadonlyArray<Contact> = [
  { label: "Facebook", value: "Rebellious Kaset Tambon", href: "https://www.facebook.com/RebelliousKasetTambon", icon: Facebook },
];

export const PROJECTS: ReadonlyArray<Project> = [
  {
    icon: <Calculator className="h-6 w-6" aria-hidden />,
    title: "Crop Cost Lab — เครื่องคิดต้นทุน & จำลองฉากทัศน์",
    desc: "คำนวณต้นทุนยืดหยุ่น ปรับสมมติฐานปัจจัยการผลิตแบบเรียลไทม์ เหมาะกับงานวางแผนและการให้คำปรึกษา",
    href: "https://agrilabcost-ai.vercel.app/",
    tag: "เว็บเครื่องมือ",
    category: "tool",
  },
  {
    icon: <BookOpen className="h-6 w-6" aria-hidden />,
    title: "คลังความรู้เกษตร — Infographic",
    desc: "ศูนย์รวมอินโฟกราฟิกและความรู้ที่คัดสรร สั้น กระชับ เอาไปใช้สื่อสารกับเกษตรกรและเครือข่ายได้ทันที",
    href: "https://kasetinfo.netlify.app/",
    tag: "องค์ความรู้",
    category: "knowledge",
  },
  {
    icon: <Map className="h-6 w-6" aria-hidden />,
    title: "ข้อมูลพื้นที่และการเพาะปลูก — จังหวัดฉะเชิงเทรา",
    desc: "แดชบอร์ดสรุปข้อมูลพื้นที่ปลูก ผลผลิต และประเด็นสำคัญระดับอำเภอ-ตำบล ใช้ประกอบการตัดสินใจเชิงพื้นที่",
    href: "https://dashboardcs.netlify.app/",
    tag: "แดชบอร์ด",
    category: "dashboard",
  },
  {
    icon: <FileText className="h-6 w-6" aria-hidden />,
    title: "DASHBOARD ข้าวนาปีฉะเชิงเทรา ปี 2568/69",
    desc: "แดชบอร์ดสรุปข้อมูลการเพาะปลูกข้าวนาปีในจังหวัดฉะเชิงเทรา ปี 2568/69 แสดงภาพรวมพื้นที่ ผลผลิต และแนวโน้มสำคัญ",
    href: "https://lookerstudio.google.com/u/0/reporting/b1202125-af47-4308-bfbc-7b47aaf1957a/page/page_12345",
    tag: "แดชบอร์ด",
    category: "dashboard",
  },
  {
    icon: <Facebook className="h-6 w-6" aria-hidden />,
    title: "กลุ่ม Facebook: AI for Kaset Tambon",
    desc: "ชุมชนสำหรับแลกเปลี่ยนความรู้และประสบการณ์การใช้ AI และเทคโนโลยีดิจิทัลในงานส่งเสริมการเกษตร",
    href: "https://www.facebook.com/groups/aiforkasettambon",
    tag: "ชุมชนออนไลน์",
    category: "knowledge",
  },
  {
    icon: <BookOpen className="h-6 w-6" aria-hidden />,
    title: "คู่มือทะเบียนเกษตรกร ปี 2568 (ฉบับดิจิทัล)",
    desc: "ขั้นตอน, หลักเกณฑ์, และเงื่อนไขต่างๆ เกี่ยวกับการขึ้นทะเบียนเกษตรกรได้อย่างสะดวกและรวดเร็ว",
    href: "https://farmer-reg.netlify.app/",
    tag: "องค์ความรู้",
    category: "knowledge",
  },
];

export const SKILLS: ReadonlyArray<Skill> = [
  {
    icon: Users,
    name: 'งานส่งเสริมการเกษตร',
    level: 'พอเอาตัวรอด',
    details: 'งานกลุ่มส่งเสริมและพัฒนาการผลิต และ งานประชาสัมพันธ์',
  },
  {
    icon: Globe,
    name: 'ENGLISH level',
    level: 'พอเอาตัวรอด',
    details: 'Basic communication',
  },
  {
    icon: BrainCircuit,
    name: 'Learning skills',
    level: 'พอใช้',
    details: 'Searching DATA, AI for analysis data',
  },
  {
    icon: Paintbrush,
    name: 'Graphic design',
    level: 'พอตัว',
    details: 'Adobe (Illustrator, Premier Pro, Photoshop), Canva',
  },
  {
    icon: Layers,
    name: 'Computer software usage',
    level: 'พอตัว',
    details: 'Installing programs and Windows',
  },
  {
    icon: BarChart3,
    name: 'Data analysis',
    level: 'สอนเพื่อนได้',
    details: 'Excel, Tableau desktop, Tableau prep, Looker stuio',
  },
  {
    icon: Bot,
    name: 'Text-to-Image AI',
    level: 'สอนเพื่อนได้',
    details: 'Leonardo AI, Microsoft Bing, Google Gemini, Midjourney',
  },
  {
    icon: Sparkles,
    name: 'LLM Generative AI',
    level: 'สอนเพื่อนได้',
    details: 'Google Gemini, Copilot, GPT 5, Claude AI',
  },
  {
    icon: BrainCircuit,
    name: 'Prompt Engineering',
    level: 'พอตัว',
    details: 'การสร้างชุดคำสั่ง (Prompt) ที่มีประสิทธิภาพเพื่อให้ AI สร้างผลลัพธ์ที่ต้องการ',
  },
  {
    icon: CodeXml,
    name: 'Website design',
    level: 'สอนเพื่อนได้',
    details: 'Wordpress, WIX',
  },
  {
    icon: CodeXml,
    name: 'Vibe Code',
    level: 'พอตัว',
    details: 'Google AI Studio, VS Code',
  },
  {
    icon: Map,
    name: 'Mapping & GIS',
    level: 'สอนเพื่อนได้',
    details: 'QGIS, ESRI, GOOGLE EARTH',
  },
  {
    icon: Component,
    name: 'Computer assembly',
    level: 'สอนเพื่อนได้',
    details: 'ประกอบคอม, ลง windows & software, ซ่อม, แก้ปัญหา',
  },
];


export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: "#projects", label: "โปรเจกต์" },
  { page: "news", label: "ข่าวสาร AgTech" },
  { href: "#about-me", label: "เกี่ยวกับฉัน" },
];