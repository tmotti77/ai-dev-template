// תמונות הגלריה.
// להוספת תמונה: שמים את הקובץ בתיקייה src/assets, מוסיפים שורת import, ומוסיפים פריט לרשימה.
// בדף הבית ("פרויקטים נבחרים") מוצגות התמונות 2–5 ברשימה.
import hero from "../assets/hero.jpg";
import gypsum from "../assets/gallery-gypsum.jpg";
import faucet from "../assets/gallery-faucet.jpg";
import furniture from "../assets/gallery-furniture.jpg";
import shelves from "../assets/gallery-shelves.jpg";

export type GalleryItem = {
  src: string;
  title: string;
};

export const heroImage = hero;

export const gallery: GalleryItem[] = [
  { src: hero, title: "סלון אחרי שיפוץ – תקרת גבס ומסך תלוי" },
  { src: gypsum, title: "נישת גבס עם תאורה וצבע" },
  { src: faucet, title: "התקנת ברז מטבח" },
  { src: furniture, title: "הרכבת ארון וספרייה" },
  { src: shelves, title: "מדפים צפים ותריסים" },
];
