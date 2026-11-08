import { Link } from "react-router";
import { Phone, Star } from "lucide-react";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { features, hero, testimonials } from "../content/home";
import { gallery, heroImage } from "../content/gallery";
import { services } from "../content/services";
import { site } from "../content/site";

export default function Home() {
  usePageMeta(
    `${site.name} | שיפוצים, עבודות גמר ותיקונים`,
    "חיים הנדימן – התקנת מסכים, הרכבת רהיטים, צבע וגבס, ברזים ותיקונים לבית ולעסק.",
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt={hero.imageAlt}
          width={1600}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/80 to-ink/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-ink-foreground md:py-36">
          <span className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground">
            {hero.badge}
          </span>
          <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-tight md:text-6xl">
            {hero.title}
            <br />
            <span className="text-primary">{hero.highlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">{hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-lg font-bold text-primary-foreground shadow-soft"
            >
              <Phone className="h-5 w-5" /> {site.phone}
            </a>
            <Link
              to="/services"
              className="rounded-full border-2 border-ink-foreground/40 px-7 py-4 text-lg font-bold"
            >
              לשירותים
            </Link>
          </div>
        </div>
      </section>

      {/* תחומי התמחות */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block h-2 w-16 rounded-full bg-primary" />
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">תחומי התמחות</h2>
          </div>
          <Link to="/services" className="font-bold text-primary">
            לכל השירותים
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* יתרונות */}
      <section className="bg-muted py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-primary">
                <f.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* פרויקטים נבחרים */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">פרויקטים נבחרים</h2>
          <Link to="/gallery" className="font-bold text-primary">
            לגלריה המלאה
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.slice(1, 5).map((g) => (
            <img
              key={g.title}
              src={g.src}
              alt={g.title}
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      {/* חוות דעת */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">חוות דעת לקוחות</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t} className="rounded-2xl bg-ink-foreground/5 p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 opacity-90">"{t}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
