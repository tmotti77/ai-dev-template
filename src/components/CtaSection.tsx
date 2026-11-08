import { Mail, Phone } from "lucide-react";
import { site } from "../content/site";

/** הקופסה הכתומה "מתכננים עבודה..." בתחתית הדפים */
export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
        <div>
          <h2 className="text-3xl font-bold">מתכננים עבודה בבית או בעסק?</h2>
          <p className="mt-2 text-lg">צרו קשר לתיאום ביקור והצעת מחיר מסודרת.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-ink-foreground"
          >
            <Phone className="h-5 w-5" /> שיחה
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-bold text-foreground"
          >
            <Mail className="h-5 w-5" /> דוא"ל
          </a>
        </div>
      </div>
    </section>
  );
}
