import { Check } from "lucide-react";
import logo from "../assets/logo.png";
import { CtaSection } from "../components/CtaSection";
import { PageHeader } from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../content/site";

const highlights = [
  "שירות אישי וזמין",
  "עבודה נקייה ומסודרת",
  "עמידה בלוחות זמנים",
  "הצעת מחיר שקופה",
];

export default function About() {
  usePageMeta(
    `אודות | ${site.name}`,
    "הכירו את חיים – הנדימן מקצועי לשיפוצים, עבודות גמר ותיקונים.",
  );

  return (
    <>
      <PageHeader title="אודות" subtitle="מקצועיות, אמינות ותשומת לב לפרטים בכל עבודה." />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          <p>חיים הנדימן מספק שירותי התקנה, אחזקה, שיפוצים ועבודות גמר ללקוחות פרטיים ועסקיים.</p>
          <p>
            כל עבודה מתבצעת עם ציוד מקצועי, בהקפדה על ניקיון, בטיחות ועמידה בלוחות זמנים, לאחר הצעת
            מחיר מפורטת.
          </p>
          <ul className="space-y-2 pt-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                  <Check className="h-4 w-4" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-muted p-12">
          <img src={logo} alt={`לוגו ${site.name}`} className="mx-auto w-2/3" />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
