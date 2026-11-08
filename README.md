# חיים הנדימן – אתר העסק

אתר תדמית לעסק "חיים הנדימן": שיפוצים, עבודות גמר ותיקונים.
העתק של האתר שנבנה ב-Lovable, עם קוד מלא שאפשר לערוך ולהעלות לכל שירות אחסון.

**טכנולוגיות:** React + TypeScript + Vite + Tailwind CSS (אותו סוג קוד ש-Lovable כותב).

## הרצה במחשב

צריך [Node.js](https://nodejs.org) גרסה 20 ומעלה.

```bash
npm install      # פעם אחת, מתקין את הספריות
npm run dev      # מריץ את האתר בכתובת http://localhost:5173
npm run build    # בונה גרסה סופית לתיקייה dist
```

## איפה משנים מה

| מה רוצים לשנות | קובץ |
| --- | --- |
| טלפון, וואטסאפ, מייל, שם העסק, קישורי התפריט | `src/content/site.ts` |
| רשימת השירותים והאייקונים | `src/content/services.ts` |
| תמונות הגלריה | `src/content/gallery.ts` (התמונות עצמן ב-`src/assets`) |
| טקסטים בדף הבית, יתרונות, חוות דעת | `src/content/home.ts` |
| צבעים ופונטים | `src/index.css` (בראש הקובץ) |
| לוגו | `src/assets/logo.png` (מחליפים את הקובץ באותו שם) |
| אייקון בלשונית הדפדפן | `public/favicon.png` |
| עיצוב ומבנה של דף מסוים | `src/pages/` (קובץ לכל דף) |
| תפריט, פוטר, כפתור וואטסאפ צף | `src/components/` |
| כותרת ותיאור לגוגל ולשיתוף ברשתות | `index.html` ו-`usePageMeta` בכל דף |

אייקונים נוספים: [lucide.dev/icons](https://lucide.dev/icons).

## העלאה לאוויר (בחינם)

**Vercel** (מומלץ): מחברים את ה-repository ב-[vercel.com](https://vercel.com) → New Project. ההגדרות מזוהות אוטומטית (Vite). הקובץ `vercel.json` כבר מוגדר.

**Netlify**: מחברים את ה-repository ב-[netlify.com](https://netlify.com). פקודת בנייה `npm run build`, תיקייה `dist`. הקובץ `public/_redirects` כבר מוגדר.

בשני השירותים אפשר לחבר דומיין משלכם (למשל `haim-handyman.co.il`).
אחרי שיש דומיין, כדאי לעדכן ב-`index.html` את `og:image` לכתובת מלאה (`https://הדומיין/og-image.jpg`), כדי שתמונת התצוגה המקדימה תופיע כשמשתפים קישור בוואטסאפ.

## טופס יצירת הקשר

הטופס לא דורש שרת: לחיצה על "שליחה בוואטסאפ" פותחת וואטסאפ עם הודעה מוכנה למספר שמוגדר ב-`src/content/site.ts`.
