# Code Review Checklist
## Kaset Tambon Lab

> ใช้ checklist นี้ก่อนทุก merge

---

## 🔒 Security

- [ ] ไม่มี API key, secret, password ในโค้ด
- [ ] ไม่มี `console.log()` ที่ sensitive data
- [ ] Input validation ครบ (ถ้ามี form)
- [ ] XSS-safe (ไม่ใช้ `dangerouslySetInnerHTML` โดยไม่ sanitize)
- [ ] ไม่มี `eval()`, `new Function()` ที่ user input

---

## 🐛 Correctness

- [ ] โค้ดทำงานตาม requirement
- [ ] Edge cases ถูกต้อง (empty state, error, loading)
- [ ] ไม่มี infinite loop
- [ ] ไม่มี race condition (ถ้ามี async)
- [ ] Error handling ครบ (try/catch, error boundary)

---

## 🎨 UI/UX

- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessibility (aria-labels, keyboard nav)
- [ ] Loading state มี
- [ ] Error state มี
- [ ] Empty state มี
- [ ] Animation ไม่กระตุก (fps smooth)

---

## 📐 Code Quality

- [ ] ชื่อตัวแปร/function สื่อความหมาย
- [ ] ไม่เกิน 200 lines/function
- [ ] DRY (ไม่ copy-paste code)
- [ ] TypeScript types ครบ (ไม่ใช้ `any`)
- [ ] Comments เฉพาะที่จำเป็น (why ไม่ใช่ what)
- [ ] Import เรียงลำดับ (react → external → internal)

---

## ⚡ Performance

- [ ] `useMemo`, `useCallback` ใช้เมื่อจำเป็น (ไม่ over-use)
- [ ] ไม่มี re-render ไม่จำเป็น
- [ ] Image optimize (ใช้ขนาดเหมาะสม)
- [ ] Bundle size ไม่ใหญ่เกิน (< 500KB)
- [ ] Lazy loading สำหรับ component ใหญ่

---

## 🧪 Testing

- [ ] มี test สำหรับ logic สำคัญ
- [ ] Test ผ่าน (`npm test`)
- [ ] Coverage ไม่ลดลง
- [ ] Manual test แล้วใน local

---

## 📚 Documentation

- [ ] README อัปเดต (ถ้ามี feature ใหม่)
- [ ] QWEN.md อัปเดต (ถ้ามี architecture change)
- [ ] Comments สำหรับ code ที่ซับซ้อน

---

## ✅ Final Check

- [ ] Build ผ่าน (`npm run build`)
- [ ] ไม่มี TypeScript error
- [ ] ไม่มี ESLint warning
- [ ] PR เล็ก (< 150 lines)
- [ ] Commit message ชัดเจน

---

**Reviewer Notes:**
<!-- ใส่ความคิดเห็นเพิ่มเติม -->
