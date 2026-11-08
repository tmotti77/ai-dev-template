// טקסטים של דף הבית
import { Clock, ShieldCheck, ThumbsUp, type LucideIcon } from "lucide-react";

export const hero = {
  badge: "שירותי אחזקה ושיפוצים",
  title: "חיים הנדימן",
  highlight: "שיפוצים ועבודות גמר",
  text: "מענה מקצועי ואחראי לעבודות התקנה, תחזוקה ושיפוץ – בהתאם לתכנון, בלוחות זמנים מוגדרים וברמת גימור גבוהה.",
  imageAlt: "סלון משופץ",
};

/** שלושת היתרונות ברצועה האפורה */
export const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: "אמינות ואחריות", desc: "עסק מורשה, עבודה מסודרת ואחריות על הביצוע." },
  { icon: Clock, title: "עמידה בזמנים", desc: "תיאום מראש והגעה במועד שנקבע." },
  { icon: ThumbsUp, title: "שקיפות במחיר", desc: "הצעת מחיר מפורטת לפני תחילת העבודה." },
];

/** חוות דעת לקוחות */
export const testimonials: string[] = [
  "הגיע במועד שנקבע, ביצע את ההתקנות בצורה מדויקת והשאיר את המקום נקי.",
  "הרכבת ריהוט מלאה ביום אחד, עבודה מקצועית ויחס אדיב.",
  "עבודות צבע וגבס ברמת גימור גבוהה, בהתאם להצעת המחיר.",
];
