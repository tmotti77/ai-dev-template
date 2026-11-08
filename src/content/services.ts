// רשימת השירותים.
// 6 הראשונים מוצגים בדף הבית ב"תחומי התמחות", וכולם מוצגים בדף השירותים.
// אייקונים: https://lucide.dev/icons – מוסיפים את שם האייקון לשורת ה-import למטה.
import {
  Droplets,
  Hammer,
  Lightbulb,
  PaintRoller,
  PanelTop,
  Sofa,
  Tv,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const services: Service[] = [
  {
    icon: Tv,
    title: "התקנת מסכי טלוויזיה",
    desc: "תלייה מקצועית על כל סוג קיר, הסתרת כבלים וזרועות מתכווננות.",
  },
  {
    icon: Sofa,
    title: "פירוק והרכבת רהיטים",
    desc: "ארונות, מיטות, שידות ורהיטי איקאה – מהר, נקי ומדויק.",
  },
  {
    icon: PanelTop,
    title: "תליית מדפים ווילונות",
    desc: "מדפים צפים, מוטות וילון, תמונות ומראות בפילוס מושלם.",
  },
  {
    icon: Droplets,
    title: "החלפה והתקנת ברזים",
    desc: "ברזי מטבח ואמבטיה, ניאגרות, סיפונים וטיפול בנזילות.",
  },
  {
    icon: PaintRoller,
    title: "עבודות צבע וגבס",
    desc: "צביעת דירות וחדרים, נישות גבס, תיקוני סדקים ושפכטל.",
  },
  {
    icon: Wrench,
    title: "תיקונים לבית ולעסק",
    desc: "דלתות, ידיות, צירים, תריסים ותחזוקה שוטפת.",
  },
  {
    icon: Hammer,
    title: "שיפוצים ועבודות גמר",
    desc: "שיפוץ חדרים, חיפויים, פרזול ועבודות גמר ברמה גבוהה.",
  },
  {
    icon: Lightbulb,
    title: "תאורה ואביזרים",
    desc: "החלפת גופי תאורה, מנורות ותליית אביזרים לבית.",
  },
];
