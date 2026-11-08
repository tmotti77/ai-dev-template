import { CtaSection } from "../components/CtaSection";
import { PageHeader } from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { services } from "../content/services";
import { site } from "../content/site";

export default function Services() {
  usePageMeta(
    `שירותים | ${site.name}`,
    "התקנת מסכים, הרכבת רהיטים, תליית מדפים, ברזים, צבע וגבס ושיפוצים.",
  );

  return (
    <>
      <PageHeader title="שירותים" subtitle="מגוון שירותי התקנה, אחזקה ושיפוץ לבתים פרטיים ולעסקים." />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.title} className="flex gap-5 rounded-2xl border border-border bg-card p-6">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                i % 2 ? "bg-primary" : "bg-secondary"
              }`}
            >
              <s.icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{s.title}</h2>
              <p className="mt-1 text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>
      <CtaSection />
    </>
  );
}
