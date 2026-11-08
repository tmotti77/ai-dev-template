import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { site, whatsappUrl } from "../content/site";

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

export default function Contact() {
  usePageMeta(
    `צור קשר | ${site.name}`,
    "צרו קשר עם חיים הנדימן לקבלת הצעת מחיר – טלפון, וואטסאפ ומייל.",
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  // הטופס לא שולח לשרת – הוא פותח וואטסאפ עם הודעה מוכנה
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `שלום, שמי ${name} (${phone}).\n${details}`;
    window.open(whatsappUrl(text), "_blank");
  };

  const channels = [
    { icon: Phone, label: "טלפון", value: site.phone, href: `tel:${site.phone}` },
    { icon: MessageCircle, label: "וואטסאפ", value: "שלחו הודעה", href: whatsappUrl() },
    { icon: Mail, label: "מייל", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHeader
        title="צור קשר"
        subtitle="לתיאום ביקור וקבלת הצעת מחיר, השאירו פרטים או פנו ישירות."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div className="space-y-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <c.icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">{c.label}</span>
                <span className="font-bold" dir="ltr">
                  {c.value}
                </span>
              </span>
            </a>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-muted p-6 md:p-8">
          <h2 className="text-2xl font-bold">בקשה להצעת מחיר</h2>
          <input
            required
            className={inputClass}
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="tel"
            className={`${inputClass} text-right`}
            placeholder="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            required
            rows={4}
            className={inputClass}
            placeholder="תיאור העבודה"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <button className="w-full rounded-full bg-ink py-4 text-lg font-bold text-ink-foreground">
            שליחה בוואטסאפ
          </button>
        </form>
      </section>
    </>
  );
}
