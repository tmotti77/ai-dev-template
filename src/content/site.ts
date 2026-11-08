// פרטי העסק – שינוי כאן מתעדכן בכל האתר (כותרת, פוטר, כפתורי חיוג, וואטסאפ, טופס)

export const site = {
  /** שם העסק (משמש בכותרות הדפים ובזכויות היוצרים) */
  name: "חיים הנדימן",
  /** השם שמוצג ליד הלוגו בתפריט ובפוטר */
  brand: "חיים - הנדימן",
  /** טלפון לתצוגה ולחיוג */
  phone: "050-7898484",
  /** אותו טלפון בפורמט בינלאומי לוואטסאפ: 972 + המספר בלי ה-0 בהתחלה */
  phoneIntl: "972507898484",
  email: "handyhaim7@gmail.com",
  /** משפט קצר שמופיע בפוטר */
  tagline: "שירותי אחזקה, שיפוצים ועבודות גמר למגזר הפרטי והעסקי.",
};

export const navLinks = [
  { to: "/", label: "בית" },
  { to: "/services", label: "שירותים" },
  { to: "/gallery", label: "גלריה" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "צור קשר" },
];

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
