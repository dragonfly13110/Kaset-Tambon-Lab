# Kaset Tambon Lab

## Project Overview
Portfolio เว็บไซต์แสดงผลงานและเครื่องมือ AI สำหรับเกษตรตำบล จังหวัดฉะเชิงเทรา

## Tech Stack
- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion (animations)
- Google Gemini API

## Key Commands
```bash
npm run dev      # เริ่ม dev server
npm run build    # build สำหรับ production
npm run preview  # ดู build production
```

## Structure
```
├── App.tsx              # หน้าหลัก
├── components/          # UI components
├── pages/               # หน้าย่อย (News, AI Tools, FAQ)
├── public/              # Static files
├── QWEN.md              # ไฟล์นี้
└── .github/             # PR template
```

## Environment
- `GEMINI_API_KEY` — Google Gemini API key
