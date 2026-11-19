# CEFR Kunlik

Writing (30 kun), Speaking (30 kun) va Ideas (24 kun) uchun kunlik darslar, testlar va AI tekshiruv.

Fayllar:
- `index.html` — butun sayt (bitta fayl)
- `worker.js` — Gemini kalitini yashirish uchun (ixtiyoriy, lekin tavsiya etiladi)
- `.nojekyll` — GitHub Pages uchun

## 1. GitHub Pages orqali ochish
1. github.com da yangi repository yarating (masalan `cefr-kunlik`), Public.
2. **Add file → Upload files** bosing, `index.html`, `worker.js`, `README.md` va `.nojekyll` ni yuklang, **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`, **Save**.
4. 1–2 daqiqadan keyin sayt `https://USERNAME.github.io/cefr-kunlik/` manzilida ochiladi.

Kirish: login `Firdavs`, parol `1311`.

## 2. AI ni ulash (Gemini)
Kalit: https://aistudio.google.com/apikey

**Faqat o'zingiz ishlatsangiz:** saytga kiring → Admin → API kalitni kiriting → Saqlash. Kalit faqat shu brauzerda saqlanadi.

**O'quvchilar ham ishlatsa (tavsiya):** kalitni saytga yozmang, Cloudflare Worker orqali ulang:
1. dash.cloudflare.com → Workers & Pages → Create → Worker.
2. `worker.js` ichidagi kodni joylashtiring, Deploy.
3. Worker → Settings → Variables: `GEMINI_API_KEY` (Secret), `ALLOWED_ORIGIN` = `https://USERNAME.github.io`.
4. Worker manzilini nusxalang va `index.html` ichida `const DEFAULT_PROXY="";` ni `const DEFAULT_PROXY="https://sizning-worker.workers.dev";` qilib o'zgartiring, GitHub'da qayta saqlang.

## 3. Bilib qo'ying
- Login va parol sahifa kodida turadi, 4 xonali parol oson topiladi. Parolni o'zgartirish uchun Admin'dan foydalaning yoki yangi hash yarating.
- Natijalar va o'quvchi hisoblari har bir brauzerda alohida saqlanadi. Admin'da qo'shilgan o'quvchi boshqa qurilmada ishlamaydi. Hamma qurilmada umumiy hisoblar kerak bo'lsa, serverli baza (Firebase yoki Supabase) kerak.
- Ovoz bilan javob berish (mikrofon) faqat Chrome'da va HTTPS manzilda ishlaydi (GitHub Pages HTTPS).
- Kitoblardan olingan materiallar mualliflik huquqi bilan himoyalangan. Sayt umumiy ommaga ochiq bo'lsa, buni hisobga oling; shaxsiy o'quv uchun repository'ni Private qilish xavfsizroq.
